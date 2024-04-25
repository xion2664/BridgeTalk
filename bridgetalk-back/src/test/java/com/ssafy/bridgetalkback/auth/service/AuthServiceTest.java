package com.ssafy.bridgetalkback.auth.service;

import com.ssafy.bridgetalkback.auth.dto.ParentsSignupRequestDto;
import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.domain.Email;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.domain.Role;
import com.ssafy.bridgetalkback.parents.service.ParentsFindService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static com.ssafy.bridgetalkback.global.utils.PasswordEncoderUtils.ENCODER;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("Auth [Service Layer] -> AuthService 테스트")
public class AuthServiceTest extends ServiceTest {
    @Autowired
    private AuthService authService;

    @Autowired
    private ParentsFindService parentsFindService;

    @Nested
    @DisplayName("회원가입")
    class signup {
        @Test
        @DisplayName("중복된 이메일이면 회원가입에 실패한다")
        void throwExceptionByDuplicateEmail() {
            //given
            authService.signup(createParentsSignupRequestDto());

            // when - then
            assertThatThrownBy(() -> authService.signup(createParentsSignupRequestDto()))
                    .isInstanceOf(BaseException.class)
                    .hasMessage(AuthErrorCode.DUPLICATE_EMAIL.getMessage());
        }

        @Test
        @DisplayName("회원가입에 성공한다")
        void success() {
            // when
            UUID parentsId = authService.signup(createParentsSignupRequestDto());

            // when - then
            Parents newParents = parentsFindService.findByIdAndIsDeleted(parentsId);
            Assertions.assertAll(
                    () -> assertThat(newParents.getUuid()).isEqualTo(parentsId),
                    () -> assertThat(newParents.getParentsName()).isEqualTo(SUNKYOUNG.getParentsName()),
                    () -> assertThat(newParents.getParentsEmail().isSameEmail(Email.from(SUNKYOUNG.getParentsEmail()))).isTrue(),
                    () -> assertThat(newParents.getParentsPassword().isSamePassword(SUNKYOUNG.getParentsPassword(), ENCODER)).isTrue(),
                    () -> assertThat(newParents.getParentsNickname()).isEqualTo(SUNKYOUNG.getParentsNickname()),
                    () -> assertThat(newParents.getParentsDino()).isEqualTo(SUNKYOUNG.getParentsDino()),
                    () -> assertThat(newParents.getParentsActive()).isEqualTo(0),
                    () -> assertThat(newParents.getIsDeleted()).isEqualTo(0),
                    () -> assertThat(newParents.getRole()).isEqualTo(Role.USER)
            );
        }
    }

    private ParentsSignupRequestDto createParentsSignupRequestDto() {
        return new ParentsSignupRequestDto(SUNKYOUNG.getParentsEmail(), SUNKYOUNG.getParentsPassword(), SUNKYOUNG.getParentsName(),
                SUNKYOUNG.getParentsNickname(), SUNKYOUNG.getParentsDino());
    }
}
