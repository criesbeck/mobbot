// MainScreen: countdown timer, team rotation, and controls
import React, { useState, useRef, useEffect } from 'react';
import type { TeamMember } from '../types/team';

interface Props {
  members: TeamMember[];
  rotationMinutes: number;
  onRotate: (members: TeamMember[]) => void;
}

const shuffle = (arr: TeamMember[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const MainScreen: React.FC<Props> = ({ members, rotationMinutes, onRotate }) => {
  const [order, setOrder] = useState<TeamMember[]>(shuffle(members.filter(m => m.present)));
  const [timer, setTimer] = useState(rotationMinutes * 60);
  const [running, setRunning] = useState(false);
  const [warning, setWarning] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timer]);

  useEffect(() => {
    if (timer === 60) setWarning(true);
    if (timer === 0) {
      setAlarm(true);
      setRunning(false);
    }
  }, [timer]);

  const handleStart = () => {
    setRunning(true);
    setWarning(false);
    setAlarm(false);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleRotate = () => {
    const rotated = [...order.slice(1), order[0]];
    setOrder(rotated);
    setTimer(rotationMinutes * 60);
    setWarning(false);
    setAlarm(false);
    setRunning(false);
    onRotate(rotated);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className='p-8 max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Mob Programming Rotation</h2>
      <div className={`text-5xl font-mono mb-6 ${warning ? 'animate-pulse text-yellow-500' : ''} ${alarm ? 'text-red-600' : ''}`}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <button
        className={`px-4 py-2 rounded w-full mb-4 ${running ? 'bg-red-600' : 'bg-green-600'} text-white`}
        onClick={running ? handleStop : handleStart}
        disabled={alarm}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      {alarm && (
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded w-full mb-4'
          onClick={handleRotate}
        >
          Rotate
        </button>
      )}
      <ul className='mb-4'>
        {order.map((m, i) => (
          <li key={m.id} className={`py-2 px-4 rounded mb-2 ${i === 0 ? 'bg-blue-200 font-bold' : 'bg-gray-100'}`}>
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
