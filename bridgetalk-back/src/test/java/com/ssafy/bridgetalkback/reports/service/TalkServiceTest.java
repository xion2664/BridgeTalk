package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.net.HttpURLConnection;

import static com.ssafy.bridgetalkback.fixture.KidsFixture.*;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayName("Talk [Service Layer] -> TalkService 테스트")
public class TalkServiceTest extends ServiceTest {
    @Autowired
    private TalkService talkService;

    private Parents parents;
    private Kids kids;
    private HttpURLConnection mockConnection;

    @BeforeEach
    void setup() {
        parents = parentsRepository.save(SUNKYOUNG.toParents());
        kids = kidsRepository.save(JIYEONG.toKids(parents));
        mockConnection = mock(HttpURLConnection.class);
    }

    @Test
    @DisplayName("대화 종료 멘트 tts 변환에 성공한다")
    void findProfileList() throws IOException {
        // given
        when(mockConnection.getResponseCode()).thenReturn(HttpURLConnection.HTTP_OK);

        // when
        Resource response = talkService.stopTalk(kids.getUuid());

        // Then
        assertThat(response).isInstanceOf(FileSystemResource.class);
    }

    @Test
    @DisplayName("대화 시작 멘트 tts 변환에 성공한다")
    void startCommentTts() throws IOException {
        // given
        when(mockConnection.getResponseCode()).thenReturn(HttpURLConnection.HTTP_OK);

        // when
        Resource response = talkService.startTalk(kids.getUuid());

        // Then
        assertThat(response).isInstanceOf(FileSystemResource.class);
    }
}
