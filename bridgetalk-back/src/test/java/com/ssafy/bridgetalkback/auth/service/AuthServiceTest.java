package com.ssafy.bridgetalkback.auth.service;

import com.ssafy.bridgetalkback.auth.domain.RefreshToken;
import com.ssafy.bridgetalkback.auth.dto.*;
import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.auth.utils.JwtProvider;
import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.kids.service.KidsFindService;
import com.ssafy.bridgetalkback.parents.domain.Email;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.domain.Role;
import com.ssafy.bridgetalkback.parents.service.ParentsFindService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.UUID;

import static com.ssafy.bridgetalkback.fixture.KidsFixture.JIYEONG;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SOYOUNG;
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

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private KidsFindService kidsFindService;

    private Parents parents;
    private Kids kids;

    @BeforeEach
    void setup() {
        parents = parentsRepository.save(SOYOUNG.toParents());
        kids = kidsRepository.save(JIYEONG.toKids(parents));
    }

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
            Parents newParents = parentsFindService.findParentsByUuidAndIsDeleted(parentsId);
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

    @Nested
    @DisplayName("로그인")
    class login {

        @Test
        @DisplayName("비밀번호가 일치하지 않으면 로그인에 실패한다")
        void throwExceptionByWrongPassword() {
            // when - then
            assertThatThrownBy(() -> authService.login(createWrongLoginRequestDto()))
                    .isInstanceOf(BaseException.class)
                    .hasMessage(AuthErrorCode.WRONG_PASSWORD.getMessage());
        }

        @Test
        @DisplayName("로그인에 성공한다")
        void success() {
            // when
            LoginResponseDto loginResponseDto = authService.login(createLoginRequestDto());

            // then
            Assertions.assertAll(
                    () -> assertThat(loginResponseDto.userId()).isEqualTo(String.valueOf(parents.getUuid())),
                    () -> assertThat(loginResponseDto.userName()).isEqualTo(parents.getParentsName()),
                    () -> assertThat(loginResponseDto.userEmail()).isEqualTo(parents.getParentsEmail().getValue()),
                    () -> assertThat(loginResponseDto.userNickname()).isEqualTo(parents.getParentsNickname()),
                    () -> assertThat(loginResponseDto.userDino()).isEqualTo(parents.getParentsDino()),
                    () -> assertThat(jwtProvider.getId(loginResponseDto.accessToken())).isEqualTo(String.valueOf(parents.getUuid())),
                    () -> assertThat(jwtProvider.getId(loginResponseDto.refreshToken())).isEqualTo(String.valueOf(parents.getUuid())),
                    () -> {
                        RefreshToken findRefreshToken = refreshTokenRedisRepository.findById(parents.getUuid()).orElseThrow();
                        assertThat(findRefreshToken.getRefreshToken()).isEqualTo(loginResponseDto.refreshToken());
                    }
            );
        }
    }

    @Nested
    @DisplayName("로그아웃")
    class logout {
        @Test
        @DisplayName("로그아웃에 성공한다")
        void success() {
            // given
            authService.login(createLoginRequestDto());

            // when
            authService.logout(parents.getUuid());

            // then
            Optional<RefreshToken> findToken = refreshTokenRedisRepository.findById(parents.getUuid());
            assertThat(findToken).isEmpty();
        }
    }

    @Nested
    @DisplayName("아이 회원가입")
    class kidsSignup {
        @Test
        @DisplayName("아이 회원가입에 성공한다")
        void success() {
            // when
            UUID kidsId = authService.kidsSignup(createKidsSingupRequestDto());

            // when - then
            Kids newKids = kidsFindService.findKidsByUuidAndIsDeleted(kidsId);
            Assertions.assertAll(
                    () -> assertThat(newKids.getUuid()).isEqualTo(kidsId),
                    () -> assertThat(newKids.getKidsName()).isEqualTo(JIYEONG.getKidsName()),
                    () -> assertThat(newKids.getKidsEmail()).isNotNull(),
                    () -> assertThat(newKids.getKidsNickname()).isEqualTo(JIYEONG.getKidsNickname()),
                    () -> assertThat(newKids.getKidsDino()).isEqualTo(JIYEONG.getKidsDino()),
                    () -> assertThat(newKids.getIsDeleted()).isEqualTo(0),
                    () -> assertThat(newKids.getRole()).isEqualTo(Role.USER),
                    () -> assertThat(newKids.getParents()).isEqualTo(parents)
            );
        }
    }

    @Nested
    @DisplayName("프로필 선택 (로그인)")
    class profileLogin {
        @Test
        @DisplayName("프로필 선택 (로그인)에 성공한다")
        void success() {
            // when
            LoginResponseDto parentsLoginResponseDto = authService.profileLogin(parents.getUuid());
            LoginResponseDto kidsLoginResponseDto = authService.profileLogin(kids.getUuid());

            // when - then
            Assertions.assertAll(
                    () -> assertThat(parentsLoginResponseDto.userId()).isEqualTo(String.valueOf(parents.getUuid())),
                    () -> assertThat(parentsLoginResponseDto.userName()).isEqualTo(parents.getParentsName()),
                    () -> assertThat(parentsLoginResponseDto.userEmail()).isEqualTo(parents.getParentsEmail().getValue()),
                    () -> assertThat(parentsLoginResponseDto.userNickname()).isEqualTo(parents.getParentsNickname()),
                    () -> assertThat(parentsLoginResponseDto.userDino()).isEqualTo(parents.getParentsDino()),
                    () -> assertThat(jwtProvider.getId(parentsLoginResponseDto.accessToken())).isEqualTo(String.valueOf(parents.getUuid())),
                    () -> assertThat(jwtProvider.getId(parentsLoginResponseDto.refreshToken())).isEqualTo(String.valueOf(parents.getUuid())),
                    () -> {
                        RefreshToken findRefreshToken = refreshTokenRedisRepository.findById(parents.getUuid()).orElseThrow();
                        assertThat(findRefreshToken.getRefreshToken()).isEqualTo(parentsLoginResponseDto.refreshToken());
                    },
                    () -> assertThat(kidsLoginResponseDto.userId()).isEqualTo(String.valueOf(kids.getUuid())),
                    () -> assertThat(kidsLoginResponseDto.userName()).isEqualTo(kids.getKidsName()),
                    () -> assertThat(kidsLoginResponseDto.userEmail()).isEqualTo(kids.getKidsEmail()),
                    () -> assertThat(kidsLoginResponseDto.userNickname()).isEqualTo(kids.getKidsNickname()),
                    () -> assertThat(kidsLoginResponseDto.userDino()).isEqualTo(kids.getKidsDino()),
                    () -> assertThat(jwtProvider.getId(kidsLoginResponseDto.accessToken())).isEqualTo(String.valueOf(kids.getUuid())),
                    () -> assertThat(jwtProvider.getId(kidsLoginResponseDto.refreshToken())).isEqualTo(String.valueOf(kids.getUuid())),
                    () -> {
                        RefreshToken findRefreshToken = refreshTokenRedisRepository.findById(kids.getUuid()).orElseThrow();
                        assertThat(findRefreshToken.getRefreshToken()).isEqualTo(kidsLoginResponseDto.refreshToken());
                    }
            );
        }
    }

    private ParentsSignupRequestDto createParentsSignupRequestDto() {
        return new ParentsSignupRequestDto(SUNKYOUNG.getParentsEmail(), SUNKYOUNG.getParentsPassword(), SUNKYOUNG.getParentsName(),
                SUNKYOUNG.getParentsNickname(), SUNKYOUNG.getParentsDino());
    }

    private LoginRequestDto createLoginRequestDto() {
        return new LoginRequestDto(SOYOUNG.getParentsEmail(), SOYOUNG.getParentsPassword());
    }

    private LoginRequestDto createWrongLoginRequestDto() {
        return new LoginRequestDto(SOYOUNG.getParentsEmail(), "wrong"+SOYOUNG.getParentsPassword());
    }

    private KidsSingupRequestDto createKidsSingupRequestDto() {
        return new KidsSingupRequestDto(String.valueOf(parents.getUuid()), JIYEONG.getKidsName(), JIYEONG.getKidsNickname(), JIYEONG.getKidsDino());
    }
}
