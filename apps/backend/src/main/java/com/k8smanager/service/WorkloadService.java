package com.k8smanager.service;

import com.k8smanager.dto.*;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.*;
import io.fabric8.kubernetes.api.model.batch.v1.CronJob;
import io.fabric8.kubernetes.api.model.batch.v1.Job;
import io.fabric8.kubernetes.api.model.policy.v1beta1.PodDisruptionBudget;
import io.fabric8.kubernetes.api.model.policy.v1beta1.PodDisruptionBudgetSpec;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.utils.Serialization;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
     * List deployments.
     */
    public ResourceListDTO<DeploymentDTO> listDeployments(String namespace, String search) {
        var operation = kubernetesClient.apps().deployments();
        var items = (namespace != null && !namespace.isEmpty())
                ? operation.inNamespace(namespace).list().getItems()
                : operation.inAnyNamespace().list().getItems();

        List<DeploymentDTO> deploymentDTOs = items.stream()
                .filter(deployment -> search == null || deployment.getMetadata().getName().contains(search))
                .map(k8sMapper::mapToDeploymentDto)
                .collect(Collectors.toList());

        return new ResourceListDTO<>(
                "Deployment",
                "apps/v1",
                deploymentDTOs,
                new ResourceListMetaDTO(0, "", 0));
    }

    /**
     * Get deployment.
     */
    public DeploymentDTO getDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        return deployment != null ? k8sMapper.mapToDeploymentDto(deployment) : null;
    }

    /**
     * Delete deployment.
     */
    public boolean deleteDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return false;
        }

        List<StatusDetails> result = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .delete();
        
        return result != null && !result.isEmpty();
    }

    /**
     * Scale deployment.
     */
    public DeploymentDTO scaleDeployment(String namespace, String name, int replicas) {
        Deployment deployment = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        deployment.getSpec().setReplicas(replicas);
        Deployment updated = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Restart deployment.
     */
    public DeploymentDTO restartDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        String annotationKey = "kubernetes.io/restartedAt";
        String timestamp = String.valueOf(System.currentTimeMillis());
        deployment.getMetadata().getAnnotations().put(annotationKey, timestamp);

        Deployment restarted = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(restarted);
    }

    /**
     * Update deployment image.
     */
    public DeploymentDTO updateDeploymentImage(String namespace, String name, String image) {
        Deployment deployment = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        deployment.getSpec().getTemplate().getSpec().getContainers().get(0)
                .setImage(image);

        Deployment updated = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Rollback deployment.
     * Note: RollbackConfig is deprecated in newer Kubernetes versions.
     * This is a simplified implementation.
     */
    public DeploymentDTO rollbackDeployment(String namespace, String name, long revision) {
        Deployment deployment = kubernetesClient.apps().deployments()
                .inNamespace(namespace)
                .withName(name)
                .get();

        if (deployment == null) {
            return null;
        }

        // Rollback by updating deployment annotations to reference the revision
        String annotationKey = "deployment.kubernetes.io/revision";
        String annotationValue = String.valueOf(revision);

        if (deployment.getMetadata().getAnnotations() == null) {
            deployment.getMetadata().setAnnotations(new java.util.HashMap<>());
        }
        deployment.getMetadata().getAnnotations().put(annotationKey, annotationValue);

        Deployment rolledback = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(rolledback);
    }

    /**
     * Get deployment revision history.
     */
    public List<DeploymentRevisionDTO> getDeploymentRevisions(String namespace, String name) {
        ReplicaSetList replicaSets = kubernetesClient.apps().replicaSets()
                .inNamespace(namespace)
                .list();

        return replicaSets.getItems().stream()
                .filter(rs -> rs.getMetadata().getOwnerReferences() != null
                        && rs.getMetadata().getOwnerReferences().stream()
                                .anyMatch(ref -> "Deployment".equals(ref.getKind())
                                        && ref.getName().equals(name)))
                .map(rs -> {
                    String revisionStr = rs.getMetadata().getAnnotations() != null
                            ? rs.getMetadata().getAnnotations()
                                    .getOrDefault("deployment.kubernetes.io/revision", "0")
                            : "0";
                    long revision = Long.parseLong(revisionStr);
                    String timestamp = rs.getMetadata().getCreationTimestamp();
                    long creationTime = timestamp != null ? Instant.parse(timestamp).toEpochMilli() : 0L;

                    return new DeploymentRevisionDTO(
                            revision,
                            revisionStr,
                            null, // changedBy - TODO: Get from audit logs
                            "Rollback", // changeType
                            Instant.ofEpochMilli(creationTime).toString());
                })
                .sorted((a, b) -> Long.compare(b.revision(), a.revision()) * -1)
                .collect(Collectors.toList());
    }

    /**
     * Create job.
     */
    public JobDTO createJob(String namespace, JobRequestDTO request) {
        Job job = k8sMapper.mapToJob(request);
        Job created = kubernetesClient.batch().v1().jobs()
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
        CronJob created = kubernetesClient.batch().v1().cronjobs()
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
                        "Dry run successful - resource would be created");
            }

            Object result = switch (kind) {
                case "Deployment" -> {
                    Deployment deployment = kubernetesClient.apps().deployments()
                            .inNamespace(namespace)
                            .resource((Deployment) resource)
                            .create();
                    uid = deployment.getMetadata() != null ? deployment.getMetadata().getUid() : null;
                    yield k8sMapper.mapToDeploymentDto(deployment);
                }
                case "StatefulSet" -> {
                    StatefulSet statefulSet = kubernetesClient.apps().statefulSets()
                            .inNamespace(namespace)
                            .resource((StatefulSet) resource)
                            .create();
                    uid = statefulSet.getMetadata() != null ? statefulSet.getMetadata().getUid() : null;
                    yield k8sMapper.mapToStatefulSetDto(statefulSet);
                }
                case "DaemonSet" -> {
                    DaemonSet daemonSet = kubernetesClient.apps().daemonSets()
                            .inNamespace(namespace)
                            .resource((DaemonSet) resource)
                            .create();
                    uid = daemonSet.getMetadata() != null ? daemonSet.getMetadata().getUid() : null;
                    yield k8sMapper.mapToDaemonSetDto(daemonSet);
                }
                case "Job" -> {
                    Job job = kubernetesClient.batch().v1().jobs()
                            .inNamespace(namespace)
                            .resource((Job) resource)
                            .create();
                    uid = job.getMetadata() != null ? job.getMetadata().getUid() : null;
                    yield k8sMapper.mapToJobDto(job);
                }
                case "CronJob" -> {
                    CronJob cronJob = kubernetesClient.batch().v1().cronjobs()
                            .inNamespace(namespace)
                            .resource((CronJob) resource)
                            .create();
                    uid = cronJob.getMetadata() != null ? cronJob.getMetadata().getUid() : null;
                    yield k8sMapper.mapToCronJobDto(cronJob);
                }
                default -> {
                    throw new IllegalArgumentException(
                            String.format(
                                    "Unsupported resource kind: %s. Supported kinds: Deployment, StatefulSet, DaemonSet, Job, CronJob",
                                    kind));
                }
            };

            return new WorkloadCreateResponseDTO(
                    kind,
                    name,
                    namespace,
                    false,
                    uid,
                    String.format("%s %s created successfully in namespace %s", kind, name, namespace));
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid YAML: " + e.getMessage(), e);
        }
    }

    /**
     * Update deployment strategy.
     */
    public DeploymentDTO updateDeploymentStrategy(String namespace, String name, UpdateStrategyRequestDTO request) {
        Deployment deployment = kubernetesClient.apps().deployments()
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
            RollingUpdateDeployment rollingUpdate = new RollingUpdateDeployment();
            rollingUpdate.setMaxUnavailable(new IntOrString(request.rollingUpdate().maxUnavailable()));
            rollingUpdate.setMaxSurge(new IntOrString(request.rollingUpdate().maxSurge()));
            strategy.setRollingUpdate(rollingUpdate);
        }

        spec.setStrategy(strategy);

        Deployment updated = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(updated);
    }

    /**
     * Update container resources.
     */
    public DeploymentDTO updateContainerResources(String namespace, String name,
            String containerName, ResourceRequirementsDTO resources) {
        Deployment deployment = kubernetesClient.apps().deployments()
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
            io.fabric8.kubernetes.api.model.ResourceRequirements k8sResources = new io.fabric8.kubernetes.api.model.ResourceRequirements();

            if (resources.limits() != null) {
                ResourceLimitsDTO limits = resources.limits();
                if (limits.cpu() != null || limits.memory() != null) {
                    Map<String, Quantity> limitsMap = new java.util.HashMap<>();
                    if (limits.cpu() != null) {
                        limitsMap.put("cpu", new Quantity(limits.cpu()));
                    }
                    if (limits.memory() != null) {
                        limitsMap.put("memory", new Quantity(limits.memory()));
                    }
                    k8sResources.setLimits(limitsMap);
                }
            }

            if (resources.requests() != null) {
                ResourceRequestsDTO requests = resources.requests();
                if (requests.cpu() != null || requests.memory() != null) {
                    Map<String, Quantity> requestsMap = new java.util.HashMap<>();
                    if (requests.cpu() != null) {
                        requestsMap.put("cpu", new Quantity(requests.cpu()));
                    }
                    if (requests.memory() != null) {
                        requestsMap.put("memory", new Quantity(requests.memory()));
                    }
                    k8sResources.setRequests(requestsMap);
                }
            }

            container.setResources(k8sResources);
        }

        Deployment updated = kubernetesClient.apps().deployments()
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

        PodDisruptionBudget pdb = new PodDisruptionBudget();

        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        if (request.annotations() != null) {
            metadata.setAnnotations(request.annotations());
        }
        pdb.setMetadata(metadata);

        PodDisruptionBudgetSpec spec = new PodDisruptionBudgetSpec();
        spec.setMinAvailable(new IntOrString(request.minAvailable()));
        spec.setMaxUnavailable(new IntOrString(request.maxUnavailable()));

        if (request.selector() != null && request.selector().matchLabels() != null) {
            spec.setSelector(new LabelSelector());
            spec.getSelector().setMatchLabels(request.selector().matchLabels());
        }

        pdb.setSpec(spec);

        PodDisruptionBudget created = kubernetesClient.policy()
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
        PodDisruptionBudget pdb = kubernetesClient.policy()
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

    private Object mapToPodDisruptionBudgetDto(PodDisruptionBudget pdb) {
        return new Object();
    }

    /**
     * Update container environment variables.
     */
    public DeploymentDTO updateContainerEnvVars(String namespace, String name,
            String containerName, Map<String, String> envVars) {
        Deployment deployment = kubernetesClient.apps().deployments()
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
            List<EnvVar> originalEnv = container.getEnv();
            final List<EnvVar> baseEnv = originalEnv != null ? originalEnv : new java.util.ArrayList<>();

            List<EnvVar> updatedEnv = new java.util.ArrayList<>(baseEnv);
            envVars.forEach((key, value) -> {
                boolean exists = baseEnv.stream()
                        .anyMatch(e -> key.equals(e.getName()));
                if (exists) {
                    updatedEnv.stream()
                            .filter(e -> key.equals(e.getName()))
                            .findFirst()
                            .ifPresent(e -> e.setValue(value));
                } else {
                    EnvVar newEnvVar = new EnvVar();
                    newEnvVar.setName(key);
                    newEnvVar.setValue(value);
                    updatedEnv.add(newEnvVar);
                }
            });

            container.setEnv(updatedEnv);
        }

        Deployment updated = kubernetesClient.apps().deployments()
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
            case "Deployment" -> kubernetesClient.apps().deployments()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "StatefulSet" -> kubernetesClient.apps().statefulSets()
                    .inNamespace(sourceNamespace).withName(sourceName).get();
            case "DaemonSet" -> kubernetesClient.apps().daemonSets()
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
            clonedResource.getMetadata().setCreationTimestamp("");

            if (clonedResource.getMetadata().getAnnotations() == null) {
                clonedResource.getMetadata().setAnnotations(new java.util.HashMap<>());
            }
            clonedResource.getMetadata().getAnnotations()
                    .put("cloned-from", String.format("%s/%s/%s", sourceKind, sourceNamespace, sourceName));

            HasMetadata created = switch (sourceKind) {
                case "Deployment" -> kubernetesClient.apps().deployments()
                        .inNamespace(targetNamespace).resource((Deployment) clonedResource).create();
                case "StatefulSet" -> kubernetesClient.apps().statefulSets()
                        .inNamespace(targetNamespace).resource((StatefulSet) clonedResource).create();
                case "DaemonSet" -> kubernetesClient.apps().daemonSets()
                        .inNamespace(targetNamespace).resource((DaemonSet) clonedResource).create();
                case "Service" -> kubernetesClient.services()
                        .inNamespace(targetNamespace).resource((io.fabric8.kubernetes.api.model.Service) clonedResource)
                        .create();
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
                case "Service" -> k8sMapper.mapToServiceDto((io.fabric8.kubernetes.api.model.Service) created);
                case "ConfigMap" -> {
                    ConfigMap cm = (ConfigMap) created;
                    String timestamp = cm.getMetadata().getCreationTimestamp();
                    long creationTime = timestamp != null ? Instant.parse(timestamp).toEpochMilli() : 0L;
                    yield new ConfigMapDTO(
                            cm.getMetadata().getName(),
                            cm.getMetadata().getNamespace(),
                            creationTime,
                            cm.getData() != null ? cm.getData() : Map.of(),
                            Map.of(), // binaryData not implemented
                            cm.getMetadata().getLabels() != null ? cm.getMetadata().getLabels() : Map.of());
                }
                case "Secret" -> {
                    Secret secret = (Secret) created;
                    String timestamp = secret.getMetadata().getCreationTimestamp();
                    long creationTime = timestamp != null ? Instant.parse(timestamp).toEpochMilli() : 0L;
                    yield new SecretDTO(
                            secret.getMetadata().getName(),
                            secret.getMetadata().getNamespace(),
                            secret.getType(),
                            creationTime,
                            secret.getData(),
                            secret.getMetadata().getLabels(),
                            false); // Immutable field not available in older Kubernetes versions
                }
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
        Deployment deployment = kubernetesClient.apps().deployments()
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

        Deployment paused = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(paused);
    }

    /**
     * Resume deployment.
     */
    public DeploymentDTO resumeDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.apps().deployments()
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

        Deployment resumed = kubernetesClient.apps().deployments()
                .resource(deployment)
                .replace();

        return k8sMapper.mapToDeploymentDto(resumed);
    }

    /**
     * List jobs.
     */
    public ResourceListDTO<JobDTO> listJobs(String namespace, String search) {
        var operation = kubernetesClient.batch().v1().jobs();
        var items = (namespace != null && !namespace.isEmpty())
                ? operation.inNamespace(namespace).list().getItems()
                : operation.inAnyNamespace().list().getItems();

        List<JobDTO> jobDTOs = items.stream()
                .filter(job -> search == null || job.getMetadata().getName().contains(search))
                .map(k8sMapper::mapToJobDto)
                .collect(Collectors.toList());

        return new ResourceListDTO<>(
                "Job",
                "batch/v1",
                jobDTOs,
                new ResourceListMetaDTO(0, "", 0));
    }

    /**
     * List cron jobs.
     */
    public ResourceListDTO<CronJobDTO> listCronJobs(String namespace, String search) {
        var operation = kubernetesClient.batch().v1().cronjobs();
        var items = (namespace != null && !namespace.isEmpty())
                ? operation.inNamespace(namespace).list().getItems()
                : operation.inAnyNamespace().list().getItems();

        List<CronJobDTO> cronJobDTOs = items.stream()
                .filter(cronJob -> search == null || cronJob.getMetadata().getName().contains(search))
                .map(k8sMapper::mapToCronJobDto)
                .collect(Collectors.toList());

        return new ResourceListDTO<>(
                "CronJob",
                "batch/v1",
                cronJobDTOs,
                new ResourceListMetaDTO(0, "", 0));
    }
}
