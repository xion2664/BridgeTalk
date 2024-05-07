package com.ssafy.bridgetalkback.slang.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "slang")
public class Slang extends BaseEntity {

    @Id
    @GeneratedValue
    private Long slangId;

    private String slangWord;

    private String originalWord;

    private String meaning;

    private String vietnamesePronunciation;

    private String vietnameseTranslation;

    private Slang(String slangWord, String originalWord, String meaning, String vietnamesePronunciation, String vietnameseTranslation) {
        this.slangWord = slangWord;
        this.originalWord = originalWord;
        this.meaning = meaning;
        this.vietnamesePronunciation = vietnamesePronunciation;
        this.vietnameseTranslation = vietnameseTranslation;
    }

    public static Slang createSlang(String slangWord, String originalWord, String meaning, String vietnamesePronunciation, String vietnameseTranslation) {
        return new Slang(slangWord, originalWord, meaning, vietnamesePronunciation, vietnameseTranslation);
    }
}
