package com.k8smanager.k8s;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.*;
import io.fabric8.kubernetes.api.model.batch.v1.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Utility for mapping DTOs to Kubernetes objects and vice versa.
 */
@Component
public class K8sMapper {

    /**
     * Map PodDTO to Kubernetes Pod.
     */
    public Pod mapToPod(PodDTO podDto) {
        Pod pod = new Pod();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(podDto.name());
        if (podDto.namespace() != null) {
            metadata.setNamespace(podDto.namespace());
        }
        pod.setMetadata(metadata);

        PodSpec spec = new PodSpec();
        spec.setContainers(podDto.containers().stream()
                .map(this::mapToContainer)
                .collect(Collectors.toList()));
        pod.setSpec(spec);

        return pod;
    }

    /**
     * Map Kubernetes Pod to PodDTO.
     */
    public PodDTO mapToPodDto(Pod pod) {
        return new PodDTO(
                pod.getMetadata().getName(),
                pod.getMetadata().getNamespace(),
                pod.getStatus() != null ? pod.getStatus().getPhase() : "Unknown",
                pod.getStatus() != null ? pod.getStatus().getPhase() : "Unknown",
                pod.getSpec() != null ? pod.getSpec().getNodeName() : null,
                pod.getStatus() != null ? pod.getStatus().getPodIP() : null,
                pod.getStatus() != null ? pod.getStatus().getStartTime() : null,
                pod.getSpec() != null ? pod.getSpec().getContainers().stream()
                        .map(this::mapToContainerDto)
                        .collect(Collectors.toList()) : List.of(),
                pod.getStatus() != null ? pod.getStatus().getConditions().stream()
                        .map(this::mapToConditionDto)
                        .collect(Collectors.toList()) : List.of()
        );
    }

    /**
     * Map PodContainerDTO to Kubernetes Container.
     */
    private Container mapToContainer(PodContainerDTO containerDto) {
        Container container = new Container();
        container.setName(containerDto.name());
        container.setImage(containerDto.image());
        return container;
    }

    /**
     * Map Kubernetes Container to PodContainerDTO.
     */
    private PodContainerDTO mapToContainerDto(Container container) {
        return new PodContainerDTO(
                container.getName(),
                container.getImage(),
                List.of(), // TODO: Map actual ports
                List.of(), // TODO: Map actual env vars
                new ResourceRequirementsDTO(null, null), // TODO: Map actual resources
                List.of() // TODO: Map actual volume mounts
        );
    }

    /**
     * Map Kubernetes PodCondition to PodConditionDTO.
     */
    private PodConditionDTO mapToConditionDto(PodCondition condition) {
        return new PodConditionDTO(
                condition.getType(),
                condition.getStatus(),
                condition.getReason(),
                condition.getMessage(),
                0 // TODO: Parse timestamp properly
        );
    }

    /**
     * Map DeploymentRequestDTO to Kubernetes Deployment.
     */
    public Deployment mapToDeployment(DeploymentRequestDTO request) {
        if (request == null) System.out.println("Request is null");
        Deployment deployment = new Deployment();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.namespace() != null) {
            metadata.setNamespace(request.namespace());
        }
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        if (request.annotations() != null) {
            metadata.setAnnotations(request.annotations());
        }
        deployment.setMetadata(metadata);

        DeploymentSpec spec = new DeploymentSpec();
        spec.setReplicas(request.replicas());
        spec.setSelector(new LabelSelector());
        if (request.labels() != null) {
             spec.getSelector().setMatchLabels(request.labels());
        }
        spec.setTemplate(new PodTemplateSpec());

        PodTemplateSpec templateSpec = spec.getTemplate();
        ObjectMeta templateMeta = new ObjectMeta();
        if (request.labels() != null) {
            templateMeta.setLabels(request.labels());
        }
        templateSpec.setMetadata(templateMeta);

