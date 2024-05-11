package com.ssafy.bridgetalkback.parentingInfo.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.parentingInfo.domain.Age;
import com.ssafy.bridgetalkback.parentingInfo.domain.BoardNum;
import com.ssafy.bridgetalkback.parentingInfo.dto.ParentingInfoCrawlingDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("ParentingInfoCrawling [Service Layer] -> ParentingInfoCrawling 테스트")
public class ParentingInfoCrawlingServiceTest extends ServiceTest {
    @Autowired
    private ParentingInfoCrawlingService parentingInfoCrawlingService;

    private List<String> urlList;

    @BeforeEach
    void setup() {
        boardNumRepository.save(BoardNum.createBoardNum("707973", Age.PROSPECTIVE));
        urlList = new ArrayList<>();
        urlList.add("https://www.mogef.go.kr/kps/olb/kps_olb_s001d.do?mid=mda753&div1=mda75301&cd=kps&bbtSn=707973");
    }

    @Test
    @DisplayName("urlList에 있는 페이지로부터 육아 정보를 크롤링한다")
    void parentingInfoCrawlingList() throws Exception {
        // when
        ParentingInfoCrawlingDto parentingInfoCrawlingDto = parentingInfoCrawlingService.parentingInfoCrawling(urlList.get(0), Age.PROSPECTIVE);

        // then
        Assertions.assertAll(
                () -> assertThat(parentingInfoCrawlingDto.title_kor()).isEqualTo("좋은 부모의 조건: 높은 자존감과 건강한 의사소통"),
                () -> assertThat(parentingInfoCrawlingDto.title_viet()).isNotNull(),
                () -> assertThat(parentingInfoCrawlingDto.content_kor()).isNotNull(),
                () -> assertThat(parentingInfoCrawlingDto.content_viet()).isNotNull(),
                () -> assertThat(parentingInfoCrawlingDto.url()).isEqualTo(urlList.get(0)),
                () -> assertThat(parentingInfoCrawlingDto.age()).isEqualTo(Age.PROSPECTIVE)
        );
    }

    @Test
    @DisplayName("글번호로부터 urlList를 생성한다")
    void createUrlList() {
        // when
        List<String> urlList = parentingInfoCrawlingService.createUrlList("75301", Age.PROSPECTIVE);

        // then
        Assertions.assertAll(
                () -> assertThat(urlList.size()).isEqualTo(1),
                () -> assertThat(urlList.get(0)).isEqualTo("https://www.mogef.go.kr/kps/olb/kps_olb_s001d.do?mid=mda753&div1=mda75301&cd=kps&bbtSn=707973")
        );
    }
}
