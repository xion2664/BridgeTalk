package com.ssafy.bridgetalkback.reports.exception;

import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReportsErrorCode implements ErrorCode {
    REPORTS_NOT_FOUND(HttpStatus.NOT_FOUND, "REPORTS_001", "REPORTS를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
