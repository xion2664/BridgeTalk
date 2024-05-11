package com.ssafy.bridgetalkback.parentingInfo.service;

import com.ssafy.bridgetalkback.chatgpt.config.ChatGptRequestCode;
import com.ssafy.bridgetalkback.chatgpt.service.ChatGptService;
import com.ssafy.bridgetalkback.parentingInfo.domain.Age;
import com.ssafy.bridgetalkback.parentingInfo.domain.BoardNum;
import com.ssafy.bridgetalkback.parentingInfo.dto.ParentingInfoCrawlingDto;
import com.ssafy.bridgetalkback.parentingInfo.repository.BoardNumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class
ParentingInfoCrawlingService {
    private final ChatGptService chatGptService;
    private final ParentingInfoService parentingInfoService;
    private final BoardNumRepository boardNumRepository;

    public void startParentingInfoCrawling() throws Exception {
        log.info("{ ParentingInfoCrawlingService } : startParentingInfoCrawling 진입");

        // 예비부모, 영유아기, 학령기부모, 사춘기부모
        Map<String, String> map = new HashMap<>();
        map.put("75301", "PROSPECTIVE");
        map.put("75302", "INFANT_AND_TODDLER");
        map.put("75303", "SCHOOL");
        map.put("75304", "PUBERTY");

        for(String key : map.keySet()) {
            if(!key.equals("75304")) continue;
            List<String> urlList = createUrlList(key, Age.valueOf(map.get(key)));
            for(String url : urlList) {
                ParentingInfoCrawlingDto dto = parentingInfoCrawling(url, Age.valueOf(map.get(key)));
                parentingInfoService.createParentingInfo(dto.title_kor(), dto.title_viet(),
                        dto.content_kor(), dto.content_viet(), dto.url(), dto.age());
            }
        }
        log.info("{ ParentingInfoCrawlingService } : startParentingInfoCrawling 완료");
    }
    public ParentingInfoCrawlingDto parentingInfoCrawling(String url, Age age) throws Exception {
        log.info("{ ParentingInfoCrawlingService } : parentingInfoCrawlingList 진입");


        log.info("{ ParentingInfoCrawlingService } : url - "+url);
        Document document = Jsoup.connect(url).get();

        String title_kor = document.select(".brdViewTit").text();
        String title_viet = createTranslate("("+title_kor+")");
        String content_kor = "";
        String content_viet = "";

        Elements elements = document.select(".brdViewCont p");

        StringBuilder content_sb = new StringBuilder();
        for(int i=0; i<elements.size(); i++) {
            String kor = elements.get(i).text();
            if(kor.isEmpty())
                content_sb.append("\n");
            else
                content_sb.append(kor);
        }
        content_kor = removeUnnecessarySentencesKor(content_sb.toString());
        content_viet = createParagraphTranslateViet(createParagraphTranslateEng(content_kor));
        content_viet = removeUnnecessarySentencesViet(content_viet);

        log.info("{ ParentingInfoCrawlingService } : parentingInfoCrawling 성공");

        return new ParentingInfoCrawlingDto(title_kor, title_viet, content_kor, content_viet, url, age);
    }

    private String removeUnnecessarySentencesViet(String text) {
        text = text.replaceAll("니다.", "");
        return text;
    }

    private String removeUnnecessarySentencesKor(String text) {
        text = text.replaceAll("이미지출처 : 픽사베이", "");
        text = text.replaceAll("\\[", "");
        text = text.replaceAll("]", "");
        return text;
    }

    public List<String> createUrlList(String code, Age age) {
        log.info("{ ParentingInfoCrawlingService } : urlList 생성");
        List<BoardNum> boardNumList = boardNumRepository.findBoardNumByAge(age);
        List<String> urlList = new ArrayList<>();
        for(BoardNum boardNum : boardNumList) {
            String num = boardNum.getNum();
            urlList.add("https://www.mogef.go.kr/kps/olb/kps_olb_s001d.do?mid=mda753&div1=mda"+code+"&cd=kps&bbtSn="+num);
        }
        return urlList;
    }

    private String createTranslate(String text) {
        log.info("{ ParentingInfoCrawlingService.createTranslate }");
        String transformedText = "";
        transformedText = chatGptService.createPrompt(text, ChatGptRequestCode.TRANSLATE);
        log.info(">> transformedText : {}", transformedText);

        return transformedText;
    }

    private String createParagraphTranslateEng(String text) {
        log.info("{ ParentingInfoCrawlingService.createTranslate }");
        String transformedText = "";
        transformedText = chatGptService.createPrompt(text, ChatGptRequestCode.PARAGRAPH_TRANSLATE_ENG);
        log.info(">> transformedText : {}", transformedText);

        return transformedText;
    }

    private String createParagraphTranslateViet(String text) {
        log.info("{ ParentingInfoCrawlingService.createTranslate }");
        String transformedText = "";
        transformedText = chatGptService.createPrompt(text, ChatGptRequestCode.PARAGRAPH_TRANSLATE_VIET);
        log.info(">> transformedText : {}", transformedText);

        return transformedText;
    }
}
