package com.ssafy.bridgetalkback.comments.query;

import com.ssafy.bridgetalkback.comments.dto.response.CustomCommentsListResponseDto;
import com.ssafy.bridgetalkback.comments.query.dto.CommentsListDto;
import com.ssafy.bridgetalkback.global.Language;

public interface CommentsListQueryRepository {
    CustomCommentsListResponseDto<CommentsListDto> getCommentsListOrderByTime(int page, Language language);

    CustomCommentsListResponseDto<CommentsListDto> getCommentsListOrderByLikes(int page, Language language);
}
