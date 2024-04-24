package com.ssafy.bridgetalkback.letters.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.parent.domain.Parents;
import com.ssafy.bridgetalkback.parent.domain.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="letters")
public class Letters extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lettersId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parents_uuid", referencedColumnName = "parents_uuid")
    private Parents parents;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String lettersOriginalContent;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String lettersTranslationContent;

    @Column(columnDefinition = "integer default 0")
    private int isChecked;

    private Letters(Parents parents, String lettersOriginalContent, String lettersTranslationContent) {
        this.parents = parents;
        this.lettersOriginalContent = lettersOriginalContent;
        this.lettersTranslationContent = lettersTranslationContent;
    }

    public static Letters createLetters(Parents parents, String lettersOriginalContent, String lettersTranslationContent) {
        return new Letters(parents, lettersOriginalContent, lettersTranslationContent);
    }


}
