package com.ssafy.bridgetalkback.auth.dto.request;

import com.ssafy.bridgetalkback.global.Language;
import jakarta.validation.constraints.NotBlank;

public record ParentsSignupRequestDto(
        @NotBlank(message = "이메일은 필수입니다.")
        String parentsEmail,
        @NotBlank(message = "비밀번호는 필수입니다.")
        String parentsPassword,
        @NotBlank(message = "이름은 필수입니다.")
        String parentsName,
        @NotBlank(message = "닉네임은 필수입니다.")
        String parentsNickname,
        @NotBlank(message = "공룡번호는 필수입니다.")
        String parentsDino,
        Language language
) {
}
