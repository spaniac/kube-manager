package com.k8smanager.service;

import com.k8smanager.dto.*;
import com.k8smanager.k8s.K8sMapper;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Service for generic resource management.
 */
@Service
public class ResourceService {

    private final KubernetesClient kubernetesClient;
    private final K8sMapper k8sMapper;
    private final StatusBadgeService statusBadgeService;

    public ResourceService(KubernetesClient kubernetesClient, K8sMapper k8sMapper,
                          StatusBadgeService statusBadgeService) {
        this.kubernetesClient = kubernetesClient;
        this.k8sMapper = k8sMapper;
        this.statusBadgeService = statusBadgeService;
    }

    /**
     * Generic list resources.
     */
    public <T> ResourceListDTO<T> listResources(String resourceType, String namespace,
                                                        String labelSelector, String sortField, String sortOrder) {
        return switch (resourceType.toLowerCase()) {
            case "pods" -> listPods(namespace, labelSelector, sortField, sortOrder);
            case "deployments" -> listDeployments(namespace, labelSelector, sortField, sortOrder);
            case "services" -> listServices(namespace, labelSelector, sortField, sortOrder);
            case "configmaps" -> listConfigMaps(namespace, labelSelector, sortField, sortOrder);
            case "secrets" -> listSecrets(namespace, labelSelector, sortField, sortOrder);
            case "statefulsets" -> listStatefulSets(namespace, labelSelector, sortField, sortOrder);
            case "daemonsets" -> listDaemonSets(namespace, labelSelector, sortField, sortOrder);
            default -> new ResourceListDTO<>(resourceType, "v1", List.of(), null);
        };
    }

    /**
     * Get resource details.
     */
    public <T> T getResource(String resourceType, String namespace, String name) {
        return switch (resourceType.toLowerCase()) {
            case "pods" -> getPod(namespace, name);
            case "deployments" -> getDeployment(namespace, name);
            case "services" -> getService(namespace, name);
            case "configmaps" -> getConfigMap(namespace, name);
            case "secrets" -> getSecret(namespace, name);
            case "statefulsets" -> getStatefulSet(namespace, name);
            case "daemonsets" -> getDaemonSet(namespace, name);
            default -> null;
        };
    }

    /**
     * Update resource.
     */
    public <T> T updateResource(String resourceType, String namespace, String name, Object resource) {
        return switch (resourceType.toLowerCase()) {
            case "deployments" -> {
                kubernetesClient.deployments()
                        .inNamespace(namespace)
                        .resource(k8sMapper.mapToDeployment((DeploymentRequestDTO) resource))
                        .replace();
                return (T) k8sMapper.mapToDeploymentDto(
                        kubernetesClient.deployments()
                                .inNamespace(namespace)
                                .withName(name)
                                .get());
            }
            case "services" -> {
                kubernetesClient.services()
                        .inNamespace(namespace)
                        .resource(k8sMapper.mapToService((ServiceRequestDTO) resource))
                        .replace();
                return (T) k8sMapper.mapToServiceDto(
                        kubernetesClient.services()
                                .inNamespace(namespace)
                                .withName(name)
                                .get());
            }
            case "configmaps" -> {
                kubernetesClient.configMaps()
                        .inNamespace(namespace)
                        .resource(k8sMapper.mapToConfigMap((ConfigMapRequestDTO) resource))
                        .replace();
                return (T) k8sMapper.mapToConfigMapDto(
                        kubernetesClient.configMaps()
                                .inNamespace(namespace)
                                .withName(name)
                                .get());
            }
            default -> null;
        };
    }

    /**
     * Delete resource.
     */
    public void deleteResource(String resourceType, String namespace, String name) {
        switch (resourceType.toLowerCase()) {
            case "pods" -> kubernetesClient.pods().inNamespace(namespace).withName(name).delete();
            case "deployments" -> kubernetesClient.deployments().inNamespace(namespace).withName(name).delete();
            case "services" -> kubernetesClient.services().inNamespace(namespace).withName(name).delete();
            case "configmaps" -> kubernetesClient.configMaps().inNamespace(namespace).withName(name).delete();
            case "secrets" -> kubernetesClient.secrets().inNamespace(namespace).withName(name).delete();
            case "statefulsets" -> kubernetesClient.statefulSets().inNamespace(namespace).withName(name).delete();
            case "daemonsets" -> kubernetesClient.daemonSets().inNamespace(namespace).withName(name).delete();
        }
    }

    private ResourceListDTO<PodDTO> listPods(String namespace, String labelSelector, String sortField, String sortOrder) {
        PodList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.pods().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.pods().inAnyNamespace().list();
        }

