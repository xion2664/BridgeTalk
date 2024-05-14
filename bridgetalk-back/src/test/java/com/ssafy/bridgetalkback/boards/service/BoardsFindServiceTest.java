package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.ssafy.bridgetalkback.fixture.BoardsFixture.BOARDS_01;
import static com.ssafy.bridgetalkback.fixture.KidsFixture.JIYEONG;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static com.ssafy.bridgetalkback.fixture.ReportsFixture.REPORTS_01;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("Boards [Service Layer] -> BoardsFindService 테스트")
public class BoardsFindServiceTest extends ServiceTest {
    @Autowired
    private BoardsFindService boardsFindService;

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

    @Test
    @DisplayName("ID(PK)로 게시글을 조회한다")
    void findParentingInfoByParentingInfoIdAndIsDeleted() {
        // when
        Boards findBoards = boardsFindService.findBoardsByBoardsIdAndIsDeleted(boards.getBoardsId());

        // then
        assertThatThrownBy(() -> boardsFindService.findBoardsByBoardsIdAndIsDeleted(boards.getBoardsId() + 100L))
                .isInstanceOf(BaseException.class)
                .hasMessage(BoardsErrorCode.BOARDS_NOT_FOUND.getMessage());

        assertThat(findBoards).isEqualTo(boards);
    }
}
