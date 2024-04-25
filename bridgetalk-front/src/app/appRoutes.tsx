import { Routes, Route } from 'react-router-dom';
import {
    Parent,
    ParentInformation,
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
    ErrorPage,
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
            </Route>
            <Route path="/parent" element={<Parent />}>
                <Route path="main" element={<ParentMain />}></Route>
                <Route path="reportlist" element={<ParentReportList />}></Route>
                <Route path="report/:report_id" element={<ParentReportDetail />}></Route>
                <Route path="information" element={<ParentInformation />}>
                    <Route path="main" element={<ParentInformationMain />}></Route>
                    <Route path="news" element={<ParentInformationNews />}></Route>
                    <Route path="word" element={<ParentInformationWord />}></Route>
                </Route>
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    );
}
