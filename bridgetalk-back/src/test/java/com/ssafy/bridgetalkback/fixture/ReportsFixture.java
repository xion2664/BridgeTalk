package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReportsFixture {
    REPORTS_01("오늘 모둠활동 시간에 내가 그린 그림을 친구가 망쳤어")
    ;

    private final String reportsOriginContent;

    public Reports toReports(Kids kids) {
        return Reports.createReports(kids, reportsOriginContent);
    }
}