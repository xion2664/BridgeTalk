package com.ssafy.bridgetalkback.letters.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum LettersErrorCode implements ErrorCode {
    EMPTY_FILE(HttpStatus.BAD_REQUEST, "LETTERS_001", "전송된 파일이 없습니다."),
    LETTERS_NOT_FOUND(HttpStatus.NOT_FOUND,"LETTERS_002","편지를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}