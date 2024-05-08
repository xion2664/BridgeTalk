import { useRef, useEffect } from 'react';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export function Dino() {
  const gltf = useLoader(GLTFLoader, '/assets/dino/rainbow/cute.glb');
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

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={1} position={[0, -0.4, 0]} />;
}
