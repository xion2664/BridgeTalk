import { Routes, Route, Navigate } from 'react-router-dom';
import { TeestZustand, Test, TestCamera, TestDraw, TestPuzzle, TestVoice, TestWordcloud, ErrorPage } from '@/pages';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Test />}>
                <Route path="/" element={<Navigate to={'/camera'} />} />
                <Route path="camera" element={<TestCamera />} />
                <Route path="draw" element={<TestDraw />} />
                <Route path="puzzle" element={<TestPuzzle />} />
                <Route path="voice" element={<TestVoice />} />
                <Route path="wordcloud" element={<TestWordcloud />} />
                <Route path="zustand" element={<TeestZustand />} />
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    );
}
