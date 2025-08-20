// TeamSetupScreen: initial screen for selecting members and rotation time
import React, { useState } from 'react';
import type { Team } from '../types/team';

interface Props {
  team: Team;
  onContinue: (team: Team) => void;
}

export const TeamSetupScreen: React.FC<Props> = ({ team, onContinue }) => {
  const [members, setMembers] = useState(team.members);
  const [rotationMinutes, setRotationMinutes] = useState(team.rotationMinutes);

  const handleCheck = (id: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, present: !m.present } : m));
  };

  const handleContinue = () => {
    onContinue({ members, rotationMinutes });
  };

  return (
    <div className='p-8 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>MobBot Setup</h1>
      <ul className='mb-4'>
        {members.map(m => (
          <li key={m.id} className='flex items-center mb-2'>
            <input
              type='checkbox'
              checked={m.present}
              onChange={() => handleCheck(m.id)}
              className='mr-2'
            />
            <span>{m.name}</span>
          </li>
        ))}
      </ul>
      <label className='block mb-2'>Rotation time (minutes):</label>
      <input
        type='number'
        min={1}
        value={rotationMinutes}
        onChange={e => setRotationMinutes(Number(e.target.value))}
        className='border rounded px-2 py-1 mb-4 w-full'
      />
      <button
        className='bg-blue-600 text-white px-4 py-2 rounded w-full'
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};
