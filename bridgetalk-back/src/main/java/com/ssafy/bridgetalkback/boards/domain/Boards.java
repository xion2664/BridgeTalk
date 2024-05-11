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

    @Column(columnDefinition = "TEXT", nullable = false)
    private String boardsContent;

    @OneToMany(mappedBy = "boards", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> commentsList = new ArrayList<>();

    private Boards(Reports reports, Parents parents, String boardsContent) {
        this.reports = reports;
        this.parents = parents;
        this.boardsContent = boardsContent;
    }

    public static Boards createBoards(Reports reports, Parents parents, String boardsContent) {
        return new Boards(reports, parents, boardsContent);
    }
}
