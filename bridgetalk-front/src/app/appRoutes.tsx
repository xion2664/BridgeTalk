import { Routes, Route } from 'react-router-dom';
import { Main, StartPage, ProfilePage, EditProfilePage, SignInPage, SignUpPage, LoginGuard, ErrorPage } from '@/pages';
import { ChildPage, TalkingPage, MessagePage, MessageList, Message, PuzzlePage } from '@/pages';
import {
  Parent,
  ParentInformationMain,
  ParentInformationNews,
  ParentInformationWord,
  ParentMain,
  ParentReportDetail,
  ParentReportList,
  ParentInformationNewsDetail,
} from '@/pages';
import { TeestZustand, Test, TestCamera, TestDraw, TestPuzzle, TestVoice, TestWordcloud, TestCharacter } from '@/pages';

export function AppRoutes() {
  return (
    <Routes>
      {/* 메인화면 관련 */}
      <Route path="/" element={<Main />}>
        <Route
          path="start"
          element={
            <LoginGuard>
              <StartPage />
            </LoginGuard>
          }
        />
        <Route
          path="signin"
          element={
            <LoginGuard>
              <SignInPage />
            </LoginGuard>
          }
        />
        <Route
          path="signup"
          element={
            <LoginGuard>
              <SignUpPage />
            </LoginGuard>
          }
        />
        <Route
          path="profile"
          element={
            <LoginGuard>
              <ProfilePage />
            </LoginGuard>
          }
        />
        <Route
          path="addProfile"
          element={
            <LoginGuard>
              <EditProfilePage type="new" />
            </LoginGuard>
          }
        />
        <Route
          path="editProfile"
          element={
            <LoginGuard>
              <EditProfilePage type="edit" />
            </LoginGuard>
          }
        />
      </Route>

      {/* 아이 관련 */}
      <Route
        path="/child"
        element={
          <LoginGuard>
            <ChildPage />
          </LoginGuard>
        }
      />
      <Route
        path="/talk"
        element={
          <LoginGuard>
            <TalkingPage />
          </LoginGuard>
        }
      />
      <Route
        path="/message"
        element={
          <LoginGuard>
            <MessagePage />
          </LoginGuard>
        }
      >
        <Route path="list" element={<MessageList />} />
        <Route path=":id" element={<Message />} />
      </Route>
      <Route path="/puzzle" element={<PuzzlePage />} />

      {/* 부모 관련 */}
      <Route path="/parent" element={<Parent />}>
        <Route path="main" element={<ParentMain />} />
        <Route path="report" element={<ParentReportList />} />
        <Route path="report/:reportsId" element={<ParentReportDetail />} />
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
