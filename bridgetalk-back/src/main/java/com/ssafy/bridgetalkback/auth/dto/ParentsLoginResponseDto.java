package com.ssafy.bridgetalkback.auth.dto;

import com.ssafy.bridgetalkback.parents.domain.Parents;
import lombok.Builder;

import java.util.UUID;

@Builder
public record ParentsLoginResponseDto(
    String userId,
    String userName,
    String userEmail,
    String userNickname,
    String userDino,
    String accessToken,
    String refreshToken
) {
    public static ParentsLoginResponseDto from(Parents parents, String accessToken, String refreshToken) {
        return ParentsLoginResponseDto.builder()
                .userId(String.valueOf(parents.getUuid()))
                .userName(parents.getParentsName())
                .userEmail(parents.getParentsEmail().getValue())
                .userNickname(parents.getParentsNickname())
                .userDino(parents.getParentsDino())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
