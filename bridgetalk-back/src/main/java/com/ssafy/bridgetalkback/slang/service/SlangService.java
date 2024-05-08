package com.ssafy.bridgetalkback.slang.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.slang.domain.Slang;
import com.ssafy.bridgetalkback.slang.dto.response.SlangListResponseDto;
import com.ssafy.bridgetalkback.slang.exception.SlangErrorCode;
import com.ssafy.bridgetalkback.slang.repository.SlangRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SlangService {

    private final SlangRepository slangRepository;

    public List<SlangListResponseDto> findAllSlang() {
        log.info("{SlangService} : 삭제되지 않은 모든 slang 리스트 반환");
        List<Slang> slangByIsDeletedList = findAllSlangByIsDeleted();
        return slangByIsDeletedList.stream()
                .map(SlangListResponseDto::from)
                .collect(Collectors.toList());
    }

    public List<Slang> findAllSlangByIsDeleted() {
        log.info("{Slang Service} : 삭제되지 않은 Slang 목록 조회");
        List<Slang> slangList = slangRepository.findAllByIsDeleted(0);
        if (slangList.isEmpty()) {
            BaseException.type(SlangErrorCode.SLANGLIST_NOT_FOUND);
        }
        return slangRepository.findAllByIsDeleted(0);
    }
}
