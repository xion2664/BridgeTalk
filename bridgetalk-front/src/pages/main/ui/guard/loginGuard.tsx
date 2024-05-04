import { decodeToken } from '@/shared';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

/**
 * 로그인시 첫 화면을 건너뛰게 하는 가드
 * @param param0
 */
export function LoginGuard({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (decodeToken('access') === null) {
      navigate('/start');
    } else {
      navigate(pathname);
    }
  }, []);

  return <>{children}</>;
}
