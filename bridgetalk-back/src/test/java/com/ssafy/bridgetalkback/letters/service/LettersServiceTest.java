package com.ssafy.bridgetalkback.letters.service;

import com.ssafy.bridgetalkback.common.ServiceTest;
import com.ssafy.bridgetalkback.files.exception.S3FileErrorCode;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.global.exception.GlobalErrorCode;
import com.ssafy.bridgetalkback.letters.exception.LettersErrorCode;
import com.ssafy.bridgetalkback.parents.domain.Parents;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Letters [Service Layer] -> LettersService 테스트")
public class LettersServiceTest extends ServiceTest {

    @Autowired
    private LettersService lettersService;
    private Parents parents;
    @BeforeEach
    void setup() {
        parents = parentsRepository.save(SUNKYOUNG.toParents());
    }

    @Test
    @DisplayName("stt로 변환할 텍스트 파일의 존재여부 확인 : 음성 파일 url")
    void throwExceptionByExistFile() {
        //given
        String noneS3FileUrl = "https://bridge-talk.s3.ap-northeast-2.amazonaws.com/"+" "+"/"+" ";
        Long reportsId = 1L;

        //when-then
        assertThatThrownBy(() -> lettersService.createText(noneS3FileUrl, parents.getUuid().toString(), reportsId))
                .isInstanceOf(BaseException.class)
                .hasMessage(LettersErrorCode.LETTERS_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("올바른 s3의 음성파일로 stt를 실행")
    void startStt() {
        //given
        String fileName = "letters/05c0ee2a-645d-43b5-a623-518be49ab324_test-v.mp3";

        //when
        String extractText = lettersService.stt(fileName);

        //given
        String results = "Mình đã nói với mẹ là mình muốn đi công viên giải trí. Nhưng mẹ mình, người luôn bận rộn, không hiểu mình nói gì. Tôi muốn chơi tất cả các trò chơi ở công viên giải trí.";
        assertThat(extractText).isEqualTo(results);
    }

    @Test
    @DisplayName("chatgpt api 호출 시, 올바른 텍스트 입력 확인")
    void throwExceptionByEmptyFile() {
        // given
        String originalText = "";

        // when-then
        assertThatThrownBy(() -> lettersService.changeToConversation(originalText))
                .isInstanceOf(BaseException.class)
                .hasMessage(LettersErrorCode.CHATGPT_EMPTY_TEXT.getMessage());
    }

    @Test
    @DisplayName("chatgpt api 정상 호출 확인")
    void successChangeTonConversation() {
        //given
        String originalText = "Kim, mình hiểu là cậu muốn đi công viên giải trí mà. Tôi xin lỗi vì luôn bận rộn và không thể nghe lời bạn một cách đúng đắn. Tôi hiểu cảm giác của anh, mình muốn chia sẻ những trải nghiệm thú.";

        // when
        String result = lettersService.changeToConversation(originalText);

        // then
        assertThat(result).isNotEmpty();
        assertThat(result).isNotNull();

    }

    @Test
    @DisplayName("papago 번역 api 번역 언어(target) 및 원본 언어(source) 미지정 오류")
    void throwExceptionByEmptylanguage() {
        // given
        String originalText = "Kim, mình hiểu là cậu muốn đi công viên giải trí mà. Tôi xin lỗi vì luôn bận rộn và không thể nghe lời bạn một cách đúng đắn. Tôi hiểu cảm giác của anh, mình muốn chia sẻ những trải nghiệm thú.";
        String source = "";
        String target = "";

        // when-then
        assertThatThrownBy(() -> lettersService.translation(originalText, source, target))
                .isInstanceOf(BaseException.class)
                .hasMessage(LettersErrorCode.TRANSLATION_BAD_REQUEST.getMessage());
    }

    @Test
    @DisplayName("papago api 정상 호출 확인")
    void successTranslation() {
        //given
        String originalText = "Kim, mình hiểu là cậu muốn đi công viên giải trí mà. Tôi xin lỗi vì luôn bận rộn và không thể nghe lời bạn một cách đúng đắn. Tôi hiểu cảm giác của anh, mình muốn chia sẻ những trải nghiệm thú.";
        String source = "vi";
        String target = "ko";

        // when
        String result = lettersService.translation(originalText, source, target);

        // then
        assertThat(result).isNotEmpty();
        assertThat(result).isNotNull();
    }


}