package com.ssafy.bridgetalkback.parents.service;

import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.auth.service.TokenService;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import com.ssafy.bridgetalkback.kids.service.KidsFindService;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.dto.UpdateProfileRequestDto;
import com.ssafy.bridgetalkback.parents.repository.ParentsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {
    private final ParentsRepository parentsRepository;
    private final KidsRepository kidsRepository;
    private final ParentsFindService parentsFindService;
    private final KidsFindService kidsFindService;
    private final TokenService tokenService;

    @Transactional
    public void updateProfile(UUID profileId, UpdateProfileRequestDto requestDto) {

        if(parentsRepository.existsParentsByUuidAndIsDeleted(profileId, 0)){
            log.info("{ ProfileService } : 부모 측 - 프로필 수정");
            Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(profileId);
            parents.updateProfile(requestDto.nickname(), requestDto.dino());
            log.info("{ ProfileService } : 부모 측 - 프로필 수정 성공");
        }
        else if(kidsRepository.existsKidsByUuidAndIsDeleted(profileId, 0)) {
            log.info("{ ProfileService } : 아이 측 - 프로필 수정");
            Kids kids = kidsFindService.findKidsByUuidAndIsDeleted(profileId);
            kids.updateProfile(requestDto.nickname(), requestDto.dino());
            log.info("{ ProfileService } : 아이 측 - 프로필 수정 성공");
        }
        else throw BaseException.type(AuthErrorCode.USER_NOT_FOUND);
    }

    @Transactional
    public void deleteProfile(UUID profileId) {
        if(parentsRepository.existsParentsByUuidAndIsDeleted(profileId, 0)){
            log.info("{ ProfileService } : 부모 측 - 프로필 삭제");
            Parents parents = parentsFindService.findParentsByUuidAndIsDeleted(profileId);
            parents.updateIsDeleted();
            tokenService.deleteRefreshTokenByUserId(profileId);
            log.info("{ ProfileService } : 부모 측 - RefreshToken 삭제");

            List<Kids> kidsList = parents.getKidsList();
            for(Kids kids : kidsList) {
                kids.updateIsDeleted();
                tokenService.deleteRefreshTokenByUserId(kids.getUuid());
            }
            log.info("{ ProfileService } : 부모 측 - 부모의 아이들 프로필 및 RefreshToken 삭제");
        }
        else if(kidsRepository.existsKidsByUuidAndIsDeleted(profileId, 0)) {
            log.info("{ ProfileService } : 아이 측 - 프로필 삭제");
            Kids kids = kidsFindService.findKidsByUuidAndIsDeleted(profileId);
            kids.updateIsDeleted();
            tokenService.deleteRefreshTokenByUserId(profileId);
            log.info("{ ProfileService } : 아이 측 - RefreshToken 삭제");
        }
        else throw BaseException.type(AuthErrorCode.USER_NOT_FOUND);
    }
}
