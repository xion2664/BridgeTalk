package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.common.ControllerTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

class LettersControllerTest extends ControllerTest {

    @Test
    @DisplayName("부모 음성 편지 업로드 테스트")
    public void uploadLetters() throws Exception {
//        // given
//        // stub
//        BDDMockito.given(lettersService.saveVoiceFile(BDDMockito.any())).willReturn(BDDMockito.anyString());
//
//        // when
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/letters/upload")
//                .content(objectMapper.writeValueAsString())
//                .contentType(MediaType.APPLICATION_JSON)
//                .andExpect(MockMvcResultMatchers.status().isCreated());
//
//        // then
    }

}