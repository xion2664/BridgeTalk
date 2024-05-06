package com.ssafy.bridgetalkback.parents.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.parents.dto.request.UpdateProfileRequestDto;
import com.ssafy.bridgetalkback.parents.service.ProfileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@Tag(name = "Profile", description = "ProfileController")@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService profileService;

    @PatchMapping("/{profileId}")
    public ResponseEntity<Void> updateProfile(@ExtractPayload String userId, @PathVariable String profileId,
                                              @RequestBody UpdateProfileRequestDto requestDto) {
        log.info("{ ProfileController } : 프로필 수정 진입");

        profileService.updateProfile(UUID.fromString(profileId), requestDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<Void> deleteProfile(@ExtractPayload String userId, @PathVariable String profileId) {
        log.info("{ ProfileController } : 프로필 삭제 진입");

        profileService.deleteProfile(UUID.fromString(profileId));
        return ResponseEntity.ok().build();
    }
}
