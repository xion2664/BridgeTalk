package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardsFixture {
    BOARDS_01("게시글 제목 1", "Tựa đề bài viết 1", "게시글 내용 1", "Nội dung bài viết 1"),
    BOARDS_02("게시글 제목 2", "Tựa đề bài viết 2", "게시글 내용 2", "Nội dung bài viết 2");

    private final String boardsTitleKor;
    private final String boardsTitleViet;
    private final String boardsContentKor;
    private final String boardsContentViet;

    public Boards toBoards(Reports reports, Parents parents) {
        return Boards.createBoards(reports, parents, boardsTitleKor, boardsTitleViet, boardsContentKor, boardsContentViet);
    }
}
