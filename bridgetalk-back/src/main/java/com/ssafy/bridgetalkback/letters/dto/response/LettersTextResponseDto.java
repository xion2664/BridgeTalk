package com.ssafy.bridgetalkback.letters.dto.response;

import com.ssafy.bridgetalkback.letters.domain.Letters;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record LettersTextResponseDto(

        Long lettersId,
        String lettersTranslationContent,
        LocalDateTime lettersRegDate

) {
    public static LettersTextResponseDto of(Letters letters) {
        return LettersTextResponseDto.builder()
                .lettersId(letters.getLettersId())
                .lettersTranslationContent(letters.getLettersTranslationContent())
                .lettersRegDate(letters.getCreatedAt())
                .build();
    }

}
