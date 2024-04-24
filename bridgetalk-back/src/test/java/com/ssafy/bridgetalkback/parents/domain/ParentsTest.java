package com.ssafy.bridgetalkback.parents.domain;

import com.ssafy.bridgetalkback.parent.domain.Parents;
import com.ssafy.bridgetalkback.parent.domain.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("Parents 도메인 테스트")
public class ParentsTest {
    @Test
    @DisplayName("Parents 생성에 성공한다")
    void success() {
        Parents parents = SUNKYOUNG.toParents();

        assertAll(
                () -> assertThat(parents.getUuid()).isNotNull(),
                () -> assertThat(parents.getParentsName()).isEqualTo(SUNKYOUNG.getParentsName()),
                () -> assertThat(parents.getParentsEmail()).isEqualTo(SUNKYOUNG.getParentsEmail()),
                () -> assertThat(parents.getParentsPassword()).isEqualTo(SUNKYOUNG.getParentsPassword()),
                () -> assertThat(parents.getParentsNickname()).isEqualTo(SUNKYOUNG.getParentsNickname()),
                () -> assertThat(parents.getParentsDino()).isEqualTo(SUNKYOUNG.getParentsDino()),
                () -> assertThat(parents.getParentsActive()).isEqualTo(0),
                () -> assertThat(parents.getIsDeleted()).isEqualTo(0),
                () -> assertThat(parents.getRole()).isEqualTo(Role.USER)
        );
    }
}