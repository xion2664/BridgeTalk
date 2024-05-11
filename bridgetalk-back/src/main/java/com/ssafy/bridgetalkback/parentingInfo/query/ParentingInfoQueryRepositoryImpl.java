package com.ssafy.bridgetalkback.parentingInfo.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bridgetalkback.parentingInfo.domain.Category;
import com.ssafy.bridgetalkback.parentingInfo.dto.response.CustomParentingInfoListResponseDto;
import com.ssafy.bridgetalkback.parentingInfo.query.dto.ParentingInfoListDto;
import com.ssafy.bridgetalkback.parentingInfo.query.dto.QParentingInfoListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.querydsl.core.types.ExpressionUtils.count;
import static com.ssafy.bridgetalkback.parentingInfo.domain.QParentingInfo.parentingInfo;

@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ParentingInfoQueryRepositoryImpl implements ParentingInfoQueryRepository{
    private final JPAQueryFactory query;

    @Override
    public CustomParentingInfoListResponseDto<ParentingInfoListDto> getParentingInfoListOrderById(int page, String category) {
        Pageable pageable = PageRequest.of(page, 4);
        List<ParentingInfoListDto> boardLists = query
                .selectDistinct(new QParentingInfoListDto(parentingInfo.parentingInfoId, parentingInfo.title_kor, parentingInfo.title_viet,
                        parentingInfo.content_kor, parentingInfo.content_viet, parentingInfo.link, parentingInfo.category.stringValue()))
                .from(parentingInfo)
                .where(search(category))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(parentingInfo.parentingInfoId.asc())
                .fetch();

        JPAQuery<Long> countQuery = query
                .select(count(parentingInfo.parentingInfoId))
                .from(parentingInfo)
                .where(search(category));

        return new CustomParentingInfoListResponseDto<>(PageableExecutionUtils.getPage(boardLists, pageable, countQuery::fetchOne));
    }

    private BooleanExpression search(String category) {
        if (category == null || category.isEmpty()) {
            return null;
        } else {
            return parentingInfo.category.eq(Category.valueOf(category));
        }
    }
}
