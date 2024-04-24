package com.ssafy.bridgetalkback.letters.dto;

import com.ssafy.bridgetalkback.letters.domain.Letters;
import com.ssafy.bridgetalkback.parent.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import org.springframework.web.multipart.MultipartFile;

public record LettersRequestDTO(
        String reportsId,
        MultipartFile lettersFile
) {
    public Letters toEntity(Parents parents, Reports reports, String lettersOriginalContent, String lettersTranslationContent) {
        return Letters.builder()
                .parents(parents)
                .reports(reports)
                .lettersOriginalContent(lettersOriginalContent)
                .lettersTranslationContent(lettersTranslationContent)
                .build();
    }
}
