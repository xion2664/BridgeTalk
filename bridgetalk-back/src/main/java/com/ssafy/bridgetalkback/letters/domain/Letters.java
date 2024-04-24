package com.ssafy.bridgetalkback.letters.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.parent.domain.Parents;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
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


}
