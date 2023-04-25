import { useState, useEffect } from 'react';
import Ball from './Ball';

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
    console.log('useEffect');
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

export default Balls;
