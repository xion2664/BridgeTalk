package com.ssafy.bridgetalkback.auth.controller;

import com.ssafy.bridgetalkback.auth.dto.ParentsSignupRequestDto;
import com.ssafy.bridgetalkback.auth.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Auth", description = "AuthApiController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody ParentsSignupRequestDto requestDto) {
        log.info("{ AuthController } : 회원가입 진입");
        authService.signup(requestDto);
        return ResponseEntity.ok().build();
    }
}
