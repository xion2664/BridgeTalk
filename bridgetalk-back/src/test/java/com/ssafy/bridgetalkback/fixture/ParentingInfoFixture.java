package com.ssafy.bridgetalkback.fixture;

import com.ssafy.bridgetalkback.parentingInfo.domain.Category;
import com.ssafy.bridgetalkback.parentingInfo.domain.ParentingInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ParentingInfoFixture {
    PARENTINGINFO_01("title_kor1", "title_viet1", "content_kor1", "content_viet1","link1", Category.PROSPECTIVE),
    PARENTINGINFO_02("title_kor2", "title_viet2", "content_kor2", "content_viet2", "link2", Category.PROSPECTIVE),
    PARENTINGINFO_03("title_kor3", "title_viet3", "content_kor3", "content_viet3", "link3", Category.PROSPECTIVE),
    PARENTINGINFO_04("title_kor4", "title_viet4", "content_kor4", "content_viet4", "link4", Category.PROSPECTIVE),
    PARENTINGINFO_05("title_kor5", "title_viet5", "content_kor5", "content_viet5", "link5", Category.PROSPECTIVE),
    PARENTINGINFO_06("title_kor6", "title_viet6", "content_kor6", "content_viet6", "link6", Category.PROSPECTIVE)

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
