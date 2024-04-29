package com.ssafy.bridgetalkback.tts.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.ByteArrayInputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayName("TtsService [Service Layer] -> Text-to-Speech 서비스 테스트")
public class TtsServiceTest extends ServiceTest {

    @Autowired
    private TtsService ttsService;

    private HttpURLConnection mockConnection;
    private URL mockUrl;

    @BeforeEach
    void setup() throws Exception {
        mockUrl = mock(URL.class);
        mockConnection = mock(HttpURLConnection.class);
        when(mockUrl.openConnection()).thenReturn(mockConnection);
        when(mockConnection.getInputStream()).thenReturn(new ByteArrayInputStream("임시 오디오 데이터".getBytes()));
        when(mockConnection.getResponseCode()).thenReturn(HttpURLConnection.HTTP_OK);
    }

    @Test
    @DisplayName("Text-to-Speech 스트리밍 성공 검증")
    void testTextToSpeechStreamingSuccess() throws Exception {
        StreamingResponseBody responseBody = ttsService.textToSpeech("테스트할 임시 텍스트 데이터입니다.");
        MockHttpServletResponse mockResponse = new MockHttpServletResponse();
        responseBody.writeTo(mockResponse.getOutputStream());

        assertThat(mockResponse.getStatus()).isEqualTo(HttpServletResponse.SC_OK);
    }
}
