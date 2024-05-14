package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.comments.domain.Comments;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommentsFixture {
    COMMENTS_01("첫번째 답변", "Câu trả lời đầu tiên"),
    COMMENTS_02("두번째 답변", "Câu trả lời thứ hai");

    private final String commentsContentKor;
    private final String commentsContentViet;

    public Comments toComments(Parents parents, Boards boards) {
        return Comments.createComments(parents, boards, commentsContentKor, commentsContentViet);
    }
}
