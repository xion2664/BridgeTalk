package com.ssafy.bridgetalkback.parentingInfo.dto.response;

import com.ssafy.bridgetalkback.parentingInfo.domain.ParentingInfo;
import lombok.Builder;

@Builder
public record ParentingInfoResponseDto(
        Long parentingInfoId,
        String title_kor,
        String title_viet,
        String content_kor,
        String content_viet,
        String link,
        String category
) {
    public static ParentingInfoResponseDto from(ParentingInfo parentingInfo) {
        return ParentingInfoResponseDto.builder()
                .parentingInfoId(parentingInfo.getParentingInfoId())
                .title_kor(parentingInfo.getTitle_kor())
                .title_viet(parentingInfo.getTitle_viet())
                .content_kor(parentingInfo.getContent_kor())
                .content_viet(parentingInfo.getContent_viet())
                .link(parentingInfo.getLink())
                .category(parentingInfo.getCategory().getValue())
                .build();
    }
}
