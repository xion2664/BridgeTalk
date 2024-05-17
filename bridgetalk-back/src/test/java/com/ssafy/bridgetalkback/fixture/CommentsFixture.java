package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.comments.domain.Comments;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommentsFixture {
    COMMENTS_01("첫번째 답변", "Câu trả lời đầu tiên", "Unang sagot"),
    COMMENTS_02("두번째 답변", "Câu trả lời thứ hai", "Pangalawang sagot");

    private final String commentsContentKor;
    private final String commentsContentViet;
    private final String commentsContentPh;

    public Comments toComments(Parents parents, Boards boards) {
        return Comments.createComments(parents, boards, commentsContentKor, commentsContentViet, commentsContentPh);
    }
}
