package com.ssafy.bridgetalkback.parentingInfo.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name="parenting_info")
public class ParentingInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parentingInfoId;

    @Column(nullable = false)
    private String title_kor;

    @Column(nullable = false)
    private String title_viet;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content_kor;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content_viet;

    @Column(nullable = false, length = 300)
    private String link;

    @Convert(converter = Category.AgeConverter.class)
    @Column(nullable = false, length = 20)
    private Category age;

    private ParentingInfo(String title_kor, String title_viet, String content_kor, String content_viet, String link, Category age) {
        this.title_kor = title_kor;
        this.title_viet = title_viet;
        this.content_kor = content_kor;
        this.content_viet = content_viet;
        this.link = link;
        this.age = age;
    }

    public static ParentingInfo createParentingInfo(String title_kor, String title_viet, String content_kor, String content_viet,
                                                    String link, Category age) {
        return new ParentingInfo(title_kor, title_viet, content_kor, content_viet, link, age);
    }

    public void updateParentInfo(String title_kor, String title_viet, String content_kor, String content_viet,
                                 String link) {
        this.title_kor = title_kor;
        this.title_viet = title_viet;
        this.content_kor = content_kor;
        this.content_viet = content_viet;
        this.link = link;
    }
}
