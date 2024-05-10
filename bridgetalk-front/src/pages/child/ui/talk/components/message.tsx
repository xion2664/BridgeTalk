import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '@/shared';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraControls } from '@/pages/child/ui/talk/components/cameraControl';
import { Dino } from '@/pages/child/ui/talk/components/dino';
import * as S from '@/styles/child/talk/message.style';

extend({ OrbitControls });

export function Message() {
  const { id } = useParams();
  const [voiceData, setVoiceData] = useState('');

  useEffect(() => {
    const fetchVoiceData = async () => {
      try {
        const response = await customAxios.get(`/letters/${id}`, {
          responseType: 'blob',
        });
        setVoiceData(URL.createObjectURL(response.data));
        console.log('API Response Status Code:', response.status); // 콘솔에 상태 코드 출력
      } catch (error) {
        console.error('Failed to fetch voice data:', error);
      }
    };

    if (id) {
      fetchVoiceData();
    }
  }, [id]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current!.play();
      console.log('play');
    }
  }, [voiceData]);

  return (
    <S.Container>
      <div className="message">
        {/* <div className="message__content">message</div> */}
        <div className="message__reader">
          <div className="message__reader-talk">message</div>
          <div className="message__reader-dino">
            <Canvas camera={{ position: [0, 0, 1.2], fov: 50 }}>
              <ambientLight intensity={2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Dino />
              <CameraControls />
            </Canvas>
            <span>익명의 다이노</span>
            <audio ref={audioRef} src={voiceData} controls autoPlay />
          </div>
        </div>
      </div>
    </S.Container>
  );
}
