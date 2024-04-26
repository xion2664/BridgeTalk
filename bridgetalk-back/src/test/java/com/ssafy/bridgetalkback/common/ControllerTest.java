package com.ssafy.bridgetalkback.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bridgetalkback.auth.controller.AuthController;
import com.ssafy.bridgetalkback.auth.service.AuthService;
import com.ssafy.bridgetalkback.global.config.SecurityConfig;
import com.ssafy.bridgetalkback.letters.controller.LettersController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@ImportAutoConfiguration(SecurityConfig.class)
@WebMvcTest({
        AuthController.class,
        LettersController.class
})
public abstract class ControllerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected AuthService authService;

    protected String convertObjectToJson(Object data) throws JsonProcessingException {
        return objectMapper.writeValueAsString(data);
    }
}
