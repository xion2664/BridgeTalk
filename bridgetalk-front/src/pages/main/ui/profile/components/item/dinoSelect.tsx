import { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface DinoProps {
  idx: number;
  dinoNum: number;
  setDinoNum: any;
}

export function DinoSelect({ idx, dinoNum, setDinoNum }: DinoProps) {
  const [act, setAct] = useState<string>('idle');

  const gltf = useLoader(GLTFLoader, `/assets/dino/D${idx}/${act}.glb`);
  const mixer = useRef<AnimationMixer | null>(null);

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

  useEffect(() => {
    if (dinoNum === idx) {
      setAct('cute');
    } else if (dinoNum !== idx) {
      setAct('idle');
    }
  }, [dinoNum]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <primitive
      object={gltf.scene}
      scale={6}
      position={[0, -2, 0]}
      onClick={() => {
        setDinoNum(idx);
      }}
    />
  );
}
