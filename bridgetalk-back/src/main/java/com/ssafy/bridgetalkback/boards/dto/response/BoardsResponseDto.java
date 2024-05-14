package com.ssafy.bridgetalkback.boards.dto.response;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.global.Language;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record BoardsResponseDto(
        Long boardId,
        String boardsTitle,
        String boardsContent,
        int likes,
        LocalDateTime createdAt,
        String reportsSummary,
        List<String> reportsKeywords,
        String writer
) {
    public static BoardsResponseDto from(Boards boards, Language language) {
        return BoardsResponseDto.builder()
                .boardId(boards.getBoardsId())
                .boardsTitle(language.equals(Language.kor) ? boards.getBoardsTitle_kor() : boards.getBoardsTitle_viet())
                .boardsContent(language.equals(Language.kor) ? boards.getBoardsContent_kor() : boards.getBoardsContent_viet())
                .likes(boards.getLikes())
                .createdAt(boards.getCreatedAt())
                .reportsSummary(language.equals(Language.kor) ? boards.getReports().getReportsSummaryKor() : boards.getReports().getReportsSummaryViet())
                .reportsKeywords(language.equals(Language.kor) ? boards.getReports().getReportsKeywordsKor() : boards.getReports().getReportsKeywordsViet())
                .writer(boards.getParents().getParentsNickname())
>>>>>>> bridgetalk-back/src/main/java/com/ssafy/bridgetalkback/boards/dto/response/BoardsResponseDto.java
                .build();
    }
}
