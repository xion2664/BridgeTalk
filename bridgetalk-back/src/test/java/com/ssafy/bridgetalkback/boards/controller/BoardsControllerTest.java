package com.ssafy.bridgetalkback.boards.controller;

import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.boards.dto.request.BoardsRequestDto;
import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.reports.domain.Language;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static com.ssafy.bridgetalkback.fixture.BoardsFixture.BOARDS_01;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.BEARER_TOKEN;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.REFRESH_TOKEN;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doReturn;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Boards [Controller Layer] -> BoardsControllerTest 테스트")
public class BoardsControllerTest extends ControllerTest {

    @Nested
    @DisplayName("Boards 생성 API [POST /api/boards]")
    class createBoards {
        private static final String BASE_URL = "/api/boards";

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            final BoardsRequestDto boardsRequestDto = createBoardsRequestDto();
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(boardsRequestDto));

            //then
            final AuthErrorCode expectedError = AuthErrorCode.INVALID_PERMISSION;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isForbidden(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );
        }

        @Test
        @DisplayName("게시글 등록에 성공한다.")
        void success() throws Exception {
            //given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(createBoardsResponseDto())
                    .when(boardsService)
                    .createBoards(any(), any());

            //when
            final BoardsRequestDto boardsRequestDto = createBoardsRequestDto();
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(boardsRequestDto));

            //then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isCreated());
        }
    }

    private BoardsRequestDto createBoardsRequestDto() {
        return new BoardsRequestDto(1L, BOARDS_01.getBoardsTitleKor(), BOARDS_01.getBoardsContentKor(), Language.kor);
    }

    private BoardsResponseDto createBoardsResponseDto() {
        return new BoardsResponseDto(1L, "레포트 요약내용", String.valueOf(UUID.randomUUID()), "닉네임", BOARDS_01.getBoardsTitleKor(), BOARDS_01.getBoardsContentKor(), LocalDateTime.now());
    }
}
