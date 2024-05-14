package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardsFixture {
    BOARDS_01("첫번째 게시글 제목", "Tiêu đề bài viết đầu tiên", "첫번째 게시글 내용", "Nội dung bài viết đầu tiên"),
    BOARDS_02("두번째 게시글 제목", "Tiêu đề bài viết thứ hai", "두번째 게시글 내용", "Nội dung bài viết thứ hai");

    private final String boardsTitleKor;
    private final String boardsTitleViet;
    private final String boardsContentKor;
    private final String boardsContentViet;

    public Boards toBoards(Reports reports, Parents parents) {
        return Boards.createBoards(reports, parents, boardsTitleKor, boardsTitleViet, boardsContentKor, boardsContentViet);
    }
}
