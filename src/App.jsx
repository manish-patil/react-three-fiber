import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import Box from './Box';

const Light = ({ position, color }) => {
  return (
    <directionalLight position={position} color={color} castShadow>
      <mesh>
        <sphereGeometry args={[0.25]}></sphereGeometry>
        <meshBasicMaterial color={color} />
      </mesh>
    </directionalLight>
  );
};

export default function App() {
  return (
    <Canvas shadows camera={{ position: [-5, 3.5, 5], fov: 45 }}>
      <color attach='background' args={['#06395c']} />
      <ambientLight intensity={0.3} />
      <Light position={[0, 3, 1]} color='yellow' />
      <Box position={[0.75, 1, 0]} />
      <Box position={[-0.75, 1, 0]} />
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <circleGeometry args={[10]} />
        <meshStandardMaterial />
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
