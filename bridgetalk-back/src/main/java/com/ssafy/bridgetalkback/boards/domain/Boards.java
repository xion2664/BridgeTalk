package com.ssafy.bridgetalkback.boards.domain;

import com.ssafy.bridgetalkback.comments.domain.Comments;
import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "boards")
public class Boards extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardsId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reports_id")
    private Reports reports;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parents_uuid")
    private Parents parents;

    @Column(nullable = false, length = 100)
    private String boardsTitle_kor;

    @Column(nullable = false, length = 100)
    private String boardsTitle_viet;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String boardsContent_kor;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String boardsContent_viet;

    @Column(nullable = false)
    private int likes;

    @OneToMany(mappedBy = "boards", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> commentsList = new ArrayList<>();

    private Boards(Reports reports, Parents parents, String boardsTitle_kor, String boardsTitle_viet,
                   String boardsContent_kor, String boardsContent_viet) {
        this.reports = reports;
        this.parents = parents;
        this.boardsTitle_kor = boardsTitle_kor;
        this.boardsTitle_viet = boardsTitle_viet;
        this.boardsContent_kor = boardsContent_kor;
        this.boardsContent_viet = boardsContent_viet;
        this.likes = 0;
    }

    public static Boards createBoards(Reports reports, Parents parents, String boardsTitle_kor, String boardsTitle_viet,
                                      String boardsContent_kor, String boardsContent_viet) {
        return new Boards(reports, parents, boardsTitle_kor, boardsTitle_viet, boardsContent_kor, boardsContent_viet);
    }
}
