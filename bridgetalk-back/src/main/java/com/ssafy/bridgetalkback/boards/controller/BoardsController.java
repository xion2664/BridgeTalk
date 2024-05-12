package com.ssafy.bridgetalkback.boards.controller;

import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.boards.service.BoardsService;
import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@Tag(name = "Boards", description = "BoardsController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardsController {
    private final BoardsService boardsService;

    @GetMapping("/{boardId}/{language}")
    public ResponseEntity<BoardsResponseDto> getParentingInfoDetail(@ExtractPayload String userId, @PathVariable Long boardId, @PathVariable Language language) {
        log.info("{ BoardsController } : 게시글 상세조회 진입");
        return ResponseEntity.ok(boardsService.getBoardsDetail(UUID.fromString(userId), boardId, language));
    }
}
