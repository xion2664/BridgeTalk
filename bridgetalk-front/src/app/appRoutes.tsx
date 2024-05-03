import { Routes, Route } from 'react-router-dom';

import { ChildPage } from '@/pages/child/ui/childPage';
import { TalkingPage } from '@/pages/child/ui/talk/talkingPage';
import { MessagePage } from '@/pages/child/ui/talk/messagePage';
import PuzzlePage from '@/pages/child/ui/game/puzzle/puzzlePage';
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
import { MessageList } from '@/pages/child/ui/talk/components/messageList';
import { Message } from '@/pages/child/ui/talk/components/message';

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

      {/* 아이 관련 */}
      <Route path="/child" element={<ChildPage />} />
      <Route path="/talk" element={<TalkingPage />} />
      <Route path="/message" element={<MessagePage />}>
        <Route path="list" element={<MessageList />} />
        <Route path=":id" element={<Message />} />
      </Route>
      <Route path="/puzzle" element={<PuzzlePage />} />

      {/* <Route path="/child" element={<Child />}>
        <Route path="main" element={<ChildMain />} />
        
        <Route path="game" element={<GameMain />}>
        </Route>
      </Route> */}

      {/* <Route path="/child" element={<Child />}>
        <Route path="main" element={<ChildMain />} />
        <Route path="talk" element={<TalkingPage />} />
        <Route path="talk/warn" element={<WarningPage />} />
        <Route path="talk/message" element={<MessagePage />}>
          <Route path="list" element={<MessageListPage />} />
          <Route path="read" element={<MessageReadPage />} />
        </Route>

        <Route path="game" element={<GameMain />} />
        <Route path="puzzle/select" element={<SelectPuzzle />}>
          <Route path="stages" element={<SelectStage />} />
          <Route path=":puzzleId" element={<StageInfo />} />
        </Route>
        <Route path="puzzle/start" element={<Puzzle />}>
          <Route path=":puzzleId" element={<DoPuzzle />} />
          <Route path=":puzzleId/complete" element={<PuzzleComplete />} />
        </Route>
        <Route path="dress" element={<SelectDress />} />
        <Route path="dress/:dressId" element={<DressingPage />}>
          <Route path="coloring" element={<Coloring />} />
          <Route path="select" element={<SelectBackground />} />
        </Route>
        <Route path="dress/wearing" element={<WearDress />}>
          <Route path="cam" element={<CaptureDress />} />
          <Route path="pic" element={<SaveDress />} />
        </Route>
      </Route> */}

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
