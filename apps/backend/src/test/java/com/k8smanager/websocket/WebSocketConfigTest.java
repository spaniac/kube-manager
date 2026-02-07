package com.k8smanager.websocket;

import com.k8smanager.controller.TerminalController;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.dsl.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.ByteArrayInputStream;
import java.io.OutputStream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class WebSocketConfigTest {

    @Mock
    private KubernetesClient kubernetesClient;

    @Mock
    private TerminalController terminalController;

    @Mock
    private WebSocketSession session;

    @Mock
    private MixedOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> podOperation;

    @Mock
    private NonNamespaceOperation<Pod, io.fabric8.kubernetes.api.model.PodList, PodResource> namespacedPodOp;

    @Mock
    private PodResource podResource;

    @Mock
    private ContainerResource containerResource;

    @Mock
    private ExecWatch execWatch;

    @Mock
    private OutputStream outputStream;

    @InjectMocks
    private WebSocketConfig webSocketConfig;

    @BeforeEach
    void setUp() {
        lenient().when(kubernetesClient.pods()).thenReturn(podOperation);
        lenient().when(session.getId()).thenReturn("test-session");
    }

    @Test
    void testHandleTextMessageInitSession() throws Exception {
        WebSocketConfig.TerminalWebSocketHandler handler = webSocketConfig.new TerminalWebSocketHandler();
        
        // Mock connection init: "namespace:podname:container"
        TextMessage message = new TextMessage("default:test-pod:main");
        
        when(terminalController.getSession(anyString())).thenReturn(null);
        
        when(podOperation.inNamespace("default")).thenReturn(namespacedPodOp);
        when(namespacedPodOp.withName("test-pod")).thenReturn(podResource);
        when(podResource.inContainer("main")).thenReturn(containerResource);
        when(containerResource.usingListener(any(ExecListener.class))).thenReturn(containerResource);
        when(containerResource.exec(any(String[].class))).thenReturn(execWatch);
        
        when(execWatch.getOutput()).thenReturn(new ByteArrayInputStream(new byte[0]));
        when(execWatch.getError()).thenReturn(new ByteArrayInputStream(new byte[0]));

        handler.handleTextMessage(session, message);

        verify(terminalController).registerSession(eq("test-session"), eq(execWatch));
    }

    @Test
    void testHandleTextMessageExistingSession() throws Exception {
        WebSocketConfig.TerminalWebSocketHandler handler = webSocketConfig.new TerminalWebSocketHandler();
        TextMessage message = new TextMessage("ls -la");
        
        when(terminalController.getSession(anyString())).thenReturn(execWatch);
        when(execWatch.getInput()).thenReturn(outputStream);

        handler.handleTextMessage(session, message);

        verify(outputStream).write(message.getPayload().getBytes());
        verify(outputStream).flush();
    }

    @Test
    void testHandleBinaryMessage() throws Exception {
        WebSocketConfig.TerminalWebSocketHandler handler = webSocketConfig.new TerminalWebSocketHandler();
        byte[] payload = new byte[]{1, 2, 3};
        BinaryMessage message = new BinaryMessage(payload);
        
        when(terminalController.getSession(anyString())).thenReturn(execWatch);
        when(execWatch.getInput()).thenReturn(outputStream);

        handler.handleBinaryMessage(session, message);

        verify(outputStream).write(payload);
        verify(outputStream).flush();
    }

    @Test
    void testAfterConnectionClosed() throws Exception {
        WebSocketConfig.TerminalWebSocketHandler handler = webSocketConfig.new TerminalWebSocketHandler();
        
        when(terminalController.getSession(anyString())).thenReturn(execWatch);

        handler.afterConnectionClosed(session, CloseStatus.NORMAL);

        verify(execWatch).close();
    }
}
