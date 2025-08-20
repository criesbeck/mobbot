import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainScreen } from './MainScreen';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import type { TeamMember } from '../types/team';

describe('MainScreen', () => {
  let members: TeamMember[];
  let onRotate: (members: TeamMember[]) => void;

  beforeEach(() => {
    members = [
      { id: '1', name: 'Alice', present: true },
      { id: '2', name: 'Cathy', present: true },
      { id: '3', name: 'Dave', present: true },
    ];
    onRotate = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders timer and team members', () => {
    render(<MainScreen members={members} rotationMinutes={10} onRotate={onRotate} />);
    expect(screen.getByText(/Mob Programming Rotation/)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Cathy')).toBeInTheDocument();
    expect(screen.getByText('Dave')).toBeInTheDocument();
  });

  it('starts and stops the timer', () => {
    render(<MainScreen members={members} rotationMinutes={10} onRotate={onRotate} />);
    const startBtn = screen.getByText('Start');
    fireEvent.click(startBtn);
    expect(screen.getByText('Stop')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('shows Rotate button when time is up', () => {
    render(<MainScreen members={members} rotationMinutes={0} onRotate={onRotate} />);
    expect(screen.getByText('Rotate')).toBeInTheDocument();
  });

  it('rotates team order on Rotate', () => {
    render(<MainScreen members={members} rotationMinutes={0} onRotate={onRotate} />);
    fireEvent.click(screen.getByText('Rotate'));
    expect(onRotate).toHaveBeenCalled();
  });
});
