import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { imageUrls, glbUrls } from '../shared';

const basePath = '../../../public/assets';

export function AppPreloader() {
  const preloadImages = (fileNames: string[]) => {
    fileNames.forEach((fileName) => {
      const img = new Image();
      img.src = `${basePath}/${fileName}`;
    });
  };

  const preloadGLB = (fileName: string) => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        `${basePath}/${fileName}`,
        (gltf) => {
          resolve(gltf);
        },
        undefined,
        (error) => {
          reject(error);
        },
      );
    });
  };

  const preloadGLBs = async (fileNames: string[]) => {
    const promises = fileNames.map((fileName) => preloadGLB(fileName));
    await Promise.all(promises);
  };

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        preloadImages(imageUrls);
        await preloadGLBs(glbUrls);
      } catch (error) {
        console.error('Failed to preload assets:', error);
      }
    };

    preloadAssets();
  }, []);

  return <></>;
}
