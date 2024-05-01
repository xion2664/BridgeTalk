package com.ssafy.bridgetalkback.reports.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.reports.service.ReportsService;
import com.ssafy.bridgetalkback.reports.service.TalkService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@Tag(name = "talk", description = "TalkController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reports")
public class TalkController {
    private final TalkService talkService;
    private final ReportsService reportsService;

    @GetMapping("/talk-stop")
    public ResponseEntity<Resource> stopTalk(@ExtractPayload String userId) {
        log.info("{ TalkController } : 대화 종료 진입");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .body(talkService.stopTalk(UUID.fromString(userId)));
    }

    @GetMapping("/talk-start")
    public ResponseEntity<Resource> startTalk(@ExtractPayload String userId) {
        log.info("{ TalkController } : 대화 시작 진입");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .body(talkService.startTalk(UUID.fromString(userId)));
    }

}
