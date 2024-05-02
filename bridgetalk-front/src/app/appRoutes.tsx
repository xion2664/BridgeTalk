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
  SignInPage,
  SignUpPage,
} from '@/pages';
import { Main } from '@/pages/main/ui/main/main';
import { EditProfilePage } from '@/pages/main/ui/profile/editProfilePage';

export function AppRoutes() {
  return (
    <Routes>
      {/* 메인화면 관련 */}
      <Route path="/" element={<Main />}>
        <Route path="start" element={<StartPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="addProfile" element={<EditProfilePage type="new" />} />
        <Route path="editProfile" element={<EditProfilePage type="edit" />} />
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