        PodSpec podSpec = new PodSpec();
        if (request.containers() != null) {
            podSpec.setContainers(request.containers().stream()
                    .map(c -> mapToContainer(new PodContainerDTO(
                            c.name(),
                            c.image(),
                            c.ports(),
                            c.env(),
                            c.resources(),
                            c.volumeMounts()
                    )))
                    .collect(Collectors.toList()));
        }
        templateSpec.setSpec(podSpec);
        deployment.setSpec(spec);

        return deployment;
    }

    /**
     * Map Kubernetes Deployment to DeploymentDTO.
     */
    public DeploymentDTO mapToDeploymentDto(Deployment deployment) {
        DeploymentSpec spec = deployment.getSpec();
        DeploymentStatus status = deployment.getStatus();

        int replicas = spec != null ? spec.getReplicas() : 0;
        int readyReplicas = status != null && status.getReadyReplicas() != null
                ? status.getReadyReplicas() : 0;
        int availableReplicas = status != null && status.getAvailableReplicas() != null
                ? status.getAvailableReplicas() : 0;
        int updatedReplicas = status != null && status.getUpdatedReplicas() != null
                ? status.getUpdatedReplicas() : 0;

        return new DeploymentDTO(
                deployment.getMetadata().getName(),
                deployment.getMetadata().getNamespace(),
                replicas,
                readyReplicas,
                availableReplicas,
                updatedReplicas,
                spec != null && spec.getStrategy() != null
                        ? spec.getStrategy().getType() : "RollingUpdate",
                spec != null && spec.getSelector() != null
                        ? spec.getSelector().getMatchLabels().toString() : null,
                new PodTemplateDTO(
                        deployment.getMetadata().getLabels(),
                        spec != null && spec.getTemplate() != null && spec.getTemplate().getSpec() != null
                                ? spec.getTemplate().getSpec().getContainers().stream()
                                .map(this::mapToContainerDto)
                                .collect(Collectors.toList()) : List.of()
                )
        );
    }

    /**
     * Map ServiceRequestDTO to Kubernetes Service.
     */
    public io.fabric8.kubernetes.api.model.Service mapToService(ServiceRequestDTO request) {
        io.fabric8.kubernetes.api.model.Service service = new io.fabric8.kubernetes.api.model.Service();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.namespace() != null) {
            metadata.setNamespace(request.namespace());
        }
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        service.setMetadata(metadata);

        ServiceSpec spec = new ServiceSpec();
        spec.setType(request.type());
        spec.setPorts(request.ports().stream()
                .map(this::mapToServicePort)
                .collect(Collectors.toList()));
        spec.setSelector(request.selector());
        service.setSpec(spec);

        return service;
    }

    /**
     * Map ServicePortRequestDTO to Kubernetes ServicePort.
     */
    private ServicePort mapToServicePort(ServicePortRequestDTO portDto) {
        ServicePort port = new ServicePort();
        port.setName(portDto.name());
        port.setProtocol(portDto.protocol());
        port.setPort(portDto.port());
        port.setTargetPort(new IntOrString(portDto.targetPort()));
        return port;
    }

    /**
     * Map Kubernetes Service to ServiceDTO.
     */
    public com.k8smanager.dto.ServiceDTO mapToServiceDto(io.fabric8.kubernetes.api.model.Service service) {
        ServiceSpec spec = service.getSpec();

        String selector = null;
        if (spec != null && spec.getSelector() != null) {
            selector = spec.getSelector().toString();
        }

        return new com.k8smanager.dto.ServiceDTO(
                service.getMetadata().getName(),
                service.getMetadata().getNamespace(),
                spec != null ? spec.getType() : "ClusterIP",
                spec != null ? spec.getClusterIPs() : List.of(),
                spec != null ? spec.getPorts().stream()
                        .map(this::mapToServicePortDto)
                        .collect(Collectors.toList()) : List.of(),
                selector,
                List.of() // TODO: Get actual endpoints
        );
    }

    private ServicePortDTO mapToServicePortDto(ServicePort port) {
        Integer targetPort = port.getPort();
        if (port.getTargetPort() != null) {
            if (port.getTargetPort().getIntVal() != null) {
                targetPort = port.getTargetPort().getIntVal();
            } else if (port.getTargetPort().getStrVal() != null) {
                try {
                    targetPort = Integer.parseInt(port.getTargetPort().getStrVal());
                } catch (NumberFormatException e) {
                    // Ignore string target ports for now
                }
            }
        }
        return new ServicePortDTO(
                port.getName(),
                port.getProtocol(),
                port.getPort(),
                targetPort
        );
    }

    /**
     * Map ConfigMapRequestDTO to Kubernetes ConfigMap.
     */
    public ConfigMap mapToConfigMap(ConfigMapRequestDTO request) {
        ConfigMap configMap = new ConfigMap();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.namespace() != null) {
            metadata.setNamespace(request.namespace());
        }
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        configMap.setMetadata(metadata);

        if (request.data() != null) {
            configMap.setData(request.data());
        }

        return configMap;
    }

    /**
     * Map Kubernetes ConfigMap to ConfigMapDTO.
     */
    public ConfigMapDTO mapToConfigMapDto(ConfigMap configMap) {
        return new ConfigMapDTO(
                configMap.getMetadata().getName(),
                configMap.getMetadata().getNamespace(),
                0, // TODO: Parse timestamp properly
                configMap.getData() != null ? configMap.getData() : Map.of(),
                Map.of(),
                configMap.getMetadata().getLabels() != null ? configMap.getMetadata().getLabels() : Map.of()
        );
    }

    /**
     * Map NamespaceRequestDTO to Kubernetes Namespace.
     */
    public Namespace mapToNamespace(NamespaceRequestDTO request) {
        Namespace namespace = new Namespace();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        if (request.annotations() != null) {
            metadata.setAnnotations(request.annotations());
        }
        namespace.setMetadata(metadata);
        return namespace;
    }

    /**
     * Map Kubernetes Namespace to NamespaceDTO.
     */
    public NamespaceDTO mapToNamespaceDto(Namespace namespace) {
        return new NamespaceDTO(
                namespace.getMetadata().getName(),
                namespace.getStatus() != null ? "Active" : "Terminating",
                namespace.getMetadata().getCreationTimestamp() != null ? namespace.getMetadata().getCreationTimestamp() : "",
                namespace.getMetadata().getLabels(),
                namespace.getMetadata().getAnnotations()
        );
    }

    /**
     * Map JobRequestDTO to Kubernetes Job.
     */
    public Job mapToJob(JobRequestDTO request) {
        Job job = new Job();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        job.setMetadata(metadata);

        JobSpec spec = new JobSpec();

        if (request.containers() != null && !request.containers().isEmpty()) {
            PodTemplateSpec podTemplate = new PodTemplateSpec();
            PodSpec podSpec = new PodSpec();

            podSpec.setContainers(request.containers().stream()
                    .map(c -> mapToContainer(new PodContainerDTO(
                            c.name(),
                            c.image(),
                            c.ports(),
                            c.env(),
                            c.resources(),
                            c.volumeMounts()
                    )))
                    .toList());
            podTemplate.setSpec(podSpec);
            podTemplate.setMetadata(metadata);
            spec.setTemplate(podTemplate);
        }

        job.setSpec(spec);
        return job;
    }

    /**
     * Map CronJobRequestDTO to Kubernetes CronJob.
     */
    public CronJob mapToCronJob(CronJobRequestDTO request) {
        CronJob cronJob = new CronJob();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        cronJob.setMetadata(metadata);

        CronJobSpec spec = new CronJobSpec();
        spec.setSchedule(request.schedule());
        spec.setSuspend(false);

        JobTemplateSpec jobTemplate = new JobTemplateSpec();
        PodTemplateSpec podTemplate = new PodTemplateSpec();
        PodSpec podSpec = new PodSpec();

        if (request.containers() != null && !request.containers().isEmpty()) {
            podSpec.setContainers(request.containers().stream()
                    .map(c -> mapToContainer(new PodContainerDTO(
                            c.name(),
                            c.image(),
                            c.ports(),
                            c.env(),
                            c.resources(),
                            c.volumeMounts()
                    )))
                    .toList());
        }

        podTemplate.setSpec(podSpec);
        podTemplate.setMetadata(metadata);
        jobTemplate.setSpec(new JobSpec());
        spec.setJobTemplate(jobTemplate);

        cronJob.setSpec(spec);
        return cronJob;
    }

    /**
     * Map Kubernetes Job to JobDTO.
     */
    public JobDTO mapToJobDto(Job job) {
        JobStatus status = job.getStatus();
        return new JobDTO(
                job.getMetadata().getName(),
                job.getMetadata().getNamespace(),
                "Active", // TODO: Get actual status
                0, // TODO: Get actual completions
                status != null ? status.getActive() : 0,
                status != null ? status.getSucceeded() : 0,
                status != null ? status.getFailed() : 0,
                null // TODO: Map template
        );
    }

    /**
     * Map Kubernetes CronJob to CronJobDTO.
     */
    public CronJobDTO mapToCronJobDto(CronJob cronJob) {
        CronJobStatus status = cronJob.getStatus();
        CronJobSpec spec = cronJob.getSpec();
        return new CronJobDTO(
                cronJob.getMetadata().getName(),
                cronJob.getMetadata().getNamespace(),
                spec != null ? spec.getSchedule() : "",
                spec != null ? spec.getConcurrencyPolicy() : "",
                spec != null ? Boolean.TRUE.equals(spec.getSuspend()) : false,
                spec != null && spec.getSuccessfulJobsHistoryLimit() != null ? spec.getSuccessfulJobsHistoryLimit() : 0,
                spec != null && spec.getFailedJobsHistoryLimit() != null ? spec.getFailedJobsHistoryLimit() : 0,
                null, // TODO: Map last schedule
                null // TODO: Map active job
        );
    }

    /**
     * Map Kubernetes StatefulSet to StatefulSetDTO.
     */
    public StatefulSetDTO mapToStatefulSetDto(StatefulSet statefulSet) {
        StatefulSetSpec spec = statefulSet.getSpec();
        StatefulSetStatus status = statefulSet.getStatus();

        int replicas = spec != null ? (spec.getReplicas() != null ? spec.getReplicas() : 0) : 0;
        int readyReplicas = status != null && status.getReadyReplicas() != null ? status.getReadyReplicas() : 0;
        String serviceName = spec != null && spec.getServiceName() != null ? spec.getServiceName() : null;

        return new StatefulSetDTO(
                statefulSet.getMetadata().getName(),
                statefulSet.getMetadata().getNamespace(),
                replicas,
                readyReplicas,
                serviceName,
                null // TODO: Map pod template
        );
    }

    /**
     * Map Kubernetes DaemonSet to DaemonSetDTO.
     */
    public DaemonSetDTO mapToDaemonSetDto(DaemonSet daemonSet) {
        DaemonSetSpec spec = daemonSet.getSpec();
        DaemonSetStatus status = daemonSet.getStatus();

        int desiredNumberScheduled = spec != null && spec.getSelector() != null ? 0 : 0;
        int currentNumberScheduled = status != null && status.getCurrentNumberScheduled() != null
                ? status.getCurrentNumberScheduled() : 0;
        int numberReady = status != null && status.getNumberReady() != null ? status.getNumberReady() : 0;
        String selector = spec != null && spec.getSelector() != null
                ? spec.getSelector().getMatchLabels().toString() : null;

        return new DaemonSetDTO(
                daemonSet.getMetadata().getName(),
                daemonSet.getMetadata().getNamespace(),
                desiredNumberScheduled,
                currentNumberScheduled,
                numberReady,
                selector,
                null // TODO: Map pod template
        );
    }
}
