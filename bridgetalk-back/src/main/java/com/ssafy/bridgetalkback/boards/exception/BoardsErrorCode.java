package com.ssafy.bridgetalkback.boards.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BoardsErrorCode implements ErrorCode {
    BOARDS_NOT_FOUND(HttpStatus.NOT_FOUND, "BOARDS_001", "게시글 정보를 찾을 수 없습니다."),
    INVALID_USER(HttpStatus.BAD_REQUEST, "BOARDS_002", "게시글 작성자가 아닙니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