        List<PodDTO> pods = list.getItems().stream()
                .map(k8sMapper::mapToPodDto)
                .toList();

        // TODO: Apply labelSelector and sorting
        return new ResourceListDTO<>("PodList", "v1", pods, null);
    }

    private ResourceListDTO<DeploymentDTO> listDeployments(String namespace, String labelSelector, String sortField, String sortOrder) {
        DeploymentList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.deployments().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.deployments().inAnyNamespace().list();
        }

        List<DeploymentDTO> deployments = list.getItems().stream()
                .map(k8sMapper::mapToDeploymentDto)
                .toList();

        return new ResourceListDTO<>("DeploymentList", "v1", deployments, null);
    }

    private ResourceListDTO<ServiceDTO> listServices(String namespace, String labelSelector, String sortField, String sortOrder) {
        ServiceList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.services().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.services().inAnyNamespace().list();
        }

        List<ServiceDTO> services = list.getItems().stream()
                .map(k8sMapper::mapToServiceDto)
                .toList();

        return new ResourceListDTO<>("ServiceList", "v1", services, null);
    }

    private ResourceListDTO<ConfigMapDTO> listConfigMaps(String namespace, String labelSelector, String sortField, String sortOrder) {
        ConfigMapList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.configMaps().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.configMaps().inAnyNamespace().list();
        }

        List<ConfigMapDTO> configMaps = list.getItems().stream()
                .map(this::mapToConfigMapDto)
                .toList();

        return new ResourceListDTO<>("ConfigMapList", "v1", configMaps, null);
    }

    private ResourceListDTO<SecretDTO> listSecrets(String namespace, String labelSelector, String sortField, String sortOrder) {
        SecretList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.secrets().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.secrets().inAnyNamespace().list();
        }

        List<SecretDTO> secrets = list.getItems().stream()
                .map(this::mapToSecretDto)
                .toList();

        return new ResourceListDTO<>("SecretList", "v1", secrets, null);
    }

    private ResourceListDTO<StatefulSetDTO> listStatefulSets(String namespace, String labelSelector, String sortField, String sortOrder) {
        StatefulSetList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.statefulSets().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.statefulSets().inAnyNamespace().list();
        }

        List<StatefulSetDTO> statefulSets = list.getItems().stream()
                .map(this::mapToStatefulSetDto)
                .toList();

        return new ResourceListDTO<>("StatefulSetList", "v1", statefulSets, null);
    }

    private ResourceListDTO<DaemonSetDTO> listDaemonSets(String namespace, String labelSelector, String sortField, String sortOrder) {
        DaemonSetList list;
        if (namespace != null && !namespace.isEmpty()) {
            list = kubernetesClient.daemonSets().inNamespace(namespace).list();
        } else {
            list = kubernetesClient.daemonSets().inAnyNamespace().list();
        }

        List<DaemonSetDTO> daemonSets = list.getItems().stream()
                .map(this::mapToDaemonSetDto)
                .toList();

        return new ResourceListDTO<>("DaemonSetList", "v1", daemonSets, null);
    }

    private PodDTO getPod(String namespace, String name) {
        Pod pod = kubernetesClient.pods().inNamespace(namespace).withName(name).get();
        return pod != null ? k8sMapper.mapToPodDto(pod) : null;
    }

    private DeploymentDTO getDeployment(String namespace, String name) {
        Deployment deployment = kubernetesClient.deployments().inNamespace(namespace).withName(name).get();
        return deployment != null ? k8sMapper.mapToDeploymentDto(deployment) : null;
    }

    private ServiceDTO getService(String namespace, String name) {
        Service service = kubernetesClient.services().inNamespace(namespace).withName(name).get();
        return service != null ? k8sMapper.mapToServiceDto(service) : null;
    }

    private ConfigMapDTO getConfigMap(String namespace, String name) {
        ConfigMap configMap = kubernetesClient.configMaps().inNamespace(namespace).withName(name).get();
        return configMap != null ? mapToConfigMapDto(configMap) : null;
    }

    private SecretDTO getSecret(String namespace, String name) {
        Secret secret = kubernetesClient.secrets().inNamespace(namespace).withName(name).get();
        return secret != null ? mapToSecretDto(secret) : null;
    }

    private StatefulSetDTO getStatefulSet(String namespace, String name) {
        StatefulSet statefulSet = kubernetesClient.statefulSets().inNamespace(namespace).withName(name).get();
        return statefulSet != null ? mapToStatefulSetDto(statefulSet) : null;
    }

    private DaemonSetDTO getDaemonSet(String namespace, String name) {
        DaemonSet daemonSet = kubernetesClient.daemonSets().inNamespace(namespace).withName(name).get();
        return daemonSet != null ? mapToDaemonSetDto(daemonSet) : null;
    }

    private ConfigMapDTO mapToConfigMapDto(ConfigMap configMap) {
        return new ConfigMapDTO(
                configMap.getMetadata().getName(),
                configMap.getMetadata().getNamespace(),
                configMap.getMetadata().getCreationTimestamp().toEpochMilli(),
                configMap.getData(),
                configMap.getBinaryData(),
                configMap.getMetadata().getLabels()
        );
    }

    private SecretDTO mapToSecretDto(Secret secret) {
        Map<String, String> data = secret.getData();
        return new SecretDTO(
                secret.getMetadata().getName(),
                secret.getMetadata().getNamespace(),
                secret.getType(),
                secret.getMetadata().getCreationTimestamp().toEpochMilli(),
                data != null ? data : Map.of(),
                secret.getMetadata().getLabels(),
                secret.getImmutable() != null ? secret.getImmutable() : false
        );
    }

    private StatefulSetDTO mapToStatefulSetDto(StatefulSet statefulSet) {
        return new StatefulSetDTO(
                statefulSet.getMetadata().getName(),
                statefulSet.getMetadata().getNamespace(),
                statefulSet.getSpec() != null ? statefulSet.getSpec().getReplicas() : 0,
                0, // TODO: Get actual ready replicas
                statefulSet.getStatus() != null ? statefulSet.getStatus().getCurrentReplicas() : 0
        );
    }

    private DaemonSetDTO mapToDaemonSetDto(DaemonSet daemonSet) {
        return new DaemonSetDTO(
                daemonSet.getMetadata().getName(),
                daemonSet.getMetadata().getNamespace(),
                daemonSet.getSpec() != null ? daemonSet.getSpec().getSelector().toString() : null,
                daemonSet.getSpec() != null ? daemonSet.getSpec().getReplicas() : 0,
                daemonSet.getStatus() != null ? daemonSet.getStatus().getNumberReady() : 0,
                daemonSet.getStatus() != null ? daemonSet.getStatus().getNumberAvailable() : 0
        );
    }

    /**
     * Get status badge for a resource.
     */
    public StatusBadgeDTO getStatusBadge(String resourceType, String namespace, String name) {
        return switch (resourceType.toLowerCase()) {
            case "pods" -> {
                Pod pod = kubernetesClient.pods().inNamespace(namespace).withName(name).get();
                yield pod != null ? statusBadgeService.getPodStatusBadge(pod) : null;
            }
            case "deployments" -> {
                Deployment deployment = kubernetesClient.deployments()
                        .inNamespace(namespace).withName(name).get();
                yield deployment != null ? statusBadgeService.getDeploymentStatusBadge(deployment) : null;
            }
            case "statefulsets" -> {
                StatefulSet statefulSet = kubernetesClient.statefulSets()
                        .inNamespace(namespace).withName(name).get();
                yield statefulSet != null ? statusBadgeService.getStatefulSetStatusBadge(statefulSet) : null;
            }
            case "daemonsets" -> {
                DaemonSet daemonSet = kubernetesClient.daemonSets()
                        .inNamespace(namespace).withName(name).get();
                yield daemonSet != null ? statusBadgeService.getDaemonSetStatusBadge(daemonSet) : null;
            }
            case "jobs" -> {
                io.fabric8.kubernetes.api.model.Job job = kubernetesClient.batch()
                        .v1().jobs().inNamespace(namespace).withName(name).get();
                yield job != null ? statusBadgeService.getJobStatusBadge(job) : null;
            }
            case "cronjobs" -> {
                CronJob cronJob = kubernetesClient.batch()
                        .v1().cronJobs().inNamespace(namespace).withName(name).get();
                yield cronJob != null ? statusBadgeService.getCronJobStatusBadge(cronJob) : null;
            }
            case "services" -> {
                Service service = kubernetesClient.services()
                        .inNamespace(namespace).withName(name).get();
                yield service != null ? statusBadgeService.getServiceStatusBadge(service) : null;
            }
            case "nodes" -> {
                Node node = kubernetesClient.nodes().withName(name).get();
                yield node != null ? statusBadgeService.getNodeStatusBadge(node) : null;
            }
            case "namespaces" -> {
                Namespace ns = kubernetesClient.namespaces().withName(name).get();
                yield ns != null ? statusBadgeService.getNamespaceStatusBadge(ns) : null;
            }
            default -> null;
        };
    }
}
