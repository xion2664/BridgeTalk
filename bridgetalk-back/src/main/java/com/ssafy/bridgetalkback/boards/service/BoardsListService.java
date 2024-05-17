package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.BoardsSearchType;
import com.ssafy.bridgetalkback.boards.domain.BoardsSortCondition;
import com.ssafy.bridgetalkback.boards.dto.response.CustomBoardsListResponseDto;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.boards.query.dto.BoardsListDto;
import com.ssafy.bridgetalkback.boards.repository.BoardsRepository;
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
public class BoardsListService {
    private final BoardsRepository boardsRepository;

    public CustomBoardsListResponseDto<BoardsListDto> getCustomBoardsList(int page, String searchType, String searchWord,
                                                                          String sort, Language language) {
        log.info("{ BoardsListService } : 게시글 리스트조회 진입");
        BoardsSearchType boardsSearchType = BoardsSearchType.from(searchType);
        BoardsSortCondition boardsSortCondition = BoardsSortCondition.from(sort);
        CustomBoardsListResponseDto<BoardsListDto> boardsList = null;
        switch (boardsSortCondition) {
            case TIME -> boardsList = boardsRepository.getBoardsListOrderByTime(page, boardsSearchType, searchWord, language);
            case LIKES -> boardsList = boardsRepository.getBoardsListOrderByLikes(page, boardsSearchType, searchWord, language);
        }

        log.info("{ BoardsListService } : 게시글 리스트조회 성공");
        return new CustomBoardsListResponseDto<>(boardsList.pageInfo(), boardsList.boardsList());
    }
}
