package com.ssafy.bridgetalkback.parentingInfo.domain;

import com.ssafy.bridgetalkback.global.utils.EnumConverter;
import com.ssafy.bridgetalkback.global.utils.EnumStandard;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category implements EnumStandard {
    PROSPECTIVE("prospective"),
    INFANT_AND_TODDLER("infant_and_toddler"),
    SCHOOL("school"),
    PUBERTY("puberty")
    ;

    private final String age;

    @Override
    public String getValue() {
        return age;
    }

    @jakarta.persistence.Converter
    public static class AgeConverter extends EnumConverter<Category> {
        public AgeConverter() {
            super(Category.class);
        }
    }
}