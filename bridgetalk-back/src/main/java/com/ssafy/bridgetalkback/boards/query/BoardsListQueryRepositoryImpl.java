package com.ssafy.bridgetalkback.boards.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bridgetalkback.boards.domain.BoardsSearchType;
import com.ssafy.bridgetalkback.boards.dto.response.CustomBoardsListResponseDto;
import com.ssafy.bridgetalkback.boards.query.dto.BoardsListDto;
import com.ssafy.bridgetalkback.boards.query.dto.QBoardsListDto;
import com.ssafy.bridgetalkback.global.Language;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.querydsl.core.types.ExpressionUtils.count;
import static com.ssafy.bridgetalkback.boards.domain.QBoards.boards;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardsListQueryRepositoryImpl implements BoardsListQueryRepository {
    private final JPAQueryFactory query;

    @Override
    public CustomBoardsListResponseDto<BoardsListDto> getBoardsListOrderByTime(int page, BoardsSearchType boardSearchType,
                                                                               String searchWord, Language language) {
        Pageable pageable = PageRequest.of(page, 4);
        List<BoardsListDto> boardLists = query
                .selectDistinct(createQBoardsListDto(language))
                .from(boards)
                .where(language.equals(Language.kor) ? searchKorea(boardSearchType, searchWord) : searchVietnam(boardSearchType, searchWord))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(boards.createdAt.desc())
                .fetch();

        JPAQuery<Long> countQuery = query
                .select(count(boards.boardsId))
                .from(boards)
                .where(language.equals(Language.kor) ? searchKorea(boardSearchType, searchWord) : searchVietnam(boardSearchType, searchWord));

        return new CustomBoardsListResponseDto<>(PageableExecutionUtils.getPage(boardLists, pageable, countQuery::fetchOne));
    }

    @Override
    public CustomBoardsListResponseDto<BoardsListDto> getBoardsListOrderByLikes(int page, BoardsSearchType boardSearchType,
                                                                                String searchWord, Language language) {
        Pageable pageable = PageRequest.of(page, 4);
        List<BoardsListDto> boardLists = query
                .selectDistinct(createQBoardsListDto(language))
                .from(boards)
                .where(language.equals(Language.kor) ? searchKorea(boardSearchType, searchWord) : searchVietnam(boardSearchType, searchWord))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(boards.likes.desc())
                .fetch();

        JPAQuery<Long> countQuery = query
                .select(count(boards.boardsId))
                .from(boards)
                .where(language.equals(Language.kor) ? searchKorea(boardSearchType, searchWord) : searchVietnam(boardSearchType, searchWord));

        return new CustomBoardsListResponseDto<>(PageableExecutionUtils.getPage(boardLists, pageable, countQuery::fetchOne));
    }

    private BooleanExpression searchKorea(BoardsSearchType boardSearchType, String searchWord) {
        log.info(" { BoardsListQueryRepositoryImpl } : searchKorea"+boardSearchType);
        if (searchWord == null || searchWord.isEmpty()) {
            return null;
        } else {
            switch (boardSearchType) {
                case TITLE -> {
                    log.info(" { BoardsListQueryRepositoryImpl } : "+searchWord);
                    return boards.boardsTitleKor.contains(searchWord);
                }
                case CONTENT_AND_REPORTS_SUMMARY -> {
                    return boards.boardsContentKor.contains(searchWord).or(boards.reports.reportsSummaryKor.contains(searchWord));
                }
                case WRITER -> {
                    return boards.parents.parentsNickname.contains(searchWord);
                }
                case REPORTS_KEYWORD -> {
                    return boards.reports.reportsKeywordsKor.contains(searchWord);
                }
                case TITLE_AND_CONTENT_AND_REPORTS -> {
                    return boards.boardsTitleKor.contains(searchWord).or(boards.boardsContentKor.contains(searchWord)
                            .or(boards.reports.reportsSummaryKor.contains(searchWord)).or(boards.reports.reportsKeywordsKor.contains(searchWord)));
                }
                default -> {
                    return null;
                }
            }
        }
    }

    private BooleanExpression searchVietnam(BoardsSearchType boardSearchType, String searchWord) {
        if (searchWord == null || searchWord.isEmpty()) {
            return null;
        } else {
            switch (boardSearchType) {
                case TITLE -> {
                    return boards.boardsTitleViet.contains(searchWord);
                }
                case CONTENT_AND_REPORTS_SUMMARY -> {
                    return boards.boardsContentViet.contains(searchWord).or(boards.reports.reportsSummaryViet.contains(searchWord));
                }
                case WRITER -> {
                    return boards.parents.parentsNickname.contains(searchWord);
                }
                case REPORTS_KEYWORD -> {
                    return boards.reports.reportsKeywordsViet.contains(searchWord);
                }
                case TITLE_AND_CONTENT_AND_REPORTS -> {
                    return boards.boardsTitleViet.contains(searchWord).or(boards.boardsContentViet.contains(searchWord)
                            .or(boards.reports.reportsSummaryViet.contains(searchWord)).or(boards.reports.reportsKeywordsViet.contains(searchWord)));
                }
                default -> {
                    return null;
                }
            }
        }
    }

    private QBoardsListDto createQBoardsListDto(Language language) {
        QBoardsListDto boardsListDto = null;

        switch (language) {
            case kor -> boardsListDto = new QBoardsListDto(boards.boardsId, boards.boardsTitleKor,
                    boards.boardsContentKor, boards.likes, boards.createdAt, boards.reports.reportsSummaryKor,
                    boards.reports.reportsKeywordsKor, boards.parents.parentsNickname);
            case viet -> boardsListDto = new QBoardsListDto(boards.boardsId, boards.boardsTitleViet,
                    boards.boardsContentViet, boards.likes, boards.createdAt, boards.reports.reportsSummaryViet,
                    boards.reports.reportsKeywordsViet, boards.parents.parentsNickname);
        }
        return boardsListDto;
    }
}
