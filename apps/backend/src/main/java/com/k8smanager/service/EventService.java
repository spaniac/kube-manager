package com.k8smanager.service;

import com.k8smanager.dto.EventDTO;
import io.fabric8.kubernetes.api.model.EventList;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final KubernetesClient kubernetesClient;

    public EventService(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    public List<EventDTO> getPodEvents(String namespace, String podName) {
        EventList eventList;

        if (namespace != null && !namespace.isEmpty()) {
            eventList = kubernetesClient.v1().events()
                    .inNamespace(namespace)
                    .list();
        } else {
            eventList = kubernetesClient.v1().events().list();
        }

        return eventList.getItems().stream()
                .filter(event -> {
                    if (event.getInvolvedObject() != null
                            && event.getInvolvedObject().getName() != null) {
                        return event.getInvolvedObject().getName().equals(podName);
                    }
                    return false;
                })
                .map(event -> new EventDTO(
                        event.getType(),
                        event.getReason(),
                        event.getMessage(),
                        event.getLastTimestamp() != null
                                ? event.getLastTimestamp().toString()
                                : "N/A"
                ))
                .limit(50)
                .collect(java.util.stream.Collectors.toList());
    }
}
