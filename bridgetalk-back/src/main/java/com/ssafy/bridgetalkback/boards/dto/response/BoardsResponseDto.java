package com.ssafy.bridgetalkback.boards.dto.response;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.global.Language;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record BoardsResponseDto(
        Long boardsId,
        String boardsTitle,
        String boardsContent,
        int likes,
        LocalDateTime createdAt,
        String reportsSummary,
        List<String> reportsKeywords,
        String writer
) {
    public static BoardsResponseDto fromBoards(Boards boards, Language language) {
        return BoardsResponseDto.builder()
                .boardsId(boards.getBoardsId())
                .boardsTitle(language.equals(Language.kor) ? boards.getBoardsTitleKor() : boards.getBoardsTitleViet())
                .boardsContent(language.equals(Language.kor) ? boards.getBoardsContentKor() : boards.getBoardsContentViet())
                .likes(boards.getLikes())
                .createdAt(boards.getCreatedAt())
                .reportsSummary(language.equals(Language.kor) ? boards.getReports().getReportsSummaryKor() : boards.getReports().getReportsSummaryViet())
                .reportsKeywords(language.equals(Language.kor) ? boards.getReports().getReportsKeywordsKor() : boards.getReports().getReportsKeywordsViet())
                .writer(boards.getParents().getParentsNickname())
                .build();
    }
}
