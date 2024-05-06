package com.ssafy.bridgetalkback.slang.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.slang.service.SlangService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "slang", description = "SlangController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/slang")
public class SlangController {

    private final SlangService slangService;

    @GetMapping
    public ResponseEntity<?> findAllSlang(@ExtractPayload String userId){
        log.info("{SlangController} : 줄임말 전체조회 컨트롤러 진입");
        return ResponseEntity.ok(slangService.findAllSlang());
    }
}
