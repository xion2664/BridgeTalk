package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.parentingInfo.domain.Category;
import com.ssafy.bridgetalkback.parentingInfo.domain.ParentingInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ParentingInfoFixture {
    PARENTINGINFO_01("title_kor1", "title_viet1", "content_kor1", "content_viet1","link1", Category.PROSPECTIVE),
    PARENTINGINFO_02("title_kor2", "title_viet2", "content_kor2", "content_viet2", "link2", Category.PROSPECTIVE)
    ;

    private final String title_kor;
    private final String title_viet;
    private final String content_kor;
    private final String content_viet;
    private final String link;
    private final Category category;

    public ParentingInfo toParentingInfo() {
        return ParentingInfo.createParentingInfo(title_kor, title_viet, content_kor, content_viet, link, category);
    }
}
