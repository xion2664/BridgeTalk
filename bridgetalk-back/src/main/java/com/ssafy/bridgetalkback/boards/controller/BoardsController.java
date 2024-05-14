package com.ssafy.bridgetalkback.boards.controller;

import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.boards.dto.response.CustomBoardsListResponseDto;
import com.ssafy.bridgetalkback.boards.query.dto.BoardsListDto;
import com.ssafy.bridgetalkback.boards.service.BoardsListService;
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
    private final BoardsListService boardsListService;

    @GetMapping("/{boardId}/{language}")
    public ResponseEntity<BoardsResponseDto> getParentingInfoDetail(@ExtractPayload String userId, @PathVariable Long boardId, @PathVariable Language language) {
        log.info("{ BoardsController } : 게시글 상세조회 진입");
        return ResponseEntity.ok(boardsService.getBoardsDetail(UUID.fromString(userId), boardId, language));
    }

    @GetMapping("/{language}")
    public ResponseEntity<CustomBoardsListResponseDto<BoardsListDto>> getCustomBoardsList(@ExtractPayload String userId, @PathVariable Language language,
                                                                                          @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                                                          @RequestParam(value = "searchType", required = false, defaultValue = "title_and_content_and_reports") String searchType,
                                                                                          @RequestParam(value = "searchWord", required = false, defaultValue = "") String searchWord,
                                                                                          @RequestParam(value = "sort", required = false, defaultValue = "최신순") String sort) {
        log.info("{ BoardsController } : 게시글 리스트조회 진입 (검색조건, 검색키워드, 정렬 유형) - " + searchType + "," + searchWord + "," + sort);
        return ResponseEntity.ok(boardsListService.getCustomBoardsList(UUID.fromString(userId), page, searchType, searchWord, sort, language));
    }
}