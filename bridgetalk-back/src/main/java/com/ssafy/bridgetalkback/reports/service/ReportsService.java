package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.kids.exception.KidsErrorCode;
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import com.ssafy.bridgetalkback.kids.service.KidsFindService;
import com.ssafy.bridgetalkback.reports.domain.Language;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.dto.ReportsCreateResponseDto;
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
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportsService {

    private final KidsFindService kidsFindService;
    private final ReportsRepository reportsRepository;
    private final ReportsFindService reportsFindService;
    private final KidsRepository kidsRepository;


    @Transactional
    public ReportsCreateResponseDto createReports(UUID userId) {
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

    public List<ReportsListResponseDto> reportsList(UUID userId, UUID kidsId, Language language) {
        if (kidsRepository.existsKidsByParentsUuidAndUuidAndIsDeleted(userId, kidsId, 0)) {
            log.info("{ ReportsService } : 부모 프로필의 아이 조회");
        } else throw BaseException.type(KidsErrorCode.KIDS_NOT_FOUND);

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
        } else throw BaseException.type(KidsErrorCode.KIDS_NOT_FOUND);

        Reports reports = reportsFindService.findByReportsIdAndIsDeleted(reportsId);
        log.info("{ ReportsService } : 아이속마음 상세 조회 성공");
        return ReportsDetailResponseDto.fromReports(reports, language);
    }
}
