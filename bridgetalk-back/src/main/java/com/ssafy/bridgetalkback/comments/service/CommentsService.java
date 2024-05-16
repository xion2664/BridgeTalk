package com.ssafy.bridgetalkback.comments.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.service.BoardsFindService;
import com.ssafy.bridgetalkback.comments.domain.Comments;
import com.ssafy.bridgetalkback.comments.dto.request.CommentsRequestDto;
import com.ssafy.bridgetalkback.comments.dto.request.CommentsUpdateRequestDto;
import com.ssafy.bridgetalkback.comments.dto.response.CommentsResponseDto;
import com.ssafy.bridgetalkback.comments.exception.CommentsErrorCode;
import com.ssafy.bridgetalkback.comments.repository.CommentsRepository;
import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.service.ParentsFindService;
import com.ssafy.bridgetalkback.translation.service.TranslationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommentsService {

    private final ParentsFindService parentsFindService;
    private final BoardsFindService boardsFindService;
    private final CommentsFindService commentsFindService;
    private final CommentsRepository commentsRepository;
    private final TranslationService translationService;

    public CommentsResponseDto createComments(UUID uuid, CommentsRequestDto commentsRequestDto) {
        log.info("{ CommentsService } : comments 생성");
        Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(uuid);
        Boards boards = boardsFindService.findByBoardsIdAndIsDeleted(commentsRequestDto.boardsId());
        String[] translate = translateComments(commentsRequestDto.commentsContent(), commentsRequestDto.language());
        Comments comments = Comments.createComments(parents, boards, translate[0], translate[1]);
        commentsRepository.save(comments);
        log.info("{ CommentsService } : comments 생성 성공");
        return CommentsResponseDto.fromComments(comments, commentsRequestDto.language());
    }

    public CommentsResponseDto updateComments(UUID uuid, Long commentsId, CommentsUpdateRequestDto commentsUpdateRequestDto) {
        log.info("{ CommentsService } : comments 수정");
        Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(uuid);
        Comments comments = commentsFindService.findByCommentsIdAndIsDeleted(commentsId);
        if (!parents.getUuid().equals(comments.getParents().getUuid()))
            throw BaseException.type(CommentsErrorCode.INVALID_USER);
        String[] translate = translateComments(commentsUpdateRequestDto.commentsContent(), commentsUpdateRequestDto.language());
        comments.updateComments(translate[0], translate[1]);
        log.info("{ CommentsService } : comments 수정 성공");
        return CommentsResponseDto.fromComments(comments, commentsUpdateRequestDto.language());
    }

    public void deleteComments(UUID uuid, Long commentsId) {
        log.info("{ CommentsService } : comments 삭제");
        Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(uuid);
        Comments comments = commentsFindService.findByCommentsIdAndIsDeleted(commentsId);
        if (!parents.getUuid().equals(comments.getParents().getUuid()))
            throw BaseException.type(CommentsErrorCode.INVALID_USER);
        comments.updateIsDeleted();
        log.info("{ CommentsService } : comments 삭제 성공");
    }

    private String[] translateComments(String commentsContent, Language language) {
        String[] translate = new String[2];
        if (language.equals(Language.kor)) {
            translate[0] = commentsContent;
            translate[1] = translationService.translation(commentsContent, "ko", "en");
            translate[1] = translationService.translation(translate[1], "en", "vi");
            log.info(">> 답변 번역 성공 ko->vi : {}", translate[1]);
        } else if (language.equals(Language.viet)) {
            translate[0] = translationService.translation(commentsContent, "vi", "en");
            translate[0] = translationService.translation(translate[0], "en", "ko");
            translate[1] = commentsContent;
            log.info(">> 답변 번역 성공 vi->ko : {}", translate[1]);
        }
        return translate;
    }
}
