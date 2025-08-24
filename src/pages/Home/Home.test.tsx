import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

vi.mock('@/components', () => ({
  ModalNavigation: ({ openModal }: { openModal: (t: string) => void }) => (
    <button onClick={() => openModal('test-modal')}>Open Modal</button>
  ),
  Modal: ({
    closeModal,
    modalType,
  }: {
    closeModal: () => void;
    modalType: string;
  }) => (
    <div data-testid="modal">
      <span>Modal Type: {modalType}</span>
      <button onClick={closeModal}>Close</button>
    </div>
  ),
  UserList: () => <div data-testid="user-list">User List</div>,
}));

describe('Home component', () => {
  it('renders ModalNavigation and UserList initially', () => {
    render(<Home />);
    expect(screen.getByText('Open Modal')).toBeInTheDocument();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });

  it('renders Modal when a modal is opened', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Open Modal'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.queryByTestId('user-list')).not.toBeInTheDocument();
  });

  it('closes Modal and shows ModalNavigation + UserList again', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Open Modal'));
    fireEvent.click(screen.getByText('Close'));

    expect(screen.getByText('Open Modal')).toBeInTheDocument();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });
});
