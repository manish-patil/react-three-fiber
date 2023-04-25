import { useState, useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Stats, OrbitControls, useHelper, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import Box from './Box';
import Balls from './Balls';

extend({ UnrealBloomPass });

const Light = ({ position, color }) => {
  const lightRef = useRef(null);
  useHelper(lightRef, THREE.DirectionalLightHelper, 1, 'red');

  return (
    <directionalLight
      ref={lightRef}
      position={position}
      color={color}
      castShadow
    ></directionalLight>
  );
};

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 15] }}>
      <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={0.6} radius={0.9} />
      </Effects>
      <color attach='background' args={['#06395c']} />
      <ambientLight intensity={0.3} />
      <Light position={[0, 10, 1]} color='white' />
      <Box position={[0.75, 1, 0]} wireframe={true} />
      <Box position={[-0.75, 1, 0]} />
      <Balls />
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <circleGeometry args={[10]} />
        <meshStandardMaterial color='white' side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <Stats />
      <gridHelper />
    </Canvas>
  );
}
