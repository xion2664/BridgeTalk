package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.exception.ReportsErrorCode;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.ssafy.bridgetalkback.fixture.KidsFixture.JIYEONG;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SOYOUNG;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Reports [Service Layer] -> ReportsService 테스트")
class ReportsServiceTest extends ServiceTest {

    @Autowired
    private ReportsService reportsService;

    private Parents parents;
    private Kids kids;
    private Reports reports1, reports2;

    @BeforeEach
    void setup() {
        parents = parentsRepository.save(SOYOUNG.toParents());
        kids = kidsRepository.save(JIYEONG.toKids(parents));
        reports1 = reportsRepository.save(Reports.createReports(kids, "속마음 원본"));
        reports2 = reportsRepository.save(Reports.createReports(kids, "속마음 원본2"));

    }

    @Test
    @DisplayName("ID(PK)로 삭제되지 않은 편지 정보를 조회한다")
    void findById() {
        // given
        reports2.updateIsDeleted();

        // when
        Reports existReports = reportsService.findByIdAndIsDeleted(reports1.getReportsId());

        // then
        assertThat(existReports).isEqualTo(reports1);

        Assertions.assertThatThrownBy(() -> reportsService.findByIdAndIsDeleted(reports2.getReportsId()))
                .isInstanceOf(BaseException.class)
                .hasMessageContaining(ReportsErrorCode.REPORTS_NOT_FOUND.getMessage());
    }

}