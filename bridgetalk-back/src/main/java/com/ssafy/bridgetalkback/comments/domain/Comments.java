package com.ssafy.bridgetalkback.comments.domain;

import com.ssafy.bridgetalkback.boards.domain.Boards;
import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comments")
public class Comments extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parents_uuid")
    private Parents parents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boards_id")
    private Boards boards;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String commentsContent;

    private Comments(Parents parents, Boards boards, String commentsContent) {
        this.parents = parents;
        this.boards = boards;
        this.commentsContent = commentsContent;
    }

    public static Comments createComments(Parents parents, Boards boards, String commentsContent) {
        return new Comments(parents, boards, commentsContent);
    }
}
