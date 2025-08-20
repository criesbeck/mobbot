// Team data service (mock for now)
import type { Team } from '../types/team';

export const fetchTeam = async (): Promise<Team> => {
  // TODO: Replace with Firebase DB call
  return {
    members: [
      { id: '1', name: 'Alice', present: true },
      { id: '2', name: 'Bob', present: true },
      { id: '3', name: 'Cathy', present: true },
      { id: '4', name: 'Dave', present: true },
    ],
    rotationMinutes: 10,
  };
};
