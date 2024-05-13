// WelcomePage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/start'); // 메인 페이지 경로로 변경하세요.
    }, 3000); // 3초 후에 이동

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to Our Website!</h1>
      <p>Loading your experience...</p>
    </div>
  );
}
