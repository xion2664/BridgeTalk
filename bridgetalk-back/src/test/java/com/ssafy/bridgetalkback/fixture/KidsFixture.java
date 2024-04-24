package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.kid.domain.Kids;
import com.ssafy.bridgetalkback.parent.domain.Parents;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum KidsFixture {
    JIYEONG("이지영", "btasdfsdfsdf@bridgetalk.co.kr", "닉네임", "D1");

    private final String kidsName;
    private final String kidsEmail;
    private final String kidsNickname;
    private final String kidsDino;

    public Kids toKids(Parents parents) {
        return Kids.createKids(parents, kidsName, kidsEmail, kidsNickname, kidsDino);
    }
}
