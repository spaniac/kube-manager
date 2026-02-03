package com.k8smanager.service;

import com.k8smanager.dto.*;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.utils.Serialization;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for workload management (deployments, jobs, cronjobs).
 */
@Service
public class WorkloadService {

    private final KubernetesClient kubernetesClient;
    private final K8sMapper k8sMapper;

    public WorkloadService(KubernetesClient kubernetesClient, K8sMapper k8sMapper) {
        this.kubernetesClient = kubernetesClient;
        this.k8sMapper = k8sMapper;
    }

    /**
     * Scale deployment.
     */
    public DeploymentDTO scaleDeployment(String namespace, String name, int replicas) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        deployment.getSpec().setReplicas(replicas);
        Deployment updated = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Restart deployment.
     */
    public DeploymentDTO restartDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        String annotationKey = "kubernetes.io/restartedAt";
        String timestamp = String.valueOf(System.currentTimeMillis());
        deployment.getMetadata().getAnnotations().put(annotationKey, timestamp);

        Deployment restarted = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(restarted);
    }

    /**
     * Update deployment image.
     */
    public DeploymentDTO updateDeploymentImage(String namespace, String name, String image) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        deployment.getSpec().getTemplate().getSpec().getContainers().get(0)
                .setImage(image);

        Deployment updated = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Rollback deployment.
     */
    public DeploymentDTO rollbackDeployment(String namespace, String name, long revision) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        RollbackConfig rollbackConfig = new RollbackConfig();
        rollbackConfig.setRevision(revision);

        deployment.getSpec().setRollbackTo(rollbackConfig);
        Deployment rolledback = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(rolledback);
    }

    /**
     * Get deployment revision history.
     */
    public List<DeploymentRevisionDTO> getDeploymentRevisions(String namespace, String name) {
        ReplicaSetList replicaSets = kubernetesClient.replicaSets()
                .inNamespace(namespace)
                .list();

        return replicaSets.getItems().stream()
                .filter(rs -> rs.getMetadata().getOwnerReferences() != null
                        && rs.getMetadata().getOwnerReferences().stream()
                        .anyMatch(ref -> "Deployment".equals(ref.getKind())
                                && ref.getName().equals(name)))
                .map(rs -> new DeploymentRevisionDTO(
                        rs.getMetadata().getName(),
                        rs.getMetadata().getAnnotations() != null
                                ? rs.getMetadata().getAnnotations()
                                        .getOrDefault("deployment.kubernetes.io/revision", "0")
                                : "0",
                        rs.getMetadata().getCreationTimestamp().toEpochMilli(),
                        rs.getSpec().getReplicas()
                ))
                .sorted((a, b) -> Long.compare(
                        Long.parseLong(b.revision()),
                        Long.parseLong(a.revision())) * -1)
                .toList();
    }

    /**
     * Create job.
     */
    public JobDTO createJob(String namespace, JobRequestDTO request) {
        Job job = k8sMapper.mapToJob(request);
        Job created = kubernetesClient.jobs()
                .inNamespace(namespace)
                .resource(job)
                .create();

        return k8sMapper.mapToJobDto(created);
    }

    /**
     * Create cron job.
     */
    public CronJobDTO createCronJob(String namespace, CronJobRequestDTO request) {
        CronJob cronJob = k8sMapper.mapToCronJob(request);
        CronJob created = kubernetesClient.cronJobs()
                .inNamespace(namespace)
                .resource(cronJob)
                .create();

        return k8sMapper.mapToCronJobDto(created);
    }

    /**
     * Create workload from YAML.
     */
    public Object createWorkloadFromYaml(String namespace, String yaml, boolean dryRun) {
        if (namespace == null || namespace.isEmpty()) {
            namespace = "default";
        }

        try {
            HasMetadata resource = Serialization.unmarshal(yaml);

            String kind = resource.getKind();
            String name = resource.getMetadata() != null ? resource.getMetadata().getName() : "unknown";
            String uid = null;

            if (dryRun) {
                return new WorkloadCreateResponseDTO(
                        kind,
                        name,
                        namespace,
                        true,
                        null,
                        "Dry run successful - resource would be created"
                );
            }

            HasMetadata created = switch (kind) {
                case "Deployment" -> {
                    Deployment deployment = kubernetesClient.deployments()
                            .inNamespace(namespace)
                            .resource((Deployment) resource)
                            .create();
                    uid = deployment.getMetadata() != null ? deployment.getMetadata().getUid() : null;
                    yield k8sMapper.mapToDeploymentDto(deployment);
                }
                case "StatefulSet" -> {
                    StatefulSet statefulSet = kubernetesClient.statefulSets()
                            .inNamespace(namespace)
                            .resource((StatefulSet) resource)
                            .create();
                    uid = statefulSet.getMetadata() != null ? statefulSet.getMetadata().getUid() : null;
                    yield k8sMapper.mapToStatefulSetDto(statefulSet);
                }
                case "DaemonSet" -> {
                    DaemonSet daemonSet = kubernetesClient.daemonSets()
                            .inNamespace(namespace)
                            .resource((DaemonSet) resource)
                            .create();
                    uid = daemonSet.getMetadata() != null ? daemonSet.getMetadata().getUid() : null;
                    yield k8sMapper.mapToDaemonSetDto(daemonSet);
                }
                case "Job" -> {
                    io.fabric8.kubernetes.api.model.Job job = kubernetesClient.batch()
                            .v1().jobs()
                            .inNamespace(namespace)
                            .resource((io.fabric8.kubernetes.api.model.Job) resource)
                            .create();
                    uid = job.getMetadata() != null ? job.getMetadata().getUid() : null;
                    yield k8sMapper.mapToJobDto(job);
                }
                case "CronJob" -> {
                    CronJob cronJob = kubernetesClient.batch()
                            .v1().cronJobs()
                            .inNamespace(namespace)
                            .resource((CronJob) resource)
                            .create();
                    uid = cronJob.getMetadata() != null ? cronJob.getMetadata().getUid() : null;
                    yield k8sMapper.mapToCronJobDto(cronJob);
                }
                default -> {
                    throw new IllegalArgumentException(
                            String.format("Unsupported resource kind: %s. Supported kinds: Deployment, StatefulSet, DaemonSet, Job, CronJob", kind));
                }
            };

            return new WorkloadCreateResponseDTO(
                    kind,
                    name,
                    namespace,
                    false,
                    uid,
                    String.format("%s %s created successfully in namespace %s", kind, name, namespace)
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid YAML: " + e.getMessage(), e);
        }
    }

    /**
     * Update deployment strategy.
     */
    public DeploymentDTO updateDeploymentStrategy(String namespace, String name, UpdateStrategyRequestDTO request) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        DeploymentSpec spec = deployment.getSpec();
        if (spec == null) {
            spec = new DeploymentSpec();
            deployment.setSpec(spec);
        }

        DeploymentStrategy strategy = new DeploymentStrategy();
        strategy.setType(request.type());

        if (request.rollingUpdate() != null && "RollingUpdate".equals(request.type())) {
            RollingUpdateDeploymentSpec rollingUpdate = new RollingUpdateDeploymentSpec();
            rollingUpdate.setMaxUnavailable(request.rollingUpdate().maxUnavailable());
            rollingUpdate.setMaxSurge(request.rollingUpdate().maxSurge());
            strategy.setRollingUpdate(rollingUpdate);
        }

        spec.setStrategy(strategy);

        Deployment updated = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Update container resources.
     */
    public DeploymentDTO updateContainerResources(String namespace, String name,
                                                String containerName, ResourceRequirementsDTO resources) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        DeploymentSpec spec = deployment.getSpec();
        if (spec == null || spec.getTemplate() == null ||
                spec.getTemplate().getSpec() == null) {
            return null;
        }

        Container container = spec.getTemplate().getSpec().getContainers().stream()
                .filter(c -> containerName.equals(c.getName()))
                .findFirst()
                .orElse(null);

        if (container == null) {
            return null;
        }

        if (resources != null) {
            io.fabric8.kubernetes.api.model.ResourceRequirements k8sResources =
                    new io.fabric8.kubernetes.api.model.ResourceRequirements();

            if (resources.limits() != null) {
                ResourceLimits limits = resources.limits();
                if (limits.cpu() != null || limits.memory() != null) {
                    k8sResources.setLimits(Map.of(
                            "cpu", new Quantity(limits.cpu()),
                            "memory", new Quantity(limits.memory())
                    ));
                }
            }

            if (resources.requests() != null) {
                ResourceRequests requests = resources.requests();
                if (requests.cpu() != null || requests.memory() != null) {
                    k8sResources.setRequests(Map.of(
                            "cpu", new Quantity(requests.cpu()),
                            "memory", new Quantity(requests.memory())
                    ));
                }
            }

            container.setResources(k8sResources);
        }

        Deployment updated = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Create PodDisruptionBudget.
     */
    public Object createPodDisruptionBudget(PodDisruptionBudgetRequestDTO request) {
        if (request.namespace() == null || request.namespace().isEmpty()) {
            throw new IllegalArgumentException("Namespace is required");
        }

        io.fabric8.kubernetes.api.model.PodDisruptionBudget pdb =
                new io.fabric8.kubernetes.api.model.PodDisruptionBudget();

        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        if (request.annotations() != null) {
            metadata.setAnnotations(request.annotations());
        }
        pdb.setMetadata(metadata);

        io.fabric8.kubernetes.api.model.PodDisruptionBudgetSpec spec =
                new io.fabric8.kubernetes.api.model.PodDisruptionBudgetSpec();
        spec.setMinAvailable(request.minAvailable());
        spec.setMaxUnavailable(request.maxUnavailable());

        if (request.selector() != null && request.selector().matchLabels() != null) {
            spec.setSelector(new LabelSelector());
            spec.getSelector().setMatchLabels(request.selector().matchLabels());
        }

        pdb.setSpec(spec);

        io.fabric8.kubernetes.api.model.PodDisruptionBudget created =
                kubernetesClient.policy()
                        .podDisruptionBudget()
                        .inNamespace(request.namespace())
                        .resource(pdb)
                        .create();

        return mapToPodDisruptionBudgetDto(created);
    }

    /**
     * Get PodDisruptionBudget.
     */
    public Object getPodDisruptionBudget(String namespace, String name) {
        io.fabric8.kubernetes.api.model.PodDisruptionBudget pdb =
                kubernetesClient.policy()
                        .podDisruptionBudget()
                        .inNamespace(namespace)
                        .withName(name)
                        .get();

        return pdb != null ? mapToPodDisruptionBudgetDto(pdb) : null;
    }

    /**
     * Delete PodDisruptionBudget.
     */
    public boolean deletePodDisruptionBudget(String namespace, String name) {
        return Boolean.TRUE.equals(kubernetesClient.policy()
                .podDisruptionBudget()
                .inNamespace(namespace)
                .withName(name)
                .delete());
    }

    private Object mapToPodDisruptionBudgetDto(io.fabric8.kubernetes.api.model.PodDisruptionBudget pdb) {
        return new Object();
    }

    /**
     * Update container environment variables.
     */
    public DeploymentDTO updateContainerEnvVars(String namespace, String name,
                                                String containerName, Map<String, String> envVars) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        DeploymentSpec spec = deployment.getSpec();
        if (spec == null || spec.getTemplate() == null ||
                spec.getTemplate().getSpec() == null) {
            return null;
        }

        Container container = spec.getTemplate().getSpec().getContainers().stream()
                .filter(c -> containerName.equals(c.getName()))
                .findFirst()
                .orElse(null);

        if (container == null) {
            return null;
        }

        if (envVars != null) {
            List<EnvVar> currentEnv = container.getEnv();
            if (currentEnv == null) {
                currentEnv = new java.util.ArrayList<>();
            }

            envVars.forEach((key, value) -> {
                boolean exists = currentEnv.stream()
                        .anyMatch(e -> key.equals(e.getName()));
                if (exists) {
                    currentEnv.stream()
                            .filter(e -> key.equals(e.getName()))
                            .findFirst()
                            .ifPresent(e -> e.setValue(value));
                } else {
                    EnvVar newEnvVar = new EnvVar();
                    newEnvVar.setName(key);
                    newEnvVar.setValue(value);
                    currentEnv.add(newEnvVar);
                }
            });

            container.setEnv(currentEnv);
        }

        Deployment updated = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Clone workload.
     */
    public Object cloneWorkload(String sourceNamespace, String sourceName, String sourceKind,
                             String targetNamespace, String targetName) {
        if (targetNamespace == null || targetNamespace.isEmpty()) {
            targetNamespace = sourceNamespace;
        }

        HasMetadata sourceResource = switch (sourceKind) {
            case "Deployment" -> kubernetesClient.deployments()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "StatefulSet" -> kubernetesClient.statefulSets()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "DaemonSet" -> kubernetesClient.daemonSets()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "Service" -> kubernetesClient.services()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "ConfigMap" -> kubernetesClient.configMaps()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "Secret" -> kubernetesClient.secrets()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            default -> throw new IllegalArgumentException(
                    String.format("Unsupported source kind: %s", sourceKind));
        };

        if (sourceResource == null) {
            throw new IllegalArgumentException("Source workload not found");
        }

        try {
            String yaml = Serialization.asYaml(sourceResource);
            HasMetadata clonedResource = Serialization.unmarshal(yaml);

            clonedResource.getMetadata().setName(targetName);
            clonedResource.getMetadata().setNamespace(targetNamespace);
            clonedResource.getMetadata().setUid(null);
            clonedResource.getMetadata().setSelfLink(null);
            clonedResource.getMetadata().setResourceVersion(null);
            clonedResource.getMetadata().setCreationTimestamp(null);

            if (clonedResource.getMetadata().getAnnotations() == null) {
                clonedResource.getMetadata().setAnnotations(new java.util.HashMap<>());
            }
            clonedResource.getMetadata().getAnnotations()
                    .put("cloned-from", String.format("%s/%s/%s", sourceKind, sourceNamespace, sourceName));

            HasMetadata created = switch (sourceKind) {
                case "Deployment" -> kubernetesClient.deployments()
                        .inNamespace(targetNamespace).resource((Deployment) clonedResource).create();
                case "StatefulSet" -> kubernetesClient.statefulSets()
                        .inNamespace(targetNamespace).resource((StatefulSet) clonedResource).create();
                case "DaemonSet" -> kubernetesClient.daemonSets()
                        .inNamespace(targetNamespace).resource((DaemonSet) clonedResource).create();
                case "Service" -> kubernetesClient.services()
                        .inNamespace(targetNamespace).resource((Service) clonedResource).create();
                case "ConfigMap" -> kubernetesClient.configMaps()
                        .inNamespace(targetNamespace).resource((ConfigMap) clonedResource).create();
                case "Secret" -> kubernetesClient.secrets()
                        .inNamespace(targetNamespace).resource((Secret) clonedResource).create();
                default -> null;
            };

            return switch (sourceKind) {
                case "Deployment" -> k8sMapper.mapToDeploymentDto((Deployment) created);
                case "StatefulSet" -> k8sMapper.mapToStatefulSetDto((StatefulSet) created);
                case "DaemonSet" -> k8sMapper.mapToDaemonSetDto((DaemonSet) created);
                case "Service" -> k8sMapper.mapToServiceDto((Service) created);
                case "ConfigMap" -> new ConfigMapDTO(
                        created.getMetadata().getName(),
                        created.getMetadata().getNamespace(),
                        created.getMetadata().getCreationTimestamp().toEpochMilli(),
                        ((ConfigMap) created).getData(),
                        ((ConfigMap) created).getBinaryData(),
                        created.getMetadata().getLabels());
                case "Secret" -> new SecretDTO(
                        created.getMetadata().getName(),
                        created.getMetadata().getNamespace(),
                        ((Secret) created).getType(),
                        created.getMetadata().getCreationTimestamp().toEpochMilli(),
                        ((Secret) created).getData(),
                        created.getMetadata().getLabels(),
                        ((Secret) created).getImmutable() != null ? created.getImmutable() : false);
                default -> throw new IllegalArgumentException("Unsupported source kind");
            };
        } catch (Exception e) {
            throw new RuntimeException("Failed to clone workload: " + e.getMessage(), e);
        }
    }

    /**
     * Pause deployment.
     */
    public DeploymentDTO pauseDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        DeploymentSpec spec = deployment.getSpec();
        if (spec == null) {
            spec = new DeploymentSpec();
            deployment.setSpec(spec);
        }

        spec.setPaused(true);

        Deployment paused = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(paused);
    }

    /**
     * Resume deployment.
     */
    public DeploymentDTO resumeDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        DeploymentSpec spec = deployment.getSpec();
        if (spec == null) {
            spec = new DeploymentSpec();
            deployment.setSpec(spec);
        }

        spec.setPaused(false);

        Deployment resumed = kubernetesClient.deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(resumed);
    }
}
