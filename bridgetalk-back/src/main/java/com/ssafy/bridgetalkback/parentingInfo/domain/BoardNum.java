package com.ssafy.bridgetalkback.parentingInfo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name="board_num")
public class BoardNum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardNumId;

    @Column(nullable = false, length = 10)
    private String num;

    @Convert(converter = Age.AgeConverter.class)
    @Column(nullable = false, length = 20)
    private Age age;

    private BoardNum(String num, Age age) {
        this.num = num;
        this.age = age;
    }

    public static BoardNum createBoardNum(String num, Age age) {
        return new BoardNum(num, age);
    }
}
