package com.ssafy.bridgetalkback.auth.controller;

import com.ssafy.bridgetalkback.auth.dto.request.KidsSignupRequestDto;
import com.ssafy.bridgetalkback.auth.dto.request.LoginRequestDto;
import com.ssafy.bridgetalkback.auth.dto.request.ParentsSignupRequestDto;
import com.ssafy.bridgetalkback.auth.dto.response.LoginResponseDto;
import com.ssafy.bridgetalkback.auth.service.AuthService;
import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@Tag(name = "Auth", description = "AuthApiController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody ParentsSignupRequestDto requestDto) {
        log.info("{ AuthController } : 부모 회원가입 진입");
        authService.signup(requestDto);
        log.info("{ AuthService } : 부모 회원가입 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto requestDto) {
        log.info("{ AuthController } : 부모로그인 진입");
        LoginResponseDto loginResponseDto = authService.login(requestDto);
        log.info("{ AuthService } : 부모로그인 성공");
        return ResponseEntity.ok(loginResponseDto);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@ExtractPayload String userId) {
        log.info("{ AuthController } : 로그아웃 진입");
        authService.logout(UUID.fromString(userId));
        log.info("{ AuthService } : 로그아웃 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/kids")
    public ResponseEntity<Void> kidsSignup(@RequestBody KidsSignupRequestDto requestDto) {
        log.info("{ AuthController } : 아이 회원가입 (프로필 추가) 진입");
        authService.kidsSignup(requestDto);
        log.info("{ AuthService } : 아이 회원가입 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/profileLogin/{profileId}")
    public ResponseEntity<LoginResponseDto> profileLogin(@ExtractPayload String userId, @PathVariable String profileId) {
        log.info("{ AuthController } : 프로필 선택 (로그인) 진입");
        LoginResponseDto loginResponseDto = authService.profileLogin(UUID.fromString(profileId));
        log.info("{ AuthService } : 프로필 선택 (로그인) 성공");
        return ResponseEntity.ok(loginResponseDto);
    }
}
