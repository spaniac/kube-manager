package com.k8smanager.k8s;

import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

class RetryUtilTest {

    @Test
    void testRetrySuccessOnFirstAttempt() {
        java.util.function.Supplier<String> supplier = () -> "success";
        String result = new RetryUtil().executeWithRetry(supplier, 3,
                Duration.ofMillis(100), Duration.ofSeconds(5));
        assertThat(result).isEqualTo("success");
    }

    @Test
    void testRetrySuccessAfterFailures() {
        java.util.concurrent.atomic.AtomicInteger attempts = new java.util.concurrent.atomic.AtomicInteger(0);
        java.util.function.Supplier<String> supplier = () -> {
            int attempt = attempts.incrementAndGet();
            if (attempt < 3) {
                throw new RuntimeException("Failed attempt " + attempt);
            }
            return "success";
        };

        String result = new RetryUtil().executeWithRetry(supplier, 3,
                Duration.ofMillis(100), Duration.ofSeconds(5));
        assertThat(result).isEqualTo("success");
        assertThat(attempts.get()).isEqualTo(3);
    }

    @Test
    void testRetryFailureAfterMaxAttempts() {
        java.util.function.Supplier<String> supplier = () -> {
            throw new RuntimeException("Always fails");
        };

        try {
            new RetryUtil().executeWithRetry(supplier, 3,
                    Duration.ofMillis(100), Duration.ofSeconds(5));
        } catch (RuntimeException e) {
            assertThat(e.getMessage()).contains("Operation failed after 3 retries");
        }
    }

    @Test
    void testRetryWithDefaultSettings() {
        java.util.function.Supplier<String> supplier = () -> "success";
        String result = new RetryUtil().executeWithRetry(supplier);
        assertThat(result).isEqualTo("success");
    }
}
