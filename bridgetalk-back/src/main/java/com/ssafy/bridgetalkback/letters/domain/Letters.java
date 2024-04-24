package com.ssafy.bridgetalkback.letters.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.parent.domain.Parents;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
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

    @Column(nullable = false)
    private String lettersOriginalContent;

    @Column(nullable = false)
    private String lettersTranslationContent;

    @Column(nullable = false)
    private int isChecked;


}
