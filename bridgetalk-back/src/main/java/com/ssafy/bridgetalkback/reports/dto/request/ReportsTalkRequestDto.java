package com.ssafy.bridgetalkback.reports.dto.request;

import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import jakarta.persistence.Id;
import lombok.Builder;
import org.springframework.data.redis.core.RedisHash;

@Builder
@RedisHash(value="talk", timeToLive = 310)
public record ReportsTalkRequestDto(

        @Id
        String userEmail,
        String reportsOriginContent

) {
    public static ReportsTalkRequestDto fromReportsId(Kids kids , Reports reports) {
        return ReportsTalkRequestDto.builder()
                .userEmail(kids.getKidsEmail())
                .reportsOriginContent(reports.getReportsOriginContent())
                .build();
    }
    public ReportsTalkRequestDto updateReportsOriginContent(String newContent) {
        return new ReportsTalkRequestDto(this.userEmail, newContent);
    }


}
