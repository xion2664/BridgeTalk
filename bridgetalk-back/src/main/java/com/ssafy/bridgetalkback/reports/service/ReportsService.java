package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import com.ssafy.bridgetalkback.reports.domain.Language;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.dto.response.ReportsDetailResponseDto;
import com.ssafy.bridgetalkback.reports.dto.response.ReportsListResponseDto;
import com.ssafy.bridgetalkback.reports.exception.ReportsErrorCode;
import com.ssafy.bridgetalkback.reports.repository.ReportsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReportsService {

    private final ReportsFindService reportsFindService;
    private final ReportsRepository reportsRepository;
    private final KidsRepository kidsRepository;

    public List<ReportsListResponseDto> reportsList(UUID userId, UUID kidsId, Language language) {
        if (kidsRepository.existsKidsByParentsUuidAndUuidAndIsDeleted(userId, kidsId, 0)) {
            log.info("{ ReportsService } : 부모 프로필의 아이 조회");
        } else throw BaseException.type(ReportsErrorCode.KIDS_NOT_FOUND);

        List<Reports> reports = reportsRepository.findAllByKidsUuidAndIsDeleted(kidsId, 0);
        List<ReportsListResponseDto> reportsList = new ArrayList<>();

        for (Reports report : reports) {
            reportsList.add(ReportsListResponseDto.fromReports(report, language));
        }
        log.info("{ ReportsService } : 아이속마음 리스트 조회 성공");
        return reportsList;
    }

    public ReportsDetailResponseDto reportsDetail(UUID userId, UUID kidsId, Long reportsId, Language language) {
        if (kidsRepository.existsKidsByParentsUuidAndUuidAndIsDeleted(userId, kidsId, 0)) {
            log.info("{ ReportsService } : 부모 프로필의 아이 조회");
        } else throw BaseException.type(ReportsErrorCode.KIDS_NOT_FOUND);

        Reports reports = reportsFindService.findByReportsIdAndIsDeleted(reportsId);
        log.info("{ ReportsService } : 아이속마음 상세 조회 성공");
        return ReportsDetailResponseDto.fromReports(reports, language);
    }
}
