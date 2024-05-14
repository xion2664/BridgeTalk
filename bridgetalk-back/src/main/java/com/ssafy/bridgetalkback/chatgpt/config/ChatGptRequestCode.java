package com.ssafy.bridgetalkback.chatgpt.config;

public enum ChatGptRequestCode {
    SUMMARY("summary"),
    TRANSLATE("translate"),
    CONVERSION("conversion"),
    KEYWORD("keyword"),
    ANSWER("answer"),
    SOLUTION("solution"),
    EMOTION("emotion"),
    PARAGRAPH_TRANSLATE_ENG("paragraph_translate_eng"),
    PARAGRAPH_TRANSLATE_VIET("paragraph_translate_viet"),
    LETTERS_KEYWORD("letters_keyword"),
    CONVERT_KEYWORD("convert_keyword");

    private final String label;

    private ChatGptRequestCode(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}