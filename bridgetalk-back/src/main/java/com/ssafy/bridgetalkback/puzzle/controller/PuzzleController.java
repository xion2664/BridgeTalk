package com.ssafy.bridgetalkback.puzzle.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.puzzle.dto.response.PuzzleListResponseDto;
import com.ssafy.bridgetalkback.puzzle.dto.response.PuzzleResponseDto;
import com.ssafy.bridgetalkback.puzzle.service.PuzzleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Tag(name = "Puzzle", description = "PuzzleController")@RestController
@RequiredArgsConstructor
@RequestMapping("/api/puzzle")
public class PuzzleController {
    private final PuzzleService puzzleService;

    @GetMapping("/{puzzleId}")
    public ResponseEntity<PuzzleResponseDto> puzzleDetail(@ExtractPayload String userId, @PathVariable Long puzzleId) {
        log.info("{ PuzzleController } : 퍼즐 상세조회 진입");
        return ResponseEntity.ok(puzzleService.puzzleDetail(puzzleId));
    }

    @GetMapping
    public ResponseEntity<PuzzleListResponseDto> puzzleList(@ExtractPayload String userId) {
        log.info("{ PuzzleController } : 퍼즐 리스트 조회 진입");
        return ResponseEntity.ok(puzzleService.puzzleList());
    }
}
