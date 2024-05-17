package com.ssafy.bridgetalkback.comments.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommentsErrorCode implements ErrorCode {
    COMMENTS_NOT_FOUND(HttpStatus.NOT_FOUND, "COMMENTS_001", "답변 정보를 찾을 수 없습니다."),
    INVALID_USER(HttpStatus.BAD_REQUEST, "COMMENTS_002", "답변 작성자가 아닙니다."),
    SORT_CONDITION_NOT_FOUND(HttpStatus.NOT_FOUND, "COMMENTS_003", "지원하지 않는 정렬 방식입니다.")
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
