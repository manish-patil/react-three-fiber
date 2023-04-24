import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Box(props) {
  const ref = useRef();

  const [rotate, setRotate] = useState(false);
  const geometry = useMemo(() => new THREE.BoxGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: 'lime',
        toneMapped: false,
        wireframe: props.wireframe || false,
      }),
    [props.wireframe]
  );

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * rotate;
    ref.current.rotation.y += 0.5 * delta * rotate;
  });

  return (
    <mesh
      position={props.position}
      ref={ref}
      onPointerDown={() => setRotate(!rotate)}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    >
      <axesHelper args={[1]} />
    </mesh>
  );
}
