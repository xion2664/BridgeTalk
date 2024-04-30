import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cube } from '../../model/setCharacter/cube';

export function TestCharacter() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cube = new Cube();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    scene.add(cube.cube);
    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current?.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
}
