package com.ssafy.bridgetalkback.boards.controller;

import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.boards.dto.response.CustomBoardsListResponseDto;
import com.ssafy.bridgetalkback.boards.exception.BoardsErrorCode;
import com.ssafy.bridgetalkback.boards.dto.response.BoardsResponseDto;
import com.ssafy.bridgetalkback.boards.query.dto.BoardsListDto;
import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.global.Language;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static com.ssafy.bridgetalkback.fixture.BoardsFixture.*;
import static com.ssafy.bridgetalkback.fixture.ParentingInfoFixture.*;
import static com.ssafy.bridgetalkback.fixture.ParentingInfoFixture.PARENTINGINFO_03;
import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static com.ssafy.bridgetalkback.fixture.ReportsFixture.REPORTS_01;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.BEARER_TOKEN;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.REFRESH_TOKEN;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Boards [Controller Layer] -> BoardsController 테스트")
public class BoardsControllerTest extends ControllerTest {
    @Nested
    @DisplayName("게시글 상세조회 API [GET /api/boards/{boardsId}/{language}]")
    class parentingInfoDetail {
        private static final String BASE_URL = "/api/boards/{boardsId}/{language}";
        private static final Long BOARDS_ID = 1L;
        private static final Language LANGUAGE_KOR = Language.kor;

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, BOARDS_ID, LANGUAGE_KOR);

