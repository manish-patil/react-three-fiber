import { useState, useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Stats, OrbitControls, useHelper, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import Box from './Box';

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

const ballPositions = () => {
  const positions = [];
  for (let i = 0; i < 5; i++) {
    positions.push([0, 10, 5]);
  }

  return positions;
};

const Balls = () => {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    setBalls(
      ballPositions().map((pos, idx) => ({
        idx: idx,
        position: pos,
        go: idx === ballPositions().length - 1,
      }))
    );
  }, []);

  const handleOnBallEnd = () => {
    setBalls((prev) => {
      prev.pop();

      return prev.map((ball, idx) => {
        return {
          ...ball,
          go: idx === prev.length - 1,
        };
      });
    });
  };

  return (
    <>
      {balls?.map((ball) => {
        return (
          <Ball
            key={ball.idx}
            position={ball.position}
            go={ball.go}
            onEnd={handleOnBallEnd}
          />
        );
      })}
    </>
  );
};

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
