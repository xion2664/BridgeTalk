package com.ssafy.bridgetalkback.letters.dto.response;

import com.ssafy.bridgetalkback.letters.domain.Letters;
import lombok.Builder;

@Builder
public record LettersResponseDTO(
        Long lettersId,
        String lettersOriginalContent,
        String lettersTranslationContent
) {
    public LettersResponseDTO of(Letters letters) {
        return LettersResponseDTO.builder()
                .lettersId(letters.getLettersId())
                .lettersOriginalContent(letters.getLettersOriginalContent())
                .lettersTranslationContent(letters.getLettersTranslationContent())
                .build();
    }
}
