package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.kids.service.KidsFindService;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.dto.ReportsCreateResponseDto;
import com.ssafy.bridgetalkback.reports.exception.ReportsErrorCode;
import com.ssafy.bridgetalkback.reports.repository.ReportsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportsService {

    private final KidsFindService kidsFindService;
    private final ReportsRepository reportsRepository;

    @Transactional
    public ReportsCreateResponseDto  createReports(UUID userId) {
        log.info("{ReportsService} :  reports 생성 ");
        Kids kids = kidsFindService.findKidsByUuidAndIsDeleted(userId);
        Reports reports = Reports.createReports(kids, "");
        reportsRepository.save(reports);
        Long reportsId = reports.getReportsId();
        return ReportsCreateResponseDto.builder()
                .reportsId(reportsId)
                .build();
    }

    public Reports findByIdAndIsDeleted(Long reportsId) {
        log.info("{ReportsService} : Id(Pk)로 reports 조회 - " + reportsId);
        return reportsRepository.findByReportsIdAndIsDeleted(reportsId, 0)
                .orElseThrow(() -> BaseException.type(ReportsErrorCode.REPORTS_NOT_FOUND));
    }
}
