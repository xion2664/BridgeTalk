package com.ssafy.bridgetalkback.reports.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.reports.dto.ReportsCreateResponseDto;
import com.ssafy.bridgetalkback.reports.service.ReportsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@Tag(name = "reports", description = "ReportsController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reports")
public class ReportsController {

    private final ReportsService reportsService;

    @PostMapping("/create-reports")
    public ResponseEntity<?> createReports(@ExtractPayload String userId) {
        log.info("{ ReportsController } : Reports 생성 진입");
        ReportsCreateResponseDto reports = reportsService.createReports(UUID.fromString(userId));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reports);
    }
}
