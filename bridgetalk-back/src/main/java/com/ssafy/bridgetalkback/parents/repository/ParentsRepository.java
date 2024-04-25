package com.ssafy.bridgetalkback.parents.repository;

import com.ssafy.bridgetalkback.parents.domain.Email;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ParentsRepository extends JpaRepository<Parents, UUID> {
    boolean existsParentsByParentsEmail(Email email);

    @Query("select p from Parents p where p.uuid = :uuid and p.isDeleted = 0")
    Optional<Parents> findByIdAndIsDeleted(@Param("uuid") UUID uuid);
}
