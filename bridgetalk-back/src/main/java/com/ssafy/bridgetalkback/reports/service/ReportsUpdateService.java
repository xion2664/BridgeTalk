package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.chatgpt.config.ChatGptRequestCode;
import com.ssafy.bridgetalkback.chatgpt.exception.ChatGptErrorCode;
import com.ssafy.bridgetalkback.chatgpt.service.ChatGptService;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.translation.service.TranslationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReportsUpdateService {

    private final ChatGptService chatGptService;
    private final ReportsFindService reportsFindService;
    private final TranslationService translationService;

    public void createReport(Long reportsId) {
        log.info("{ ReportsService } : 아이속마음 레포트 저장 진입");

        Reports reports = reportsFindService.findByReportsIdAndIsDeleted(reportsId);

        String originText = reports.getReportsOriginContent();

        log.info(">> summaryText 진입: {}", originText);
        String summaryText = chatGptService.createPrompt(originText, ChatGptRequestCode.SUMMARY);
        reports.updateSummaryKor(summaryText);
        log.info(">>>> reports.summaryKor : {}", reports.getReportsSummaryKor());
        log.info(">> summaryText 성공: {}", summaryText);

        log.info(">> translateText 진입: {}", summaryText);
        String translateText = translationService.translation(summaryText, "ko", "vi");
        reports.updateSummaryViet(translateText);
        log.info(">>>> reports.summaryViet : {}", reports.getReportsSummaryViet());
        log.info(">> translateText 성공: {}", translateText);

        log.info(">> keywords_kor 진입");
        String keywords_kor = chatGptService.createPrompt(reports.getReportsOriginContent(), ChatGptRequestCode.KEYWORD);
        String[] keyword_kor_arr = keywords_kor.split(", ");
        if (keyword_kor_arr.length != 3)
            throw BaseException.type(ChatGptErrorCode.INVALID_KEYWORD);
        reports.updateKeywordsKor(arraytoList(keyword_kor_arr));
        log.info(">>>> reports.keywordKorArr : {}", reports.getReportsKeywordsKor().toString());
        log.info(">> keywords_kor 성공: {}", Arrays.toString(keyword_kor_arr));

        log.info(">> keywords_viet 진입");
        String keywords_viet = translationService.translation(keywords_kor, "ko", "vi");
        String[] keyword_viet_arr = keywords_viet.split(", ");
        if (keyword_viet_arr.length != 3)
            throw BaseException.type(ChatGptErrorCode.INVALID_KEYWORD);
        reports.updateKeywordsViet(arraytoList(keyword_viet_arr));
        log.info(">>>> reports.keywordVietArr : {}", reports.getReportsKeywordsViet().toString());
        log.info(">> keywords_viet 성공: {}", Arrays.toString(keyword_viet_arr));

        log.info(">> solutionTextKor 진입: {}", originText);
        String solutionTextKor = chatGptService.createPrompt(originText, ChatGptRequestCode.SOLUTION);
        reports.updateSolutionKor(solutionTextKor);
        log.info(">>>> reports.solutionKor : {}", reports.getReportsSolutionKor());
        log.info(">> solutionTextKor 성공: {}", solutionTextKor);

        log.info(">> solutionTextViet 진입: {}", solutionTextKor);
        String solutionTextViet = translationService.translation(solutionTextKor, "ko", "vi");
        reports.updateSolutionViet(solutionTextViet);
        log.info(">>>> reports.solutionViet : {}", reports.getReportsSolutionViet());
        log.info(">> solutionTextViet 성공: {}", solutionTextViet);

        log.info("{ ReportsService } : 아이속마음 레포트 저장 성공");
    }

    public void createReportAsync(Long reportsId) throws ExecutionException, InterruptedException {
        log.info("{ ReportsService } : 아이속마음 레포트 저장 진입");

        Reports reports = reportsFindService.findByReportsIdAndIsDeleted(reportsId);
        String originText = reports.getReportsOriginContent();

        log.info(">> summaryText 진입: {}", originText);
        CompletableFuture<String[]> summary = chatGptService.createSummary(originText);

        log.info(">> keywords 진입");
        CompletableFuture<String[]> keywords = chatGptService.createKeywords(originText);

        log.info(">> solution 진입");
        CompletableFuture<String[]> solution = chatGptService.createSolution(originText);

        String[] summaryText = summary.get();
        log.info(">> summaryText 성공: {}", Arrays.toString(summaryText));
        String[] keywordsText = keywords.get();
        log.info(">> keywords 성공: {}", Arrays.toString(keywordsText));
        String[] solutionText = solution.get();
        log.info(">> solutionText 성공: {}", Arrays.toString(solutionText));
        String[] keyword_kor_arr = keywordsText[0].split(", ");
        if (keyword_kor_arr.length != 3) {
            keyword_kor_arr = null;
//            throw BaseException.type(ChatGptErrorCode.INVALID_KEYWORD);
        }
        String[] keyword_viet_arr = keywordsText[1].split(", ");
        if (keyword_viet_arr.length != 3) {
            keyword_viet_arr = null;
//            throw BaseException.type(ChatGptErrorCode.INVALID_KEYWORD);
        }
        reports.updateReports(summaryText[0], summaryText[1], arraytoList(keyword_kor_arr), arraytoList(keyword_viet_arr), solutionText[0], solutionText[1]);
        log.info(">>>> reports.summaryKor : {}", reports.getReportsSummaryKor());
        log.info(">>>> reports.summaryViet : {}", reports.getReportsSummaryViet());
        log.info(">>>> reports.keywordKorArr : {}", reports.getReportsKeywordsKor().toString());
        log.info(">>>> reports.keywordVietArr : {}", reports.getReportsKeywordsViet().toString());
        log.info(">>>> reports.solutionKor : {}", reports.getReportsSolutionKor());
        log.info(">>>> reports.solutionViet : {}", reports.getReportsSolutionViet());

        log.info("{ ReportsService } : 아이속마음 레포트 저장 성공");
    }

    private List<String> arraytoList(String[] strings) {
        return strings==null ? Collections.emptyList() : new ArrayList<>(Arrays.asList(strings));
    }
}
