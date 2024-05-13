package com.ssafy.bridgetalkback.reports.domain;

import com.ssafy.bridgetalkback.global.BaseEntity;
import com.ssafy.bridgetalkback.global.utils.StringListConverter;
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

    @Convert(converter = StringListConverter.class)
    private List<String> reportsKeywordsKor;

    @Convert(converter = StringListConverter.class)
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

    public void updateSummaryKor(String summaryTextKor) {
        this.reportsSummaryKor = summaryTextKor;
    }

    public void updateSummaryViet(String summaryTextViet) {
        this.reportsSummaryViet = summaryTextViet;
    }

    public void updateKeywordsKor(String[] keywordKorArr) {
        this.reportsKeywordsKor = List.of(keywordKorArr);
    }

    public void updateKeywordsViet(String[] keywordVietArr) {
        this.reportsKeywordsViet = List.of(keywordVietArr);
    }

    public void updateSolutionKor(String solutionTextKor) {
        this.reportsSolutionKor = solutionTextKor;
    }

    public void updateSolutionViet(String solutionTextViet) {
        this.reportsSolutionViet = solutionTextViet;
    }

    public void updateReports(String summaryTextKor, String summaryTextViet, String[] keywordKorArr, String[] keywordVietArr, String solutionTextKor, String solutionTextViet) {
        this.reportsSummaryKor = summaryTextKor;
        this.reportsSummaryViet = summaryTextViet;
        this.reportsKeywordsKor = List.of(keywordKorArr);
        this.reportsKeywordsViet = List.of(keywordVietArr);
        this.reportsSolutionKor = solutionTextKor;
        this.reportsSolutionViet = solutionTextViet;
    }

    public void updateReportsOriginContent(String updateContent) {
        this.reportsOriginContent = updateContent;
    }
}
