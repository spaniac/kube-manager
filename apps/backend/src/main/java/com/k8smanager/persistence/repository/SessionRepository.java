package com.k8smanager.persistence.repository;

import com.k8smanager.persistence.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Session entity.
 */
public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByAccessToken(String accessToken);

    Optional<Session> findByRefreshToken(String refreshToken);

    List<Session> findByUser_EmailAndExpiresAtBefore(String userEmail, Instant expiresAt);

    void deleteByExpiresAtBefore(Instant expiresAt);

    void deleteByUser_Email(String userEmail);
}
