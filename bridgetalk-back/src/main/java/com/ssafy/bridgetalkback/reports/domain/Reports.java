package com.ssafy.bridgetalkback.reports.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.kids.domain.Kids;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reports")
public class Reports extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kids_uuid")
    private Kids kids;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String reportsOriginContent;

    @Column(columnDefinition = "TEXT")
    private String reportsSummaryKor;

    @Column(columnDefinition = "TEXT")
    private String reportsSummaryViet;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> reportsKeywordsKor;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> reportsKeywordsViet;

    @Column(columnDefinition = "TEXT")
    private String reportsSolutionKor;

    @Column(columnDefinition = "TEXT")
    private String reportsSolutionViet;

    private Reports(Kids kids, String reportsOriginContent) {
        this.kids = kids;
        this.reportsOriginContent = reportsOriginContent;
    }

    public static Reports createReports(Kids kids, String reportsOriginContent) {
        return new Reports(kids, reportsOriginContent);
    }

    public void updateSummaryKor(String summaryText) {
        this.reportsSummaryKor = summaryText;
    }

    public void updateSummaryViet(String translateText) {
        this.reportsSummaryViet = translateText;
    }

    public void updateKeywordsKor(String[] keywordKorArr) {
        this.reportsKeywordsKor = List.of(keywordKorArr);
    }

    public void updateKeywordsViet(String[] keywordVietArr) {
        this.reportsKeywordsViet = List.of(keywordVietArr);
    }

    public void updateReports(String summaryText, String translateText, String[] keywordKorArr, String[] keywordVietArr){
        this.reportsSummaryKor = summaryText;
        this.reportsSummaryViet = translateText;
        this.reportsKeywordsKor = List.of(keywordKorArr);
        this.reportsKeywordsViet = List.of(keywordVietArr);
    }

    public void updateReportsOriginContent(String updateContent) {
        this.reportsOriginContent = updateContent;
    }
}
