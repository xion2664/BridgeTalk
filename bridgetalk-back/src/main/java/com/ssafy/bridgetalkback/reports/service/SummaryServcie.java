package com.ssafy.bridgetalkback.reports.service;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
public class SummaryServcie {

    @Value("${CLOVA_SUMMARY_ID}")
    String clovaId;

    @Value("${CLOVA_SUMMARY_KEY}")
    String clovaKey;

    public String ClovaSummaryAPI(String originText) {
        log.info("{ SummaryService } : 텍스트요약 API 진입");
        String apiURL = "https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize";
        StringBuffer response = new StringBuffer();
        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clovaId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", clovaKey);
            con.setRequestProperty("Content-Type", "application/json");

            JSONObject json = new JSONObject();
            JSONObject document = new JSONObject();
            JSONObject option = new JSONObject();

            document.put("title", "아이의 속마음 대화내용");
            document.put("content", originText);
            option.put("language", "ko");
            option.put("tone", 1);
            json.put("document", document);
            json.put("option", option);
            String postParams = json.toString();

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;

            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
        } catch (Exception e) {
            System.out.println(e);
        }

        log.info("{ SummaryService } : 텍스트요약 API 성공");
        return response.toString();
    }


}
