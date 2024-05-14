package com.ssafy.bridgetalkback.boards.query;

import com.ssafy.bridgetalkback.boards.domain.BoardsSearchType;
import com.ssafy.bridgetalkback.boards.dto.response.CustomBoardsListResponseDto;
import com.ssafy.bridgetalkback.boards.query.dto.BoardsListDto;
import com.ssafy.bridgetalkback.global.Language;

public interface BoardsListQueryRepository {
    CustomBoardsListResponseDto<BoardsListDto> getBoardsListOrderByTime(int page, BoardsSearchType boardSearchType,
                                                                        String searchWord, Language language);
    CustomBoardsListResponseDto<BoardsListDto> getBoardsListOrderByLikes(int page, BoardsSearchType boardSearchType,
                                                                         String searchWord, Language language);
}
