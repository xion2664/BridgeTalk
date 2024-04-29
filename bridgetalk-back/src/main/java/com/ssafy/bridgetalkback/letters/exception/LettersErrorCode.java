package com.ssafy.bridgetalkback.letters.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum LettersErrorCode implements ErrorCode {
    LETTERS_NOT_FOUND(HttpStatus.NOT_FOUND, "Letters_001", "편지 정보를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
