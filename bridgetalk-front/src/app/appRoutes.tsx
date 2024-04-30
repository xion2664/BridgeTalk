import { Routes, Route } from 'react-router-dom';
import {
  Parent,
  ParentInformationMain,
  ParentInformationNews,
  ParentInformationWord,
  ParentMain,
  ParentReportDetail,
  ParentReportList,
  TeestZustand,
  Test,
  TestCamera,
  TestDraw,
  TestPuzzle,
  TestVoice,
  TestWordcloud,
  TestCharacter,
  ErrorPage,
  ParentInformationNewsDetail,
  StartPage,
  ProfilePage,
} from '@/pages';
import { Main } from '@/pages/main/ui/main/main';
import LoginComponent from '@/pages/main/ui/sign/signInPage';
import RegisterComponent from '@/pages/main/ui/sign/signUpPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* 메인화면 관련 */}
      <Route path="/" element={<Main />}>
        <Route path="start" element={<StartPage />} />
        <Route path="signin" element={<LoginComponent />} />
        <Route path="signup" element={<RegisterComponent />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 부모 관련 */}
      <Route path="/parent" element={<Parent />}>
        <Route path="main" element={<ParentMain />} />
        <Route path="report" element={<ParentReportList />} />
        <Route path="report/:reportId" element={<ParentReportDetail />} />
        <Route path="information" element={<ParentInformationMain />} />
        <Route path="information/news" element={<ParentInformationNews />} />
        <Route path="information/news/:newsId" element={<ParentInformationNewsDetail />} />
        <Route path="information/word" element={<ParentInformationWord />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      {/* 기능 테스트용 페이지 - 추후 삭제 */}
      <Route path="/test" element={<Test />}>
        <Route path="camera" element={<TestCamera />} />
        <Route path="draw" element={<TestDraw />} />
        <Route path="puzzle" element={<TestPuzzle />} />
        <Route path="voice" element={<TestVoice />} />
        <Route path="wordcloud" element={<TestWordcloud />} />
        <Route path="zustand" element={<TeestZustand />} />
        <Route path="character" element={<TestCharacter />} />
      </Route>

      {/* 에러 페이지 */}
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}
