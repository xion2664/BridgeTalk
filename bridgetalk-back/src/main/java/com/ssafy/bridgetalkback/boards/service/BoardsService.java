package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.repository.ParentsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardsService {
    private final BoardsFindService boardsFindService;
    private final ParentsRepository parentsRepository;

    public BoardsResponseDto getBoardsDetail(UUID parentsId, Long boardsId, Language language) {
        log.info("{ BoardsService } : 게시글 상세조회 진입");
        validateParents(parentsId);
        Boards findBoards = boardsFindService.findBoardsByBoardsIdAndIsDeleted(boardsId);

        BoardsResponseDto responseDto = BoardsResponseDto.from(findBoards, language);
        log.info("{ BoardsService } : 게시글 상세조회 성공");
        return responseDto;
    }

    private void validateParents(UUID parentsId) {
        if (!parentsRepository.existsById(parentsId)) {
            throw BaseException.type(BoardsErrorCode.USER_IS_NOT_PARENTS);
        }
    }
}
