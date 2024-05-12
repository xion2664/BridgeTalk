package com.ssafy.bridgetalkback.reports.dto.response;

import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ReportsListResponseDto(

        Long reportsId,
        String reportsSummary,
        List<String> reportsKeywords,
        LocalDateTime createdAt
) {
    public static ReportsListResponseDto fromReports(Reports report, Language language) {
        return ReportsListResponseDto.builder()
                .reportsId(report.getReportsId())
                .reportsSummary(language.equals(Language.kor) ? report.getReportsSummaryKor() : report.getReportsSummaryViet())
                .reportsKeywords(language.equals(Language.kor) ? report.getReportsKeywordsKor() : report.getReportsKeywordsViet())
                .createdAt(report.getCreatedAt())
                .build();
    }
}
