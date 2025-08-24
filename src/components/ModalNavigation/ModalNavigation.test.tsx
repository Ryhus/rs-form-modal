import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalNavigation from './ModalNavigation';

describe('ModalNavigation', () => {
  it('renders both modal buttons', () => {
    const mockOpenModal = vi.fn();
    render(<ModalNavigation openModal={mockOpenModal} />);

    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();
    expect(screen.getByText('Controlled')).toBeInTheDocument();
  });

  it('calls openModal with "modal1" when Uncontrolled button is clicked', () => {
    const mockOpenModal = vi.fn();
    render(<ModalNavigation openModal={mockOpenModal} />);

    const uncontrolledButton = screen.getByText('Uncontrolled');
    fireEvent.click(uncontrolledButton);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModal).toHaveBeenCalledWith('modal1');
  });

  it('calls openModal with "modal2" when Controlled button is clicked', () => {
    const mockOpenModal = vi.fn();
    render(<ModalNavigation openModal={mockOpenModal} />);

    const controlledButton = screen.getByText('Controlled');
    fireEvent.click(controlledButton);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModal).toHaveBeenCalledWith('modal2');
  });
});
