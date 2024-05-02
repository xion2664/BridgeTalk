package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.dto.ProfileListResponseDto;
import com.ssafy.bridgetalkback.parents.dto.ProfileResponseDto;
import com.ssafy.bridgetalkback.parents.service.ProfileListService;
import com.ssafy.bridgetalkback.reports.domain.Language;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.dto.response.ReportsDetailResponseDto;
import com.ssafy.bridgetalkback.reports.dto.response.ReportsListResponseDto;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static com.ssafy.bridgetalkback.fixture.KidsFixture.HYUNYOUNG;
import static com.ssafy.bridgetalkback.fixture.KidsFixture.JIYEONG;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("Reports [Service Layer] -> ReportsService 테스트")
public class ReportsServiceTest extends ServiceTest {

    private Parents parents;
    private Kids[] kids = new Kids[2];

    private String[] originText = new String[2];
    private Reports[] reports = new Reports[2];

    private ProfileListResponseDto profileList;

    private ProfileResponseDto profileResponseDto;
    private UUID kidsId;

    @Autowired
    private ReportsService reportsService;

    @Autowired
    private ReportsCreateService reportsCreateService;

    @Autowired
    private ProfileListService profileListService;


    @BeforeEach
    void setup() throws ExecutionException, InterruptedException {
        parents = parentsRepository.save(SUNKYOUNG.toParents());
        kids[0] = kidsRepository.save(JIYEONG.toKids(parents));
        kids[1] = kidsRepository.save(HYUNYOUNG.toKids(parents));
        flushAndClear();

        originText[0] = "디노야, 오늘은 정말 놀이동산에 가고 싶어! 아침부터 엄마에게 계속해서 말했는데, 엄마는 항상 바쁘다며 내 얘기를 잘 못 알아들어줘. 나는 놀이동산에서 내가 좋아하는 모든 놀이기구를 타고 싶고, 큰 풍선도 사고 싶고, 푸른 하늘을 날고 싶어! 미끄럼틀에서 빠르게 내려가면서 내 친구들과 함께 즐거운 시간을 보내고 싶어! 그리고 맛있는 아이스크림도 먹고 싶어! 엄마야, 내가 놀이동산에 가고 싶은 이유를 알아줘! 나는 너무나도 설레고 기대돼. 그냥 빨리 놀이동산에 가고 싶어서 말이야!";
        originText[1] = "디노야, 오늘은 정말 탕후루를 먹고 싶어! 아침부터 엄마에게 계속해서 말했는데, 엄마는 항상 바쁘다며 내 얘기를 잘 못 알아들어줘. 나는 탕후루를 먹으면서 달콤한 맛을 즐기고, 매끄러운 식감도 느끼고 싶어! 큰 사이즈의 탕후루를 주문하고, 그 위에는 맛있는 탑핑들을 올려서 내가 원하는 대로 꾸며보고 싶어! 엄마야, 내가 탕후루를 먹고 싶은 이유를 알아줘! 나는 너무나도 설레고 기대돼. 그냥 빨리 탕후루를 먹고 싶어서 말이야!";
        reports[0] = reportsRepository.save(Reports.createReports(kids[0], originText[0]));
        reports[1] = reportsRepository.save(Reports.createReports(kids[0], originText[1]));
        reportsCreateService.createReportAsync(reports[0].getReportsId());
        reportsCreateService.createReportAsync(reports[1].getReportsId());

        profileList = profileListService.profileList(parents.getUuid());
        profileResponseDto = profileList.profileList().get(1);
        kidsId = UUID.fromString(profileResponseDto.userId());
    }


