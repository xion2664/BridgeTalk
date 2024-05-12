package com.ssafy.bridgetalkback.boards.dto.response;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.reports.domain.Language;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record BoardsResponseDto(
        Long boardsId,
        String reportsSummary,
        String parentsUuid,
        String parentsNickname,
        String boardsTitle,
        String boardsContent,
        LocalDateTime createdAt
) {
    public static BoardsResponseDto fromBoards(Boards boards, Language language) {
        return BoardsResponseDto.builder()
                .boardsId(boards.getBoardsId())
                .reportsSummary(boards.getReports().getReportsSummaryKor())
                .parentsUuid(String.valueOf(boards.getParents().getUuid()))
                .parentsNickname(boards.getParents().getParentsNickname())
                .boardsTitle(language.equals(Language.kor) ? boards.getBoardsTitleKor() : boards.getBoardsTitleViet())
                .boardsContent(language.equals(Language.kor) ? boards.getBoardsContentKor() : boards.getBoardsContentViet())
                .createdAt(boards.getCreatedAt())
                .build();
    }
}
