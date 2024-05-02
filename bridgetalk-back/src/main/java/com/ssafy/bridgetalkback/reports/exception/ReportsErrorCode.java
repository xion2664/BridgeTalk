package com.ssafy.bridgetalkback.reports.exception;

import ch.qos.logback.core.spi.ErrorCodes;
import com.ssafy.bridgetalkback.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReportsErrorCode implements ErrorCode {
    KIDS_NOT_FOUND(HttpStatus.NOT_FOUND, "REPORTS_001", "아이 프로필 정보가 없습니다."),
    REPORTS_NOT_FOUND(HttpStatus.NOT_FOUND, "REPORTS_002", "레포트 정보를 찾을 수 없습니다."),
    EMPTY_FILE(HttpStatus.BAD_REQUEST, "REPORTS_003", "전송된 파일이 없습니다."),
    CHATGPT_EMPTY_TEXT(HttpStatus.BAD_REQUEST, "REPORTS_004", "[chatgpt api 호출] 아이 음성 텍스트가 비어있습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
