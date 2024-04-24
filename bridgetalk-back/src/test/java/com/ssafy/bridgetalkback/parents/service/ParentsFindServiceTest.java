package com.ssafy.bridgetalkback.parents.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.parents.exception.ParentsErrorCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("Member [Service Layer] -> MemberFindService 테스트")
public class ParentsFindServiceTest extends ServiceTest {
    @Autowired
    private ParentsFindService parentsFindService;

    private Parents parents;

    @BeforeEach
    void setup() {
        parents = parentsRepository.save(SUNKYOUNG.toParents());
    }

    @Test
    @DisplayName("ID(PK)로 부모를 조회한다")
    void findById() {
        // when
        Parents findParents = parentsFindService.findById(parents.getUuid());
        UUID inVaildUuid = UUID.randomUUID();

        // then
        assertThatThrownBy(() -> parentsFindService.findById(inVaildUuid))
                .isInstanceOf(BaseException.class)
                .hasMessage(ParentsErrorCode.PARENTS_NOT_FOUND.getMessage());

        assertThat(findParents).isEqualTo(parents);
    }
}
