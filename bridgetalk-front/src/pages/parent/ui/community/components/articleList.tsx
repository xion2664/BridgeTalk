import { useEffect, useState } from 'react';
import { ArticleListItem } from './items/articleListItem';
import { customAxios } from '@/shared';

interface Board{
  boardId?: number;
  boardsTitle?: string;
  boardsContent?: string;
  likes?: number;
  createdAt?: string;
  reportsSummary?: string;
  reportsKeyword?: string[];
  writer?: string;

};

export function ArticleList() {

  const [article, setArticle] = useState<Board[]>([]);
  // 변수, set변수 
  useEffect(() => { // 실행시 사용하는 함수
    const fetchArticles = async () => {
      try {
        const response = await customAxios.get('/community');
        setArticle(response.data);
      } catch (error) {
        console.error('게시글을 불러오지못했습니다.', error);
      }
    };

    fetchArticles();
  }, []);


  
  return (
    <div className="articleList">
      <ArticleListItem />
    </div>
  );
}