            // then
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
        @DisplayName("부모가 아닌 유저라면 게시글 조회에 실패한다")
        void throwExceptionByUserIsNotParents() throws Exception {
            // given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doThrow(BaseException.type(BoardsErrorCode.USER_IS_NOT_PARENTS))
                    .when(boardsService)
                    .getBoardsDetail(any(), anyLong(), any());

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, BOARDS_ID, LANGUAGE_KOR)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);


            // then
            final BoardsErrorCode expectedError = BoardsErrorCode.USER_IS_NOT_PARENTS;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isNotFound(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );
        }

        @Test
        @DisplayName("게시글 상세조회에 성공한다")
        void success() throws Exception {
            // given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(getBoardsResponseDto())
                    .when(boardsService)
                    .getBoardsDetail(any(), anyLong(), any());

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, BOARDS_ID, LANGUAGE_KOR)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);

            // then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk());
        }
    }

    @Nested
    @DisplayName("게시글 리스트조회 API [GET /api/boards/{language}]")
    class getCustomBoardsList {
        private static final String BASE_URL = "/api/boards/{language}";
        private static final Language LANGUAGE_KOR = Language.kor;
        private static final int PAGE = 0;
        private static final String SEARCH_TYPE = "제목";
        private static final String SEARCH_WORD_KOR = "제목";
        private static final String SORT_CONDITION = "최신순";
        private static final String INVALID_SEARCH_TYPE = "댓글";
        private static final String INVALID_SORT_CONDITION = "조회순";

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, LANGUAGE_KOR)
                    .param("page", String.valueOf(PAGE))
                    .param("searchType", SEARCH_TYPE)
                    .param("searchWord", SEARCH_WORD_KOR)
                    .param("sort", SORT_CONDITION);

            // then
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
        @DisplayName("부모가 아닌 유저라면 게시글 리스트 조회에 실패한다")
        void throwExceptionByUserIsNotParents() throws Exception {
            // given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doThrow(BaseException.type(BoardsErrorCode.USER_IS_NOT_PARENTS))
                    .when(boardsListService)
                    .getCustomBoardsList(any(), anyInt(), any(), any(), any(), any());

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, LANGUAGE_KOR)
                    .param("page", String.valueOf(PAGE))
                    .param("searchType", SEARCH_TYPE)
                    .param("searchWord", SEARCH_WORD_KOR)
                    .param("sort", SORT_CONDITION)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);


            // then
            final BoardsErrorCode expectedError = BoardsErrorCode.USER_IS_NOT_PARENTS;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isNotFound(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );
        }

        @Test
        @DisplayName("존재하지 않는 검색 조건이라면 게시글 리스트 조회에 실패한다")
        void throwNotFoundSearchType() throws Exception {
            // given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doThrow(BaseException.type(BoardsErrorCode.SEARCH_TYPE_NOT_FOUND))
                    .when(boardsListService)
                    .getCustomBoardsList(any(), anyInt(), any(), any(), any(), any());

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, LANGUAGE_KOR)
                    .param("page", String.valueOf(PAGE))
                    .param("searchType", INVALID_SEARCH_TYPE)
                    .param("searchWord", SEARCH_WORD_KOR)
                    .param("sort", SORT_CONDITION)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);


            // then
            final BoardsErrorCode expectedError = BoardsErrorCode.SEARCH_TYPE_NOT_FOUND;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isNotFound(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );
        }

        @Test
        @DisplayName("존재하지 않는 정렬 유형이라면 게시글 리스트 조회에 실패한다")
        void throwNotFoundSearchCondition() throws Exception {
            // given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doThrow(BaseException.type(BoardsErrorCode.SORT_CONDITION_NOT_FOUND))
                    .when(boardsListService)
                    .getCustomBoardsList(any(), anyInt(), any(), any(), any(), any());

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, LANGUAGE_KOR)
                    .param("page", String.valueOf(PAGE))
                    .param("searchType", SEARCH_TYPE)
                    .param("searchWord", SEARCH_WORD_KOR)
                    .param("sort", INVALID_SORT_CONDITION)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);


            // then
            final BoardsErrorCode expectedError = BoardsErrorCode.SORT_CONDITION_NOT_FOUND;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isNotFound(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );
        }

        @Test
        @DisplayName("정렬 유형과 검색 조건에 따른 게시글 리스트 조회에 성공한다")
        void success() throws Exception {
            // given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(getCustomBoardsListResponseDto())
                    .when(boardsListService)
                    .getCustomBoardsList(any(), anyInt(), any(), any(), any(), any());

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL, LANGUAGE_KOR)
                    .param("page", String.valueOf(PAGE))
                    .param("searchType", SEARCH_TYPE)
                    .param("searchWord", SEARCH_WORD_KOR)
                    .param("sort", SORT_CONDITION)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);

            // then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk());
        }
    }

    private BoardsResponseDto getBoardsResponseDto() {
        List<String> keywordList = new ArrayList<>();
        keywordList.add("레포트 키워드1");
        return new BoardsResponseDto(1L, BOARDS_01.getBoardsTitle_kor(), BOARDS_01.getBoardsTitle_viet(),
                0, LocalDateTime.now(), "레포트요약본", keywordList, SUNKYOUNG.getParentsNickname());
    }

    private List<BoardsListDto> createBoardsListDto() {
        List<BoardsListDto> BoardsLists = new ArrayList<>();

        List<String> keywordList = new ArrayList<>();
        keywordList.add("레포트 키워드1");
        BoardsLists.add(new BoardsListDto(1L, BOARDS_01.getBoardsTitle_kor(), BOARDS_01.getBoardsContent_kor(),
                0, LocalDateTime.now().plusHours(1), "레포트요약본", keywordList, SUNKYOUNG.getParentsNickname()));
        BoardsLists.add(new BoardsListDto(2L, BOARDS_02.getBoardsTitle_kor(), BOARDS_02.getBoardsContent_kor(),
                0, LocalDateTime.now().plusHours(2), "레포트요약본", keywordList, SUNKYOUNG.getParentsNickname()));
        BoardsLists.add(new BoardsListDto(3L, BOARDS_03.getBoardsTitle_kor(), BOARDS_03.getBoardsContent_kor(),
                0, LocalDateTime.now().plusHours(3), "레포트요약본", keywordList, SUNKYOUNG.getParentsNickname()));
        return BoardsLists;
    }

    private CustomBoardsListResponseDto.CustomPageable createCustomPageable() {
        return new CustomBoardsListResponseDto.CustomPageable(1, 4, false, 4);
    }

    private CustomBoardsListResponseDto getCustomBoardsListResponseDto() {
        return new CustomBoardsListResponseDto<>(createCustomPageable(), createBoardsListDto());
    }
}
