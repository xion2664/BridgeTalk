package com.ssafy.bridgetalkback.auth.service;

import com.ssafy.bridgetalkback.auth.dto.ParentsSignupRequestDto;
import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.domain.Email;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.domain.Password;
import com.ssafy.bridgetalkback.parents.repository.ParentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static com.ssafy.bridgetalkback.global.utils.PasswordEncoderUtils.ENCODER;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
    private final ParentsRepository parentsRepository;

    @Transactional
    public UUID signup(ParentsSignupRequestDto requestDto) {
        DuplicateEmail(requestDto.parentsEmail());

        Parents parents = Parents.createParents(requestDto.parentsName(), Email.from(requestDto.parentsEmail()),
                Password.encrypt(requestDto.parentsPassword(), ENCODER), requestDto.parentsNickname(), requestDto.parentsDino());

        return parentsRepository.save(parents).getUuid();
    }

    public void DuplicateEmail(String email) {
        // 기존 이메일 가입한 경우 재가입 불가
        if(parentsRepository.existsParentsByParentsEmail(Email.from(email))) {
            throw BaseException.type(AuthErrorCode.DUPLICATE_EMAIL);
        }
    }

}
