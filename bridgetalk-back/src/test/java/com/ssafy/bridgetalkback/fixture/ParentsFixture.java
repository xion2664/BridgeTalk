package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.parent.domain.Parents;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ParentsFixture {
    SUNKYOUNG("윤선경", "ssafy123@gmail.com", "ssafy123", "닉네임", "D1");

    private final String parentsName;
    private final String parentsEmail;
    private final String parentsPassword;
    private final String parentsNickname;
    private final String parentsDino;

    public Parents toParents() {
        return Parents.createParents(parentsName, parentsEmail, parentsPassword, parentsNickname, parentsDino);
    }
}
