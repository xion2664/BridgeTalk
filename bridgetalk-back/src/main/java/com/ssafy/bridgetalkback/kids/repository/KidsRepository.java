package com.ssafy.bridgetalkback.kids.repository;

import com.ssafy.bridgetalkback.kids.domain.Kids;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface KidsRepository extends JpaRepository<Kids, UUID> {
    Optional<Kids> findKidsByUuidAndIsDeleted(UUID uuid, int isDeleted);

    Optional<Kids> findByKidsEmailAndIsDeleted(String kidsEmail, int isDeleted);

    boolean existsKidsByUuidAndIsDeleted(UUID uuid, int isDeleted);

}
