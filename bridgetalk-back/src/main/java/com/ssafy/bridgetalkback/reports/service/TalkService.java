package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.kids.service.KidsFindService;
import com.ssafy.bridgetalkback.tts.service.TtsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TalkService {
    private final KidsFindService kidsFindService;
    private final TtsService ttsService;

    @Transactional
    public Resource stopTalk(UUID userId) {
        log.info("{ TalkService } : 대화 그만하기 진입");

        Kids kids = kidsFindService.findKidsByUuidAndIsDeleted(userId);
        String endGreetingText = kids.getKidsNickname()+" "+stopComment[randomIdx()];
        log.info("{ TalkService } : 대화 종료 text - "+endGreetingText);

        Resource endGreeting = ttsService.textToSpeech(endGreetingText);
        log.info("{ TalkService } : endGreeting - "+endGreeting.toString());
        return endGreeting;
    }

    // 0 ~ 4
    private int randomIdx() {
        return (int)(Math.random() * 5);
    }

    private final String[] stopComment = {
            "이야기해서 너무 좋았어! 나는 이만 가볼게! 오늘도 좋은 하루 보내",
            "오늘 이야기도 너무 즐거웠어! 다음에 또 보자!",
            "나랑 같이 추억을 쌓아줘서 고마워! 다음에 또 만날 때까지 건강하게 지내",
            "너와 함께할 수 있어서 즐거웠어. 다음에 또 만나자",
            "벌써 마칠 시간이네. 언제 어디서든 너를 응원할 게! 다음에 또 만나"
    };
}
