package com.ssafy.bridgetalkback.kids.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.kids.exception.KidsErrorCode;
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KidsFindService {
    private final KidsRepository kidsRepository;

    public Kids findKidsByUuidAndIsDeleted(UUID uuid) {
        return kidsRepository.findKidsByUuidAndIsDeleted(uuid, 0)
                .orElseThrow(() -> BaseException.type(KidsErrorCode.KIDS_NOT_FOUND));
    }

    public Kids findByKidsEmailAndIsDeleted(String email) {
        return kidsRepository.findByKidsEmailAndIsDeleted(email, 0)
                .orElseThrow(() -> BaseException.type(KidsErrorCode.KIDS_NOT_FOUND));
    }

    public boolean existsKidsByUuidAndIsDeleted(UUID uuid) {
        return kidsRepository.existsKidsByUuidAndIsDeleted(uuid, 0);
    }
}
