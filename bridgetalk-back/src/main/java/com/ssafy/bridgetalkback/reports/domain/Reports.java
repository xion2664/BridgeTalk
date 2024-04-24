package com.ssafy.bridgetalkback.reports.domain;

import com.ssafy.bridgetalkback.kid.domain.Kids;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reports")
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long reportsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kids_id", referencedColumnName = "kids_id")
    private Kids kids;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String reportsOriginContent;

    @Column(columnDefinition = "TEXT")
    private String reportsSummary;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> reportsKeywords;

    @Column(columnDefinition = "TEXT")
    private String reportsSolution;

    private Reports(Kids kids, String reportsOriginContent) {
        this.kids = kids;
        this.reportsOriginContent = reportsOriginContent;
    }

    public static Reports createReports(Kids kids, String reportsOriginContent) {
        return new Reports(kids, reportsOriginContent);
    }
}
