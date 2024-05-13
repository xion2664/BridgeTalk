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
import com.ssafy.bridgetalkback.letters.controller.LettersController;
import com.ssafy.bridgetalkback.letters.service.ClovaSpeechService;
import com.ssafy.bridgetalkback.letters.service.LettersService;
import com.ssafy.bridgetalkback.parentingInfo.controller.ParentingInfoController;
import com.ssafy.bridgetalkback.parentingInfo.controller.ParentingInfoCrawlingController;
import com.ssafy.bridgetalkback.parentingInfo.service.ParentingInfoCrawlingService;
import com.ssafy.bridgetalkback.parentingInfo.service.ParentingInfoListService;
import com.ssafy.bridgetalkback.parentingInfo.service.ParentingInfoService;
import com.ssafy.bridgetalkback.parents.controller.ProfileController;
import com.ssafy.bridgetalkback.parents.controller.ProfileListController;
import com.ssafy.bridgetalkback.parents.service.ParentsFindService;
import com.ssafy.bridgetalkback.parents.service.ProfileListService;
import com.ssafy.bridgetalkback.parents.service.ProfileService;
import com.ssafy.bridgetalkback.puzzle.controller.PuzzleController;
import com.ssafy.bridgetalkback.puzzle.service.PuzzleService;
import com.ssafy.bridgetalkback.reports.controller.ReportsController;
import com.ssafy.bridgetalkback.reports.controller.TalkController;
import com.ssafy.bridgetalkback.reports.service.ReportsService;
import com.ssafy.bridgetalkback.reports.service.ReportsUpdateService;
import com.ssafy.bridgetalkback.reports.service.TalkFastApiService;
import com.ssafy.bridgetalkback.reports.service.TalkService;
import com.ssafy.bridgetalkback.slang.controller.SlangController;
import com.ssafy.bridgetalkback.slang.service.SlangService;
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
        ProfileListController.class,
        LettersController.class,
        TalkController.class,
        ReportsController.class,
        PuzzleController.class,
        SlangController.class,
        ProfileController.class,
        ProfileController.class,
        ParentingInfoCrawlingController.class,
        ParentingInfoController.class
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

    @MockBean
    protected LettersService lettersService;

    @MockBean
    protected TalkService talkService;

    @MockBean
    protected ReportsService reportsService;

    @MockBean
    protected ReportsUpdateService reportsUpdateService;

    @MockBean
    protected PuzzleService puzzleService;

    @MockBean
    protected ClovaSpeechService clovaSpeechService;

    @MockBean
    protected ProfileService profileService;

    @MockBean
    protected SlangService slangService;

    @MockBean
    protected TalkFastApiService talkFastApiService;

    @MockBean
    protected ParentingInfoCrawlingService parentingInfoCrawlingService;

    @MockBean
    protected ParentingInfoService parentingInfoService;

    @MockBean
    protected ParentingInfoListService parentingInfoListService;

    protected String convertObjectToJson(Object data) throws JsonProcessingException {
        return objectMapper.writeValueAsString(data);
    }
}