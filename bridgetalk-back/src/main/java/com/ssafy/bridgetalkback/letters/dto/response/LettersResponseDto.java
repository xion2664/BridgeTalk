package com.ssafy.bridgetalkback.letters.dto.response;

import com.ssafy.bridgetalkback.letters.domain.Letters;
import lombok.Builder;

@Builder
public record LettersResponseDto(
        Long lettersId,
        String lettersOriginalContent,
        String lettersTranslationContent
) {
    public static LettersResponseDto of(Letters letters) {
        return LettersResponseDto.builder()
                .lettersId(letters.getLettersId())
                .lettersOriginalContent(letters.getLettersOriginalContent())
                .lettersTranslationContent(letters.getLettersTranslationContent())
                .build();
    }
}
