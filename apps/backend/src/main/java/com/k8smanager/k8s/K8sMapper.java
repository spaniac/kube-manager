package com.k8smanager.k8s;

import com.k8smanager.dto.*;
import io.fabric8.kubernetes.api.model.*;
import org.springframework.stereotype.Component;

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
                true, // TODO: Check actual ready status
                0, // TODO: Get actual restart count
                "Running" // TODO: Get actual state
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
                condition.getLastTransitionTime() != null
                        ? condition.getLastTransitionTime().toEpochMilli() : 0
        );
    }

    /**
     * Map DeploymentRequestDTO to Kubernetes Deployment.
     */
    public Deployment mapToDeployment(DeploymentRequestDTO request) {
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
        spec.getSelector().setMatchLabels(request.labels());
        spec.setTemplate(new PodTemplateSpec());

        PodTemplateSpec templateSpec = spec.getTemplate();
        ObjectMeta templateMeta = new ObjectMeta();
        templateMeta.setLabels(request.labels());
        templateSpec.setMetadata(templateMeta);

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
                .collect(Collectors.toList()));
        templateSpec.setSpec(podSpec);

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
    public Service mapToService(ServiceRequestDTO request) {
        Service service = new Service();
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
        if (portDto.targetPort() != null) {
            port.setTargetPort(new IntOrString(portDto.targetPort()));
        }
        return port;
    }

    /**
     * Map Kubernetes Service to ServiceDTO.
     */
    public ServiceDTO mapToServiceDto(Service service) {
        ServiceSpec spec = service.getSpec();

        return new ServiceDTO(
                service.getMetadata().getName(),
                service.getMetadata().getNamespace(),
                spec != null ? spec.getType() : "ClusterIP",
                spec != null ? spec.getClusterIPs() : List.of(),
                spec != null ? spec.getPorts().stream()
                        .map(this::mapToServicePortDto)
                        .collect(Collectors.toList()) : List.of(),
                spec != null ? spec.getSelector() : null,
                List.of() // TODO: Get actual endpoints
        );
    }

    private ServicePortDTO mapToServicePortDto(ServicePort port) {
        return new ServicePortDTO(
                port.getName(),
                port.getProtocol(),
                port.getPort(),
                port.getTargetPort() != null ? Integer.parseInt(port.getTargetPort().getStrVal()) : port.getPort()
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
                namespace.getMetadata().getCreationTimestamp().toEpochMilli(),
                namespace.getMetadata().getLabels(),
                namespace.getMetadata().getAnnotations()
        );
    }

    /**
     * Map JobRequestDTO to Kubernetes Job.
     */
    public io.fabric8.kubernetes.api.model.Job mapToJob(JobRequestDTO request) {
        Job job = new Job();
        ObjectMeta metadata = new ObjectMeta();
        metadata.setName(request.name());
        if (request.labels() != null) {
            metadata.setLabels(request.labels());
        }
        job.setMetadata(metadata);

        JobSpec spec = new JobSpec();
        spec.setTtlSeconds(3600);
        spec.setBackoffLimit(4);

        JobSpec specWithPod = spec;

        if (request.containers() != null && !request.containers().isEmpty()) {
            PodTemplateSpec podTemplate = new PodTemplateSpec();
            PodTemplate template = new PodTemplate();
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
            specWithPod.setTemplate(podTemplate);
        }

        job.setSpec(specWithPod);
        return job;
    }

    /**
     * Map CronJobRequestDTO to Kubernetes CronJob.
     */
    public io.fabric8.kubernetes.api.model.CronJob mapToCronJob(CronJobRequestDTO request) {
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
        jobTemplate.setTemplate(podTemplate);
        spec.setJobTemplate(jobTemplate);

        cronJob.setSpec(spec);
        return cronJob;
    }

    /**
     * Map Kubernetes Job to JobDTO.
     */
    public JobDTO mapToJobDto(io.fabric8.kubernetes.api.model.Job job) {
        JobStatus status = job.getStatus();
        return new JobDTO(
                job.getMetadata().getName(),
                job.getMetadata().getNamespace(),
                status != null ? status.getSucceeded() : "",
                status != null ? status.getActive() : 0,
                job.getMetadata().getCreationTimestamp().toEpochMilli(),
                job.getSpec() != null ? job.getSpec().getTtlSeconds() : 0,
                job.getStatus() != null ? status.getFailed() : 0,
                job.getStatus() != null ? status.getSucceeded() : 0
        );
    }

    /**
     * Map Kubernetes CronJob to CronJobDTO.
     */
    public CronJobDTO mapToCronJobDto(io.fabric8.kubernetes.api.model.CronJob cronJob) {
        CronJobStatus status = cronJob.getStatus();
        return new CronJobDTO(
                cronJob.getMetadata().getName(),
                cronJob.getMetadata().getNamespace(),
                cronJob.getSpec() != null ? cronJob.getSpec().getSchedule() : "",
                cronJob.getStatus() != null ? String.valueOf(status.getSuspend()) : "False",
                cronJob.getMetadata().getAnnotations() != null
                        ? cronJob.getMetadata().getAnnotations()
                                        .getOrDefault("last-schedule", "") : "",
                cronJob.getMetadata().getAnnotations() != null
                        ? cronJob.getMetadata().getAnnotations()
                                        .getOrDefault("next-schedule", "") : "",
                status != null ? String.valueOf(status.getActive()) : "False",
                cronJob.getStatus() != null ? status.getSucceeded() : 0,
                cronJob.getStatus() != null ? status.getFailed() : 0
        );
    }
}
