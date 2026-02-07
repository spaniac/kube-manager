package com.k8smanager.service;

import com.k8smanager.dto.EventDTO;
import io.fabric8.kubernetes.api.model.Event;
import io.fabric8.kubernetes.api.model.EventList;
import io.fabric8.kubernetes.api.model.ObjectReference;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.MixedOperation;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.Resource;
import io.fabric8.kubernetes.client.dsl.V1APIGroupDSL;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class EventServiceTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private V1APIGroupDSL v1Api;

    @Mock
    private MixedOperation<Event, EventList, Resource<Event>> eventOperation;

    @Mock
    private NonNamespaceOperation<Event, EventList, Resource<Event>> namespacedEventOp;

    @InjectMocks
    private EventService eventService;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.v1()).thenReturn(v1Api);
        lenient().when(v1Api.events()).thenReturn(eventOperation);
    }

    @Test
    void testGetPodEvents() {
        String namespace = "test-ns";
        String podName = "test-pod";
        
        EventList eventList = new EventList();
        Event event1 = new Event();
        event1.setType("Normal");
        event1.setReason("Created");
        event1.setMessage("Pod created");
        ObjectReference ref1 = new ObjectReference();
        ref1.setName(podName);
        event1.setInvolvedObject(ref1);
        
        Event event2 = new Event();
        event2.setType("Warning");
        event2.setReason("Failed");
        event2.setMessage("Failed to pull image");
        ObjectReference ref2 = new ObjectReference();
        ref2.setName("other-pod");
        event2.setInvolvedObject(ref2);
        
        eventList.setItems(List.of(event1, event2));

        when(eventOperation.inNamespace(namespace)).thenReturn(namespacedEventOp);
        when(namespacedEventOp.list()).thenReturn(eventList);

        List<EventDTO> result = eventService.getPodEvents(namespace, podName);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).type()).isEqualTo("Normal");
        assertThat(result.get(0).reason()).isEqualTo("Created");
    }

    @Test
    void testGetPodEventsWithoutNamespace() {
        String podName = "test-pod";
        
        EventList eventList = new EventList();
        Event event1 = new Event();
        event1.setType("Normal");
        ObjectReference ref1 = new ObjectReference();
        ref1.setName(podName);
        event1.setInvolvedObject(ref1);
        
        eventList.setItems(List.of(event1));

        when(eventOperation.list()).thenReturn(eventList);

        List<EventDTO> result = eventService.getPodEvents(null, podName);

        assertThat(result).hasSize(1);
    }
}
