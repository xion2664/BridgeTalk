package com.ssafy.bridgetalkback.parentingInfo.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ParentingInfoErrorCode implements ErrorCode {
    PARENTINGINFO_NOT_FOUND(HttpStatus.NOT_FOUND, "PARENTINGINFO_001", "육아 정보를 찾을 수 없습니다.")
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}

