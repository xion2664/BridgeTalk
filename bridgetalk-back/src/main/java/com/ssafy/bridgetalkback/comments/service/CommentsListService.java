package com.ssafy.bridgetalkback.comments.service;

import com.ssafy.bridgetalkback.comments.domain.CommentsSortCondition;
import com.ssafy.bridgetalkback.comments.dto.response.CustomCommentsListResponseDto;
import com.ssafy.bridgetalkback.comments.query.dto.CommentsListDto;
import com.ssafy.bridgetalkback.comments.repository.CommentsRepository;
import com.ssafy.bridgetalkback.global.Language;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentsListService {
    private final CommentsRepository commentsRepository;

    public CustomCommentsListResponseDto<CommentsListDto> getCustomCommentsList(int page, String sort, Language language) {
        log.info("{ CommentsListService } : Comments 리스트조회 진입");
        CommentsSortCondition commentsSortCondition = CommentsSortCondition.from(sort);
        CustomCommentsListResponseDto<CommentsListDto> commentsList = null;
        switch (commentsSortCondition) {
            case TIME -> commentsList = commentsRepository.getCommentsListOrderByTime(page, language);
            case LIKES -> commentsList = commentsRepository.getCommentsListOrderByLikes(page, language);
        }

        log.info("{ CommentsListService } : Comments 리스트조회 성공");
        return new CustomCommentsListResponseDto<>(commentsList.pageInfo(), commentsList.commentsList());
    }
}

