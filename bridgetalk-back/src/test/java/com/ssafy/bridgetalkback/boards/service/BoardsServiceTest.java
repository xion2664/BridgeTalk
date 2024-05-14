package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.dto.request.BoardsRequestDto;
import com.ssafy.bridgetalkback.boards.dto.request.BoardsUpdateRequestDto;
import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.service.ReportsUpdateService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

import static com.ssafy.bridgetalkback.fixture.BoardsFixture.BOARDS_01;
import static com.ssafy.bridgetalkback.fixture.BoardsFixture.BOARDS_02;
import com.ssafy.bridgetalkback.global.Language;
import org.junit.jupiter.api.*;
import static com.ssafy.bridgetalkback.fixture.KidsFixture.JIYEONG;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static com.ssafy.bridgetalkback.fixture.ReportsFixture.REPORTS_01;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("Boards [Service Layer] -> BoardsServiceTest 테스트")
public class BoardsServiceTest extends ServiceTest {
    private Parents parents;

    private Kids kids;

    private Reports reports;

    private Boards boards;

    @Autowired
    private ReportsUpdateService reportsUpdateService;

    @Autowired
    private BoardsFindService boardsFindService;

    @Autowired
    private BoardsService boardsService;

    @BeforeEach
    void setup() throws ExecutionException, InterruptedException {
        parents = parentsRepository.save(SUNKYOUNG.toParents());
        kids = kidsRepository.save(JIYEONG.toKids(parents));
        reports = reportsRepository.save(REPORTS_01.toReports(kids));
        reportsUpdateService.createReportAsync(reports.getReportsId());
        boards = boardsRepository.save(BOARDS_01.toBoards(reports, parents));
    }

    @Test
    @DisplayName("(한국어) 게시글 등록에 성공한다.")
    void createBoardsKor() {
        // when
        BoardsResponseDto boardsResponseDto = boardsService.createBoards(parents.getUuid(), createBoardsRequestDto(Language.kor));
        Long boardsId = boardsResponseDto.boardsId();

        // then
        Boards findBoards = boardsFindService.findByBoardsIdAndIsDeleted(boardsId);

        assertAll(
                () -> assertThat(findBoards.getBoardsId()).isEqualTo(boardsId),
                () -> assertThat(findBoards.getBoardsTitleKor()).isEqualTo(BOARDS_01.getBoardsTitleKor()),
//                () -> assertThat(findBoards.getBoardsTitleViet()).isEqualTo(BOARDS_01.getBoardsTitleViet()),
                () -> assertThat(findBoards.getBoardsContentKor()).isEqualTo(BOARDS_01.getBoardsContentKor()),
//                () -> assertThat(findBoards.getBoardsContentViet()).isEqualTo(BOARDS_01.getBoardsContentViet()),
                () -> assertThat(findBoards.getIsDeleted()).isEqualTo(0)
        );
    }

    @Test
    @DisplayName("(베트남어) 게시글 등록에 성공한다.")
    void createBoardsViet() {
        // when
        BoardsResponseDto boardsResponseDto = boardsService.createBoards(parents.getUuid(), createBoardsRequestDto(Language.viet));
        Long boardsId = boardsResponseDto.boardsId();

        // then
        Boards findBoards = boardsFindService.findByBoardsIdAndIsDeleted(boardsId);
        assertAll(
                () -> assertThat(findBoards.getBoardsId()).isEqualTo(boardsId),
//                () -> assertThat(findBoards.getBoardsTitleKor()).isEqualTo(BOARDS_01.getBoardsTitleKor()),
                () -> assertThat(findBoards.getBoardsTitleViet()).isEqualTo(BOARDS_01.getBoardsTitleViet()),
//                () -> assertThat(findBoards.getBoardsContentKor()).isEqualTo(BOARDS_01.getBoardsContentKor()),
                () -> assertThat(findBoards.getBoardsContentViet()).isEqualTo(BOARDS_01.getBoardsContentViet()),
                () -> assertThat(findBoards.getIsDeleted()).isEqualTo(0)
        );
    }

    @Test
    @DisplayName("(한국어) 게시글 수정에 성공한다.")
    void updateBoardsKor() {
        // given
        BoardsResponseDto boardsResponseDto = boardsService.createBoards(parents.getUuid(), createBoardsRequestDto(Language.kor));
        Long boardsId = boardsResponseDto.boardsId();

        // when
        BoardsResponseDto updateBoardsResponseDto = boardsService.updateBoards(parents.getUuid(), boardsId, updateBoardsRequestDto(Language.kor));
        Long updateBoardsId = updateBoardsResponseDto.boardsId();

        // then
        Boards findBoards = boardsFindService.findByBoardsIdAndIsDeleted(updateBoardsId);
        assertAll(
                () -> assertThat(findBoards.getBoardsId()).isEqualTo(boardsId),
                () -> assertThat(findBoards.getBoardsTitleKor()).isEqualTo(BOARDS_02.getBoardsTitleKor()),
//                () -> assertThat(findBoards.getBoardsTitleViet()).isEqualTo(BOARDS_02.getBoardsTitleViet()),
                () -> assertThat(findBoards.getBoardsContentKor()).isEqualTo(BOARDS_02.getBoardsContentKor()),
//                () -> assertThat(findBoards.getBoardsContentViet()).isEqualTo(BOARDS_02.getBoardsContentViet()),
                () -> assertThat(findBoards.getIsDeleted()).isEqualTo(0)
        );
    }

