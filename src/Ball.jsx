import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Ball = ({ position, go, onEnd }) => {
  const radius = 0.5;
  const ref = useRef();
  const ball = useMemo(() => new THREE.SphereGeometry(radius), []);

  useFrame((_, delta) => {
    if (go === true) {
      ref.current.position.y -= delta;
      if (ref.current.position.y < -radius) {
        ref.current.visible = false;
        onEnd();
      }
    }
  });

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      geometry={ball}
      position={position}
    >
      <meshBasicMaterial side={2} color={[0.1, 2, 4]} toneMapped={false} />
      <axesHelper args={[1]} />
    </mesh>
  );
};

export default Ball;
