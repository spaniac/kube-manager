package com.k8smanager.service;

import com.k8smanager.dto.EventDTO;
import io.fabric8.kubernetes.api.model.Event;
import io.fabric8.kubernetes.api.model.EventList;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for event retrieval.
 */
@Service
public class EventService {

    private final KubernetesClient kubernetesClient;

    public EventService(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    /**
     * Get pod events.
     */
    public List<EventDTO> getPodEvents(String namespace, String podName) {
        EventList eventList;

        if (namespace != null && !namespace.isEmpty()) {
            eventList = kubernetesClient.events()
                    .inNamespace(namespace)
                    .withFieldSelector("involvedObject.name", podName)
                    .list();
        } else {
            eventList = kubernetesClient.events().list();
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
                                ? event.getLastTimestamp().toEpochMilli() : 0,
                        event.getCount() != null ? event.getCount() : 1,
                        event.getReportingComponent() != null
                                ? event.getReportingComponent() : "system"
                ))
                .limit(50)
                .toList();
    }
}
