package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.boards.repository.BoardsRepository;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardsFindService {

    private final BoardsRepository boardsRepository;

    public Boards findByBoardsIdAndIsDeleted(Long boardsId) {
        log.info("{ BoardsFindService } : Id(Pk)로 게시글 정보 조회 - " + boardsId);
        return boardsRepository.findByBoardsIdAndIsDeleted(boardsId, 0)
                .orElseThrow(()-> BaseException.type(BoardsErrorCode.BOARDS_NOT_FOUND));
    }

}
