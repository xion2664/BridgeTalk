package com.ssafy.bridgetalkback.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bridgetalkback.auth.controller.AuthController;
import com.ssafy.bridgetalkback.auth.controller.TokenReissueController;
import com.ssafy.bridgetalkback.auth.service.AuthService;
import com.ssafy.bridgetalkback.auth.service.TokenReissueService;
import com.ssafy.bridgetalkback.auth.service.TokenService;
import com.ssafy.bridgetalkback.auth.utils.JwtProvider;
import com.ssafy.bridgetalkback.global.config.SecurityConfig;
import com.ssafy.bridgetalkback.global.security.JwtAccessDeniedHandler;
import com.ssafy.bridgetalkback.global.security.JwtAuthenticationEntryPoint;
import com.ssafy.bridgetalkback.kids.service.KidsFindService;
import com.ssafy.bridgetalkback.parents.controller.ProfileListController;
import com.ssafy.bridgetalkback.parents.service.ParentsFindService;
import com.ssafy.bridgetalkback.parents.service.ProfileListService;
import com.ssafy.bridgetalkback.tts.service.TtsService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

@ImportAutoConfiguration(SecurityConfig.class)
@WebMvcTest({
        AuthController.class,
        TokenReissueController.class,
        ProfileListController.class
})
public abstract class ControllerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }

    @MockBean
    protected AuthService authService;

    @MockBean
    protected JwtProvider jwtProvider;

    @MockBean
    protected JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @MockBean
    protected JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    protected ParentsFindService parentsFindService;

    @MockBean
    protected KidsFindService kidsFindService;

    @MockBean
    protected TokenService tokenService;

    @MockBean
    protected TokenReissueService tokenReissueService;

    @MockBean
    protected TtsService ttsService;

    @MockBean
    protected ProfileListService profileListService;

    protected String convertObjectToJson(Object data) throws JsonProcessingException {
        return objectMapper.writeValueAsString(data);
    }
}
