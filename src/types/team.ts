// Team and member types for MobBot
export type TeamMember = {
  id: string;
  name: string;
  present: boolean;
};

export type Team = {
  members: TeamMember[];
  rotationMinutes: number;
};
