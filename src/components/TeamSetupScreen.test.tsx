import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TeamSetupScreen } from './TeamSetupScreen';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import type { Team } from '../types/team';

describe('TeamSetupScreen', () => {
  let team: Team;
  let onContinue: (team: Team) => void;

  beforeEach(() => {
    team = {
      members: [
        { id: '1', name: 'Alice', present: true },
        { id: '2', name: 'Bob', present: true },
      ],
      rotationMinutes: 10,
    };
    onContinue = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders team members with checkboxes', () => {
    render(<TeamSetupScreen team={team} onContinue={onContinue} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('allows unchecking a member', () => {
    render(<TeamSetupScreen team={team} onContinue={onContinue} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('calls onContinue with updated team', () => {
    render(<TeamSetupScreen team={team} onContinue={onContinue} />);
    fireEvent.change(screen.getByLabelText(/Rotation time/), { target: { value: '15' } });
    fireEvent.click(screen.getByText('Continue'));
    expect(onContinue).toHaveBeenCalledWith({
      members: team.members,
      rotationMinutes: 15,
    });
  });
});
