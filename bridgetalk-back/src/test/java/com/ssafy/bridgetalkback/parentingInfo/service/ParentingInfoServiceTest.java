package com.ssafy.bridgetalkback.parentingInfo.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.parentingInfo.domain.ParentingInfo;
import com.ssafy.bridgetalkback.parentingInfo.dto.response.ParentingInfoResponseDto;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;

import static com.ssafy.bridgetalkback.fixture.ParentingInfoFixture.PARENTINGINFO_01;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("ParentingInfo [Service Layer] -> ParentingInfoService 테스트")
public class ParentingInfoServiceTest extends ServiceTest {
    @Autowired
    private ParentingInfoService parentingInfoService;

    @Autowired
    private ParentingInfoFindService parentingInfoFindService;

    private ParentingInfo parentingInfo;

    @BeforeEach
    void setup() {
        parentingInfo = parentingInfoRepository.save(PARENTINGINFO_01.toParentingInfo());
    }

    @Test
    @DisplayName("육아정보 등록에 성공한다")
    void createParentingInfo() {
        // given
        Long parentingInfoId = parentingInfoService.createParentingInfo(PARENTINGINFO_01.getTitle_kor(), PARENTINGINFO_01.getTitle_viet(),
                PARENTINGINFO_01.getContent_kor(), PARENTINGINFO_01.getContent_viet(), PARENTINGINFO_01.getLink(), PARENTINGINFO_01.getCategory());

        // when - then
        ParentingInfo newParentingInfo = parentingInfoFindService.findParentingInfoByParentingInfoIdAndIsDeleted(parentingInfoId);
        Assertions.assertAll(
                () -> assertThat(newParentingInfo.getParentingInfoId()).isEqualTo(parentingInfoId),
                () -> assertThat(newParentingInfo.getTitle_kor()).isEqualTo(PARENTINGINFO_01.getTitle_kor()),
                () -> assertThat(newParentingInfo.getTitle_viet()).isEqualTo(PARENTINGINFO_01.getTitle_viet()),
                () -> assertThat(newParentingInfo.getContent_kor()).isEqualTo(PARENTINGINFO_01.getContent_kor()),
                () -> assertThat(newParentingInfo.getContent_viet()).isEqualTo(PARENTINGINFO_01.getContent_viet()),
                () -> assertThat(newParentingInfo.getLink()).isEqualTo(PARENTINGINFO_01.getLink()),
                () -> assertThat(newParentingInfo.getCategory()).isEqualTo(PARENTINGINFO_01.getCategory()),
                () -> assertThat(newParentingInfo.getIsDeleted()).isEqualTo(0)
        );
    }

    @Nested
    @DisplayName("육아정보 상세조회에 성공한다")
    class parentingInfoDetail {
        @Test
        @DisplayName("(한국어) 육아정보 상세조회에 성공한다")
        void successKorean() {
            // given
            ParentingInfoResponseDto responseDto = parentingInfoService.getParentingInfoDetail(parentingInfo.getParentingInfoId(), Language.kor);

            // when - then
            Assertions.assertAll(
                    () -> assertThat(responseDto.parentingInfoId()).isEqualTo(parentingInfo.getParentingInfoId()),
                    () -> assertThat(responseDto.title()).isEqualTo(parentingInfo.getTitle_kor()),
                    () -> assertThat(responseDto.content()).isEqualTo(parentingInfo.getContent_kor()),
                    () -> assertThat(responseDto.link()).isEqualTo(parentingInfo.getLink()),
                    () -> assertThat(responseDto.category()).isEqualTo(parentingInfo.getCategory().getValue())
            );
        }

        @Test
        @DisplayName("(베트남어) 육아정보 상세조회에 성공한다")
        void successVietnam() {
            // given
            ParentingInfoResponseDto responseDto = parentingInfoService.getParentingInfoDetail(parentingInfo.getParentingInfoId(), Language.viet);

            // when - then
            Assertions.assertAll(
                    () -> assertThat(responseDto.parentingInfoId()).isEqualTo(parentingInfo.getParentingInfoId()),
                    () -> assertThat(responseDto.title()).isEqualTo(parentingInfo.getTitle_viet()),
                    () -> assertThat(responseDto.content()).isEqualTo(parentingInfo.getContent_viet()),
                    () -> assertThat(responseDto.link()).isEqualTo(parentingInfo.getLink()),
                    () -> assertThat(responseDto.category()).isEqualTo(parentingInfo.getCategory().getValue())
            );
        }
    }
}
