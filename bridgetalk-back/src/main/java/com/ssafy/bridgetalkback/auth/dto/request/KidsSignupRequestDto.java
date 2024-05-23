package com.ssafy.bridgetalkback.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record KidsSignupRequestDto(
        @NotBlank(message = "부모Id는 필수입니다.")
        String parentsId,
        @NotBlank(message = "이름은 필수입니다.")
        String kidsName,
        @NotBlank(message = "닉네임은 필수입니다.")
        String kidsNickname,
        @NotBlank(message = "공룡번호는 필수입니다.")
        String kidsDino,
        @NotBlank(message = "비밀번호는 필수입니다.")
        String kidsPassword
) {
}
