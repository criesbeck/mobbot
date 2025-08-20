import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRouter } from './AppRouter';
import * as teamService from '../utilities/teamService';

describe('AppRouter', () => {
  beforeEach(() => {
    vi.spyOn(teamService, 'fetchTeam').mockResolvedValue({
      members: [
        { id: '1', name: 'Alice', present: true },
        { id: '2', name: 'Bob', present: true },
      ],
      rotationMinutes: 10,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading then setup screen', async () => {
    render(<AppRouter />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // Wait for team to load
    await screen.findByText('MobBot Setup');
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('navigates to main screen on continue', async () => {
    render(<AppRouter />);
    await screen.findByText('MobBot Setup');
    fireEvent.click(screen.getByText('Continue'));
    expect(screen.getByText(/Mob Programming Rotation/)).toBeInTheDocument();
  });
});
