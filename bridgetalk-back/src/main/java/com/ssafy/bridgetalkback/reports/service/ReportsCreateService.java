package com.ssafy.bridgetalkback.reports.service;

import com.ssafy.bridgetalkback.chatgpt.config.ChatGptRequestCode;
import com.ssafy.bridgetalkback.chatgpt.exception.ChatGptErrorCode;
import com.ssafy.bridgetalkback.chatgpt.service.ChatGptService;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.kids.repository.KidsRepository;
import com.ssafy.bridgetalkback.reports.domain.Reports;
import com.ssafy.bridgetalkback.reports.repository.ReportsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReportsCreateService {

    private final ChatGptService chatGptService;
    private final ReportsFindService reportsFindService;

    @Transactional
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
        String translateText = chatGptService.createPrompt(summaryText, ChatGptRequestCode.TRANSLATE);
        reports.updateSummaryViet(translateText);
        log.info(">>>> reports.summaryViet : {}", reports.getReportsSummaryViet());
        log.info(">> translateText 성공: {}", translateText);

        log.info(">> keywords_kor 진입");
        String keywords_kor = chatGptService.createPrompt(reports.getReportsOriginContent(), ChatGptRequestCode.KEYWORD);
        String[] keyword_kor_arr = keywords_kor.split(", ");
        if (keyword_kor_arr.length != 3)
            throw BaseException.type(ChatGptErrorCode.INVALID_KEYWORD);
        reports.updateKeywordsKor(keyword_kor_arr);
        log.info(">>>> reports.keywordKorArr : {}", reports.getReportsKeywordsKor().toString());
        log.info(">> keywords_kor 성공: {}", Arrays.toString(keyword_kor_arr));

        log.info(">> keywords_viet 진입");
        String keywords_viet = chatGptService.createPrompt(keywords_kor, ChatGptRequestCode.TRANSLATE);
        String[] keyword_viet_arr = keywords_viet.split(", ");
        if (keyword_viet_arr.length != 3)
            throw BaseException.type(ChatGptErrorCode.INVALID_KEYWORD);
        reports.updateKeywordsViet(keyword_viet_arr);
        log.info(">>>> reports.keywordVietArr : {}", reports.getReportsKeywordsViet().toString());
        log.info(">> keywords_viet 성공: {}", Arrays.toString(keyword_viet_arr));


        log.info("{ ReportsService } : 아이속마음 레포트 저장 성공");
    }
}
