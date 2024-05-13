package com.ssafy.bridgetalkback.parentingInfo.dto.response;

import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.parentingInfo.domain.ParentingInfo;
import lombok.Builder;

@Builder
public record ParentingInfoResponseDto(
        Long parentingInfoId,
        String title,
        String content,
        String link,
        String category
) {
    public static ParentingInfoResponseDto from(ParentingInfo parentingInfo, Language language) {
        return ParentingInfoResponseDto.builder()
                .parentingInfoId(parentingInfo.getParentingInfoId())
                .title(language.equals(Language.kor) ? parentingInfo.getTitle_kor() : parentingInfo.getTitle_viet())
                .content(language.equals(Language.kor) ? parentingInfo.getContent_kor() : parentingInfo.getContent_viet())
                .link(parentingInfo.getLink())
                .category(parentingInfo.getCategory().getValue())
                .build();
    }
}
