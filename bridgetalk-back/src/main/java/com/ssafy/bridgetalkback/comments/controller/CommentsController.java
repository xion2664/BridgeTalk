package com.ssafy.bridgetalkback.comments.controller;

import com.ssafy.bridgetalkback.comments.dto.request.CommentsRequestDto;
import com.ssafy.bridgetalkback.comments.dto.request.CommentsUpdateRequestDto;
import com.ssafy.bridgetalkback.comments.dto.response.CommentsResponseDto;
import com.ssafy.bridgetalkback.comments.service.CommentsService;
import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@Tag(name = "Comments", description = "CommentsController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentsController {

    private final CommentsService commentsService;

    @PostMapping
    public ResponseEntity<CommentsResponseDto> createComments(
            @ExtractPayload String userId,
            @RequestBody CommentsRequestDto commentsRequestDto
    ) {
        log.info("{ CommentsController } : Comments 생성 진입");
        CommentsResponseDto commentsResponseDto = commentsService.createComments(UUID.fromString(userId), commentsRequestDto);
        log.info("{ CommentsController } : Comments 생성 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(commentsResponseDto);
    }

    @PatchMapping("/{commentsId}")
    public ResponseEntity<CommentsResponseDto> updateComments(
            @ExtractPayload String userId,
            @PathVariable Long commentsId,
            @RequestBody CommentsUpdateRequestDto commentsUpdateRequestDto
    ) {
        log.info("{ CommentsController } : Comments 수정 진입");
        CommentsResponseDto commentsResponseDto = commentsService.updateComments(UUID.fromString(userId), commentsId, commentsUpdateRequestDto);
        log.info("{ CommentsController } : Comments 수정 성공");
        return ResponseEntity.ok(commentsResponseDto);
    }

    @DeleteMapping("/{commentsId}")
    public ResponseEntity<?> deleteComments(@ExtractPayload String userId, @PathVariable Long commentsId){
        log.info("{ CommentsController } : Comments 삭제 진입");
        commentsService.deleteComments(UUID.fromString(userId), commentsId);
        log.info("{ CommentsController } : Comments 삭제 성공");
        return ResponseEntity.ok().build();
    }
}
