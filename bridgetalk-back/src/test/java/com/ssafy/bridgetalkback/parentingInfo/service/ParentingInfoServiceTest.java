package com.ssafy.bridgetalkback.parentingInfo.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.parentingInfo.domain.ParentingInfo;
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

    @Test
    @DisplayName("육아정보 등록에 성공한다")
    void success() {
        // given
        Long parentingInfoId = parentingInfoService.createParentingInfo(PARENTINGINFO_01.getTitle_kor(), PARENTINGINFO_01.getTitle_viet(),
                PARENTINGINFO_01.getContent_kor(), PARENTINGINFO_01.getContent_viet(), PARENTINGINFO_01.getLink(), PARENTINGINFO_01.getAge());

        // when - then
        ParentingInfo newParentingInfo = parentingInfoFindService.findParentingInfoByParentingInfoIdAndIsDeleted(parentingInfoId);
        Assertions.assertAll(
                () -> assertThat(newParentingInfo.getParentingInfoId()).isEqualTo(parentingInfoId),
                () -> assertThat(newParentingInfo.getTitle_kor()).isEqualTo(PARENTINGINFO_01.getTitle_kor()),
                () -> assertThat(newParentingInfo.getTitle_viet()).isEqualTo(PARENTINGINFO_01.getTitle_viet()),
                () -> assertThat(newParentingInfo.getContent_kor()).isEqualTo(PARENTINGINFO_01.getContent_kor()),
                () -> assertThat(newParentingInfo.getContent_viet()).isEqualTo(PARENTINGINFO_01.getContent_viet()),
                () -> assertThat(newParentingInfo.getLink()).isEqualTo(PARENTINGINFO_01.getLink()),
                () -> assertThat(newParentingInfo.getAge()).isEqualTo(PARENTINGINFO_01.getAge()),
                () -> assertThat(newParentingInfo.getIsDeleted()).isEqualTo(0)
        );
    }
}
