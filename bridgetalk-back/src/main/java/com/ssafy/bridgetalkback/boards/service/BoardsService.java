package com.ssafy.bridgetalkback.boards.service;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.boards.dto.request.BoardsRequestDto;
import com.ssafy.bridgetalkback.boards.dto.request.BoardsUpdateRequestDto;
import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.boards.repository.BoardsRepository;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.service.ParentsFindService;
import com.ssafy.bridgetalkback.reports.domain.Language;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.service.ReportsFindService;
import com.ssafy.bridgetalkback.translation.service.TranslationService;
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
@Transactional
@RequiredArgsConstructor
public class BoardsService {

    private final ParentsFindService parentsFindService;
    private final ReportsFindService reportsFindService;
    private final BoardsRepository boardsRepository;
    private final BoardsFindService boardsFindService;
    private final TranslationService translationService;
    private final ParentsRepository parentsRepository;


    public BoardsResponseDto createBoards(UUID uuid, BoardsRequestDto boardsRequestDto) {
        log.info("{ BoardsService } : boards 생성");
        Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(uuid);
        Reports reports = reportsFindService.findByReportsIdAndIsDeleted(boardsRequestDto.reportsId());
        String[] translate = translateBoards(boardsRequestDto.boardsTitle(), boardsRequestDto.boardsContent(), boardsRequestDto.language());
        Boards boards = Boards.createBoards(reports, parents, translate[0], translate[1], translate[2], translate[3]);
        boardsRepository.save(boards);
        log.info("{ BoardsService } : boards 생성 성공");
        return BoardsResponseDto.fromBoards(boards, boardsRequestDto.language());
    }

    public BoardsResponseDto updateBoards(UUID uuid, Long boardsId, BoardsUpdateRequestDto boardsUpdateRequestDto) {
        log.info("{ BoardsService } : boards 수정");
        Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(uuid);
        Boards boards = boardsFindService.findByBoardsIdAndIsDeleted(boardsId);
        if (!parents.getUuid().equals(boards.getParents().getUuid()))
            throw BaseException.type(BoardsErrorCode.USER_IS_NOT_BOARD_WRITER);
        String[] translate = translateBoards(boardsUpdateRequestDto.boardsTitle(), boardsUpdateRequestDto.boardsContent(), boardsUpdateRequestDto.language());
        boards.updateBoards(translate[0], translate[1], translate[2], translate[3]);
        log.info("{ BoardsService } : boards 수정 성공");
        return BoardsResponseDto.fromBoards(boards, boardsUpdateRequestDto.language());
    }

    public void deleteBoards(UUID uuid, Long boardsId) {
        log.info("{ BoardsService } : boards 삭제");
        Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(uuid);
        Boards boards = boardsFindService.findByBoardsIdAndIsDeleted(boardsId);
        if (!parents.getUuid().equals(boards.getParents().getUuid()))
            throw BaseException.type(BoardsErrorCode.USER_IS_NOT_BOARD_WRITER);
        boards.updateIsDeleted();
        log.info("{ BoardsService } : boards 삭제 성공");
    }

    public String[] translateBoards(String boardsTitle, String boardsContent, Language language) {
        String[] translate = new String[4];
        if (language.equals(Language.kor)) {
            translate[0] = boardsTitle;
            translate[1] = translationService.translation(boardsTitle, "ko", "en");
            translate[1] = translationService.translation(translate[1], "en", "vi");
            log.info(">> 게시글 제목 번역 성공 ko->vi : {}", translate[1]);
            translate[2] = boardsContent;
            translate[3] = translationService.translation(boardsContent, "ko", "en");
            translate[3] = translationService.translation(translate[3], "en", "vi");
            log.info(">> 게시글 내용 번역 성공 ko->vi : {}", translate[3]);
        } else if (language.equals(Language.viet)) {
            translate[0] = translationService.translation(boardsTitle, "vi", "en");
            translate[0] = translationService.translation(translate[0], "en", "ko");
            translate[1] = boardsTitle;
            log.info(">> 게시글 제목 번역 성공 vi->ko : {}", translate[1]);
            translate[2] = translationService.translation(boardsContent, "vi", "en");
            translate[2] = translationService.translation(translate[2], "en", "ko");
            translate[3] = boardsContent;
            log.info(">> 게시글 내용 번역 성공 vi->ko : {}", translate[3]);
        }
        return translate;
    }

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
