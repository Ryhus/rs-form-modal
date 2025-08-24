import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect, afterEach } from 'vitest';

import Modal from './Modal';

vi.mock('@/components', () => ({
  UncontrolledForm: () => <div>UncontrolledForm Mock</div>,
  ControlledForm: () => <div>ControlledForm Mock</div>,
}));

describe('Modal', () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-overlay';
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
    vi.restoreAllMocks();
  });

  it('renders UncontrolledForm when modalType is "modal1"', () => {
    render(<Modal closeModal={vi.fn()} modalType="modal1" />);
    expect(screen.getByText('UncontrolledForm Mock')).toBeInTheDocument();
  });

  it('renders ControlledForm when modalType is "modal2"', () => {
    render(<Modal closeModal={vi.fn()} modalType="modal2" />);
    expect(screen.getByText('ControlledForm Mock')).toBeInTheDocument();
  });

  it('calls closeModal when the close button is clicked', () => {
    const mockClose = vi.fn();
    render(<Modal closeModal={mockClose} modalType="modal1" />);

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('calls closeModal when Escape key is pressed', () => {
    const mockClose = vi.fn();
    render(<Modal closeModal={mockClose} modalType="modal1" />);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('calls closeModal when clicking outside the modal', () => {
    const mockClose = vi.fn();
    render(<Modal closeModal={mockClose} modalType="modal1" />);

    fireEvent.mouseDown(document.body);
    expect(mockClose).toHaveBeenCalledTimes(1);

    const modalDiv = screen.getByText('UncontrolledForm Mock').parentElement;
    expect(modalDiv).not.toBeNull();

    fireEvent.mouseDown(modalDiv as HTMLElement);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
