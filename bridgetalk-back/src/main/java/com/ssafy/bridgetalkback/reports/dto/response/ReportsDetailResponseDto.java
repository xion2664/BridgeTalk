package com.ssafy.bridgetalkback.reports.dto.response;

import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ReportsDetailResponseDto(

        Long reportsId,
        String reportsSummary,
        List<String> reportsKeywords,
        String reportsSolution,
        List<VideoResponseDto> reportsVideoList,
        LocalDateTime createdAt
) {
    public static ReportsDetailResponseDto fromReports(Reports report, List<VideoResponseDto> reportsVideoList, Language language) {
        return ReportsDetailResponseDto.builder()
                .reportsId(report.getReportsId())
                .reportsSummary(language.equals(Language.kor) ? report.getReportsSummaryKor() : report.getReportsSummaryViet())
                .reportsKeywords(language.equals(Language.kor) ? report.getReportsKeywordsKor() : report.getReportsKeywordsViet())
                .reportsSolution(language.equals(Language.kor) ? report.getReportsSolutionKor() : report.getReportsSolutionViet())
                .reportsVideoList(reportsVideoList)
                .createdAt(report.getCreatedAt())
                .build();
    }
}
