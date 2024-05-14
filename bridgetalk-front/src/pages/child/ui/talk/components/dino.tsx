import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useTalkStore } from '@/pages/child/store';
import { postProfileLogin, useUserStore } from '@/pages/main';
import { getUUIDbyToken } from '@/shared';
import { getDinoEmotion } from '@/pages/child/model';

extend({ OrbitControls });

export function Dino() {
  const setIsTalking = useTalkStore((state) => state.setIsTalking);
  const emotion = useTalkStore((state) => state.emotion);
  const isEnd = useTalkStore((state) => state.isEnd);
  const [size, setSize] = useState<number>(1);
  const [dino, setDino] = useState<string>(sessionStorage.getItem('dino') ?? 'D1');
  const [act, setAct] = useState('idle');

  const gltf = useLoader(GLTFLoader, `/assets/dino/${dino}/${act}.glb`);
  const mixer = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    const sessionDino = sessionStorage.getItem('dino');

    if (sessionDino) {
      setDino(sessionDino);
    }

    if (!sessionDino) {
      postProfileLogin(getUUIDbyToken()).then((res) => {
        setDino(res.data.userDino);
        sessionStorage.setItem('dino', res.data.userDino);
      });
    }
  }, []);

  useEffect(() => {
    setAct(getDinoEmotion(emotion));
    console.log(getDinoEmotion(emotion));
  }, [emotion]);

  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      const action = mixer.current.clipAction(gltf.animations[0]);
      action.play();
    }
    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
      }
    };
  }, [gltf.animations, gltf.scene]);

  // useEffect(() => {
  //   function onWindowResize(width: number) {
  //     setSize(1);
  //     console.log(size);
  //   }

  //   window.addEventListener('resize', () => onWindowResize(window.innerWidth));

  //   return () => {
  //     window.removeEventListener('resize', () => onWindowResize(window.innerWidth));
  //   };
  // }, []);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <primitive
      onClick={() => {
        if (!isEnd) {
          console.log('{ 대화 시작 }');
          setIsTalking(true);
        }
      }}
      object={gltf.scene}
      scale={size}
      position={[0, -0.4, 0]}
    />
  );
}
