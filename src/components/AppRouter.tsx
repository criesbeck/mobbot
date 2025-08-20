// AppRouter: handles navigation between setup and main screens
import React, { useState, useEffect } from 'react';
import { TeamSetupScreen } from './TeamSetupScreen';
import { MainScreen } from './MainScreen';
import { fetchTeam } from '../utilities/teamService';
import type { Team } from '../types/team';

export const AppRouter: React.FC = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const load = async () => {
      const t = await fetchTeam();
      setTeam(t);
    };
    load();
  }, []);

  if (!team) return <div className='p-8'>Loading...</div>;

  return showMain ? (
    <MainScreen
      members={team.members}
      rotationMinutes={team.rotationMinutes}
      onRotate={members => setTeam({ ...team, members })}
    />
  ) : (
    <TeamSetupScreen
      team={team}
      onContinue={t => {
        setTeam(t);
        setShowMain(true);
      }}
    />
  );
};
