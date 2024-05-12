package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;

import static com.ssafy.bridgetalkback.fixture.BoardsFixture.BOARDS_01;
import static com.ssafy.bridgetalkback.fixture.KidsFixture.JIYEONG;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static com.ssafy.bridgetalkback.fixture.ReportsFixture.REPORTS_01;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Boards [Service Layer] -> BoardsService 테스트")
public class BoardsServiceTest extends ServiceTest {
    @Autowired
    private BoardsService boardsService;

    private Parents parents;
    private Kids kids;
    private Reports reports;
    private Boards boards;

    @BeforeEach
    void setup() {
        parents = parentsRepository.save(SUNKYOUNG.toParents());
        kids = kidsRepository.save(JIYEONG.toKids(parents));
        reports = reportsRepository.save(REPORTS_01.toReports(kids));
        boards = boardsRepository.save(BOARDS_01.toBoards(reports, parents));
    }

    @Nested
    @DisplayName("게시글 상세조회")
    class getBoardsDetail {
        @Test
        @DisplayName("(한국어) 게시글 상세조회에 성공한다")
        void throwExceptionByUSERIDNOTPARENTS() {
            // when
            BoardsResponseDto responseDto = boardsService.getBoardsDetail(parents.getUuid(), boards.getBoardsId(), Language.kor);

            // then
            Assertions.assertAll(
                    () -> assertThat(responseDto.boardId()).isEqualTo(boards.getBoardsId()),
                    () -> assertThat(responseDto.boardsTitle()).isEqualTo(boards.getBoardsTitle_kor()),
                    () -> assertThat(responseDto.boardsContent()).isEqualTo(boards.getBoardsContent_kor()),
                    () -> assertThat(responseDto.likes()).isEqualTo(boards.getLikes()),
                    () -> assertThat(responseDto.createdAt()).isEqualTo(boards.getCreatedAt()),
                    () -> assertThat(responseDto.reportsSummary()).isEqualTo(boards.getReports().getReportsSummaryKor()),
                    () -> assertThat(responseDto.reportsKeywords()).isEqualTo(boards.getReports().getReportsKeywordsKor()),
                    () -> assertThat(responseDto.writer()).isEqualTo(boards.getParents().getParentsNickname())
            );
        }

        @Test
        @DisplayName("(한국어) 게시글 상세조회에 성공한다")
        void successKorea() {
            // when
            BoardsResponseDto responseDto = boardsService.getBoardsDetail(parents.getUuid(), boards.getBoardsId(), Language.kor);

            // then
            Assertions.assertAll(
                    () -> assertThat(responseDto.boardId()).isEqualTo(boards.getBoardsId()),
                    () -> assertThat(responseDto.boardsTitle()).isEqualTo(boards.getBoardsTitle_kor()),
                    () -> assertThat(responseDto.boardsContent()).isEqualTo(boards.getBoardsContent_kor()),
                    () -> assertThat(responseDto.likes()).isEqualTo(boards.getLikes()),
                    () -> assertThat(responseDto.createdAt()).isEqualTo(boards.getCreatedAt()),
                    () -> assertThat(responseDto.reportsSummary()).isEqualTo(boards.getReports().getReportsSummaryKor()),
                    () -> assertThat(responseDto.reportsKeywords()).isEqualTo(boards.getReports().getReportsKeywordsKor()),
                    () -> assertThat(responseDto.writer()).isEqualTo(boards.getParents().getParentsNickname())
            );
        }

        @Test
        @DisplayName("(베트남어) 게시글 상세조회에 조회한다")
        void successVietnam() {
            // when
            BoardsResponseDto responseDto = boardsService.getBoardsDetail(parents.getUuid(), boards.getBoardsId(), Language.viet);

            // then
            Assertions.assertAll(
                    () -> assertThat(responseDto.boardId()).isEqualTo(boards.getBoardsId()),
                    () -> assertThat(responseDto.boardsTitle()).isEqualTo(boards.getBoardsTitle_viet()),
                    () -> assertThat(responseDto.boardsContent()).isEqualTo(boards.getBoardsContent_viet()),
                    () -> assertThat(responseDto.likes()).isEqualTo(boards.getLikes()),
                    () -> assertThat(responseDto.createdAt()).isEqualTo(boards.getCreatedAt()),
                    () -> assertThat(responseDto.reportsSummary()).isEqualTo(boards.getReports().getReportsSummaryKor()),
                    () -> assertThat(responseDto.reportsKeywords()).isEqualTo(boards.getReports().getReportsKeywordsViet()),
                    () -> assertThat(responseDto.writer()).isEqualTo(boards.getParents().getParentsNickname())
            );
        }
    }
}
