package com.ssafy.bridgetalkback.parents.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.exception.ParentsErrorCode;
import com.ssafy.bridgetalkback.parents.repository.ParentsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ParentsFindService {
    private final ParentsRepository parentsRepository;

    public Parents findById(UUID uuid) {
        log.info("{ ParentsFindService } : Id(Pk)로 부모 정보 조회 )");

        return parentsRepository.findById(uuid)
                .orElseThrow(() -> BaseException.type(ParentsErrorCode.PARENTS_NOT_FOUND));
    }

}
