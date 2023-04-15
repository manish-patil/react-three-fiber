import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import Box from './Box';

const Light = ({ position, color }) => {
  return (
    <directionalLight position={position} color={color}>
      <mesh>
        <sphereGeometry args={[0.25]}></sphereGeometry>
        <meshBasicMaterial color={color} />
      </mesh>
    </directionalLight>
  );
};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1, 6] }}>
      <Box position={[-0.75, 1, 0]} name='A' wireframe={true} />
      <Box position={[0.75, 1, 0]} name='B' wireframe={false} />
      <Light position={[2, -3, -1]} color='white' />
      <Light position={[0, 3, 1]} color='yellow' />
      <Stats />
      <OrbitControls />
      <gridHelper args={[5, 5]} />
      <axesHelper args={[2]} />
    </Canvas>
  );
}