    @Test
    @DisplayName("(한국어) 레포트 리스트를 조회한다")
    void findReportsListKor() {
        //when
        List<ReportsListResponseDto> reportsListResponseDtoList = reportsService.reportsList(parents.getUuid(), kidsId, Language.kor);

        //then
        assertAll(
                () -> assertThat(reportsListResponseDtoList.get(0).reportsId()).isEqualTo(reports[0].getReportsId()),
                () -> assertThat(reportsListResponseDtoList.get(0).reportsSummary()).isEqualTo(reports[0].getReportsSummaryKor()),
                () -> assertThat(reportsListResponseDtoList.get(0).reportsKeywords().toString()).isEqualTo(reports[0].getReportsKeywordsKor().toString()),
                () -> assertThat(reportsListResponseDtoList.get(1).reportsId()).isEqualTo(reports[1].getReportsId()),
                () -> assertThat(reportsListResponseDtoList.get(1).reportsSummary()).isEqualTo(reports[1].getReportsSummaryKor()),
                () -> assertThat(reportsListResponseDtoList.get(1).reportsKeywords().toString()).isEqualTo(reports[1].getReportsKeywordsKor().toString())
        );
    }

    @Test
    @DisplayName("(베트남어) 레포트 리스트를 조회한다")
    void findReportsListViet() {
        //when
        List<ReportsListResponseDto> reportsListResponseDtoList = reportsService.reportsList(parents.getUuid(), kidsId, Language.viet);

        //then
        assertAll(
                () -> assertThat(reportsListResponseDtoList.get(0).reportsId()).isEqualTo(reports[0].getReportsId()),
                () -> assertThat(reportsListResponseDtoList.get(0).reportsSummary()).isEqualTo(reports[0].getReportsSummaryViet()),
                () -> assertThat(reportsListResponseDtoList.get(0).reportsKeywords().toString()).isEqualTo(reports[0].getReportsKeywordsViet().toString()),
                () -> assertThat(reportsListResponseDtoList.get(1).reportsId()).isEqualTo(reports[1].getReportsId()),
                () -> assertThat(reportsListResponseDtoList.get(1).reportsSummary()).isEqualTo(reports[1].getReportsSummaryViet()),
                () -> assertThat(reportsListResponseDtoList.get(1).reportsKeywords().toString()).isEqualTo(reports[1].getReportsKeywordsViet().toString())
        );
    }

    @Test
    @DisplayName("(한국어) 레포트 상세정보를 조회한다")
    void findReportsDetailKor() {
        //given
        List<ReportsListResponseDto> reportsListResponseDtoList = reportsService.reportsList(parents.getUuid(), kidsId, Language.kor);
        Long reportsId = reportsListResponseDtoList.get(0).reportsId();

        //when
        ReportsDetailResponseDto reportsDetailResponseDto = reportsService.reportsDetail(parents.getUuid(), kidsId, reportsId, Language.kor);

        //then
        assertAll(
                () -> assertThat(reportsDetailResponseDto.reportsId()).isEqualTo(reports[0].getReportsId()),
                () -> assertThat(reportsDetailResponseDto.reportsSummary()).isEqualTo(reports[0].getReportsSummaryKor()),
                () -> assertThat(reportsDetailResponseDto.reportsKeywords().toString()).isEqualTo(reports[0].getReportsKeywordsKor().toString()),
                () -> assertThat(reportsDetailResponseDto.reportsSolution()).isEqualTo(reports[0].getReportsSolutionKor())
        );
    }

    @Test
    @DisplayName("(베트남어) 레포트 상세정보를 조회한다")
    void findReportsDetailViet() {
        //given
        List<ReportsListResponseDto> reportsListResponseDtoList = reportsService.reportsList(parents.getUuid(), kidsId, Language.viet);
        Long reportsId = reportsListResponseDtoList.get(0).reportsId();

        //when
        ReportsDetailResponseDto reportsDetailResponseDto = reportsService.reportsDetail(parents.getUuid(), kidsId, reportsId, Language.viet);

        //then
        assertAll(
                () -> assertThat(reportsDetailResponseDto.reportsId()).isEqualTo(reports[0].getReportsId()),
                () -> assertThat(reportsDetailResponseDto.reportsSummary()).isEqualTo(reports[0].getReportsSummaryViet()),
                () -> assertThat(reportsDetailResponseDto.reportsKeywords().toString()).isEqualTo(reports[0].getReportsKeywordsViet().toString()),
                () -> assertThat(reportsDetailResponseDto.reportsSolution()).isEqualTo(reports[0].getReportsSolutionViet())
        );
    }
}