    @Test
    @DisplayName("(베트남어) 게시글 수정에 성공한다.")
    void updateBoardsViet() {
        // given
        BoardsResponseDto boardsResponseDto = boardsService.createBoards(parents.getUuid(), createBoardsRequestDto(Language.viet));
        Long boardsId = boardsResponseDto.boardsId();

        // when
        BoardsResponseDto updateBoardsResponseDto = boardsService.updateBoards(parents.getUuid(), boardsId, updateBoardsRequestDto(Language.viet));
        Long updateBoardsId = updateBoardsResponseDto.boardsId();

        // then
        Boards findBoards = boardsFindService.findByBoardsIdAndIsDeleted(updateBoardsId);
        assertAll(
                () -> assertThat(findBoards.getBoardsId()).isEqualTo(boardsId),
//                () -> assertThat(findBoards.getBoardsTitleKor()).isEqualTo(BOARDS_02.getBoardsTitleKor()),
                () -> assertThat(findBoards.getBoardsTitleViet()).isEqualTo(BOARDS_02.getBoardsTitleViet()),
//                () -> assertThat(findBoards.getBoardsContentKor()).isEqualTo(BOARDS_02.getBoardsContentKor()),
                () -> assertThat(findBoards.getBoardsContentViet()).isEqualTo(BOARDS_02.getBoardsContentViet()),
                () -> assertThat(findBoards.getIsDeleted()).isEqualTo(0)
        );
    }

    @Test
    @DisplayName("게시글 삭제에 성공한다.")
    void deleteBoards(){
        // given
        BoardsResponseDto boardsResponseDto = boardsService.createBoards(parents.getUuid(), createBoardsRequestDto(Language.viet));
        Long boardsId = boardsResponseDto.boardsId();

        // when
        boardsService.deleteBoards(parents.getUuid(), boardsId);

        //then
        assertThatThrownBy(()-> boardsFindService.findByBoardsIdAndIsDeleted(boardsId))
                .isInstanceOf(BaseException.class)
                .hasMessage(BoardsErrorCode.BOARDS_NOT_FOUND.getMessage());

        Optional<Boards> findBoards = boardsRepository.findById(boardsId);
        assertAll(
                ()->assertThat(findBoards.orElseThrow().getIsDeleted()).isEqualTo(1)
        );
    }

    private BoardsUpdateRequestDto updateBoardsRequestDto(Language language) {
        return language.equals(Language.kor)
                ? new BoardsUpdateRequestDto(BOARDS_02.getBoardsTitleKor(), BOARDS_02.getBoardsContentKor(), Language.kor)
                : new BoardsUpdateRequestDto(BOARDS_02.getBoardsTitleViet(), BOARDS_02.getBoardsContentViet(), Language.viet);
    }

    private BoardsRequestDto createBoardsRequestDto(Language language) {
        return language.equals(Language.kor)
                ? new BoardsRequestDto(1L, BOARDS_01.getBoardsTitleKor(), BOARDS_01.getBoardsContentKor(), Language.kor)
                : new BoardsRequestDto(1L, BOARDS_01.getBoardsTitleViet(), BOARDS_01.getBoardsContentViet(), Language.viet);
    }


    @Nested
    @DisplayName("게시글 상세조회")
    class getBoardsDetail {
        @Test
        @DisplayName("부모가 아닌 유저라면 게시글 상세조회에 실패한다")
        void throwExceptionByUserIsNotParents() {
            // when - then
            assertThatThrownBy(() -> boardsService.getBoardsDetail(kids.getUuid(), boards.getBoardsId(), Language.kor))
                    .isInstanceOf(BaseException.class)
                    .hasMessage(BoardsErrorCode.USER_IS_NOT_PARENTS.getMessage());
        }

        @Test
        @DisplayName("(한국어) 게시글 상세조회에 성공한다")
        void successKorea() {
            // when
            BoardsResponseDto responseDto = boardsService.getBoardsDetail(parents.getUuid(), boards.getBoardsId(), Language.kor);

            // then
            Assertions.assertAll(
                    () -> assertThat(responseDto.boardsId()).isEqualTo(boards.getBoardsId()),
                    () -> assertThat(responseDto.boardsTitle()).isEqualTo(boards.getBoardsTitleKor()),
                    () -> assertThat(responseDto.boardsContent()).isEqualTo(boards.getBoardsContentKor()),
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
                    () -> assertThat(responseDto.boardsId()).isEqualTo(boards.getBoardsId()),
                    () -> assertThat(responseDto.boardsTitle()).isEqualTo(boards.getBoardsTitleViet()),
                    () -> assertThat(responseDto.boardsContent()).isEqualTo(boards.getBoardsContentViet()),
                    () -> assertThat(responseDto.likes()).isEqualTo(boards.getLikes()),
                    () -> assertThat(responseDto.createdAt()).isEqualTo(boards.getCreatedAt()),
                    () -> assertThat(responseDto.reportsSummary()).isEqualTo(boards.getReports().getReportsSummaryKor()),
                    () -> assertThat(responseDto.reportsKeywords()).isEqualTo(boards.getReports().getReportsKeywordsViet()),
                    () -> assertThat(responseDto.writer()).isEqualTo(boards.getParents().getParentsNickname())
            );
        }
    }
}
