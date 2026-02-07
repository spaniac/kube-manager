package com.k8smanager.k8s;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.function.Supplier;

/**
 * Retry utility with exponential backoff for K8s API calls.
 */
@Component
public class RetryUtil {

    private static final Logger logger = LoggerFactory.getLogger(RetryUtil.class);

    /**
     * Execute operation with exponential backoff retry.
     *
     * @param operation    Operation to execute
     * @param maxRetries   Maximum number of retry attempts
     * @param initialDelay Initial delay between retries
     * @param maxDelay     Maximum delay between retries
     * @param <T>          Return type
     * @return Operation result
     * @throws RuntimeException if all retries fail
     */
    public <T> T executeWithRetry(Supplier<T> operation,
                                  int maxRetries,
                                  Duration initialDelay,
                                  Duration maxDelay) {
        int attempt = 0;
        Exception lastException = null;
        long delay = initialDelay.toMillis();

        while (attempt <= maxRetries) {
            try {
                return operation.get();
            } catch (Exception e) {
                lastException = e;
                attempt++;

                if (attempt > maxRetries) {
                    logger.error("Operation failed after {} attempts", maxRetries, e);
                    break;
                }

                logger.warn("Operation failed (attempt {}/{}), retrying in {}ms: {}",
                        attempt, maxRetries, delay, e.getMessage());

                try {
                    Thread.sleep(delay);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Retry interrupted", ie);
                }

                // Exponential backoff: delay = delay * 2, capped at maxDelay
                delay = Math.min(delay * 2, maxDelay.toMillis());
            }
        }

        throw new RuntimeException("Operation failed after " + maxRetries + " retries",
                lastException);
    }

    /**
     * Execute operation with default retry settings.
     */
    public <T> T executeWithRetry(Supplier<T> operation) {
        return executeWithRetry(operation, 3,
                Duration.ofMillis(100), Duration.ofSeconds(5));
    }
}
