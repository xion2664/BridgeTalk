package com.ssafy.bridgetalkback.boards.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BoardsErrorCode implements ErrorCode {
    BOARDS_NOT_FOUND(HttpStatus.NOT_FOUND, "BOARDS_001", "게시글 정보를 찾을 수 없습니다."),
    USER_IS_NOT_PARENTS(HttpStatus.NOT_FOUND, "BOARDS_002", "부모가 아닙니다."),
    SEARCH_TYPE_NOT_FOUND(HttpStatus.NOT_FOUND, "BOARD_003", "지원하지 않는 검색 조건입니다."),
    SORT_CONDITION_NOT_FOUND(HttpStatus.NOT_FOUND, "BOARD_004", "지원하지 않는 정렬 방식입니다."),
    USER_IS_NOT_BOARD_WRITER(HttpStatus.BAD_REQUEST, "BOARDS_005", "게시글 작성자가 아닙니다.");
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
