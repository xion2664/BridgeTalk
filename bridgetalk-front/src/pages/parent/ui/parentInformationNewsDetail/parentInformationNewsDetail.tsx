import { useEffect, useState } from 'react';

interface News {
    newsId: number;
    newsTitle: string;
    newsContent: string;
}

export function ParentInformationNewsDetail() {
    const [news, setNews] = useState<News>();

    useEffect(() => {
        const fetchData = {
            newsId: 1,
            newsTitle: 'Dòng vốn ròng trong ngày thứ ba từ Quỹ Anh',
            newsContent:
                'Các quỹ đã được rút khỏi quỹ loại trong ngày thứ ba. Theo Hiệp hội Đầu tư Tài chính vào ngày 26, 12,6 tỷ won đã bị rò rỉ ròng từ các quỹ <b> cổ phiếu trong nước </b>, không bao gồm các quỹ thương mại trao đổi (ETF) vào ngày 22. 47,2 tỷ won đã được nhập và 59,8 tỷ won là quỹ... ',
        };

        setNews(fetchData);
    }, []);

    return (
        <div>
            {news && (
                <>
                    <div>{news.newsTitle}</div>
                    <div>{news.newsContent}</div>
                </>
            )}
        </div>
    );
}
