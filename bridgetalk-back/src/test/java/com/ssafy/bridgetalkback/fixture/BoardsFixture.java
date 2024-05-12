package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardsFixture {
    BOARDS_01("title_kor1", "title_viet1", "content_kor1", "content_viet1"),
    BOARDS_02("title_kor2", "title_viet2", "content_kor2", "content_viet2"),
    BOARDS_03("title_kor3", "title_viet3", "content_kor3", "content_viet3"),
    BOARDS_04("title_kor4", "title_viet4", "content_kor4", "content_viet4"),
    BOARDS_05("title_kor5", "title_viet5", "content_kor5", "content_viet5"),
    BOARDS_06("title_kor6", "title_viet6", "content_kor6", "content_viet6"),
    BOARDS_07("title_kor7", "title_viet7", "content_kor7", "content_viet7"),
    BOARDS_08("title_kor8", "title_viet8", "content_kor8", "content_viet8"),
    BOARDS_09("title_kor9", "title_viet9", "content_kor9", "content_viet9"),
    BOARDS_10("title_kor10", "title_viet10", "content_kor10", "content_viet10"),
    BOARDS_11("title_kor11", "title_viet11", "content_kor11", "content_viet11"),
    BOARDS_12("title_kor12", "title_viet12", "content_kor12", "content_viet12")
    ;

    private final String boardsTitle_kor;
    private final String boardsTitle_viet;
    private final String boardsContent_kor;
    private final String boardsContent_viet;

    public Boards toBoards(Reports reports, Parents parents) {
        return Boards.createBoards(reports, parents, boardsTitle_kor, boardsTitle_viet, boardsContent_kor, boardsContent_viet);
    }
}
