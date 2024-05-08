import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';

extend({ OrbitControls });

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/assets/dino/DinoCute.glb');
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

  return <primitive object={gltf.scene} scale={1} position={[0, -1, 0]} />;
};

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, domElement);
    controls.minDistance = 1; // 최소 거리 제한
    controls.maxDistance = 20; // 최대 거리 제한
    return () => {
      controls.dispose();
    };
  }, [camera, domElement]);

  return null;
};

export function TestCharacter() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model />
      <CameraControls />
    </Canvas>
  );
}
