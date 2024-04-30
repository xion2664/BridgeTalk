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
} from '@/pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Test />}>
        <Route path="/" element={<TestCamera />} />
        <Route path="camera" element={<TestCamera />} />
        <Route path="draw" element={<TestDraw />} />
        <Route path="puzzle" element={<TestPuzzle />} />
        <Route path="voice" element={<TestVoice />} />
        <Route path="wordcloud" element={<TestWordcloud />} />
        <Route path="zustand" element={<TeestZustand />} />
        <Route path="character" element={<TestCharacter />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Route>
      <Route path="/parent" element={<Parent />}>
        <Route path="main" element={<ParentMain />}></Route>
        <Route path="report" element={<ParentReportList />}></Route>
        <Route path="report/:reportId" element={<ParentReportDetail />}></Route>
        <Route path="information" element={<ParentInformationMain />}></Route>
        <Route path="information/news" element={<ParentInformationNews />}></Route>
        <Route path="information/news/:newsId" element={<ParentInformationNewsDetail />}></Route>
        <Route path="information/word" element={<ParentInformationWord />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}
