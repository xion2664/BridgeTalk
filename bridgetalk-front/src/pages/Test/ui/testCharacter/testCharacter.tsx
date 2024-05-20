// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Canvas, extend } from '@react-three/fiber';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { CameraControls } from '@/pages/child/ui/talk/components/cameraControl';
// import { Dino } from './components/dino';
// import { Dino2 } from './components/dino2';
// import * as S from './styles/character';

// extend({ OrbitControls });

// export function TestCharacter() {
//   // Navigate
//   const navigate = useNavigate();

//   return (
//     <S.Container>
//       <div className="three">
//         <div className="header">
//           <img src="/assets/flag/viet.png" alt="Vietnam Flag" />
//           <img src="/assets/flag/kor.png" alt="Korea Flag" />
//         </div>
//         <Canvas camera={{ position: [0, 0, 1.2], fov: 50 }}>
//           <ambientLight intensity={2} />
//           <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//           <pointLight position={[-10, -10, -10]} />
//           <Dino position={[-0.5, -0.4, -5]} onClick={() => navigate('/dress')} />
//           <Dino2 position={[0.5, -0.4, -5]} />
//           <CameraControls />
//         </Canvas>
//       </div>
//     </S.Container>
//   );
// }

export function TestCharacter() {
  return <></>;
}
