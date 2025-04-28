import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from './UserForm';
import { UserFormProps } from './interfaces';
import dayjs from 'dayjs';

const handleMutationMock = jest.fn();
const setOpenModalMock = jest.fn();

const defaultProps: UserFormProps = {
  openModal: true,
  setOpenModal: setOpenModalMock,
  handleMutation: handleMutationMock,
  status: 'idle',
  user: {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01'
  }
};

describe('UserForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form fields and buttons correctly', () => {
    render(<UserForm {...defaultProps} />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update User' })).toBeInTheDocument();
  });

  it('should show validation errors when submitting with empty required fields', async () => {
    render(<UserForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: 'Update User' }));

    expect(await screen.findByText('Last name is required')).toBeInTheDocument();
  });

  it('should show error for future date of birth', async () => {
    render(<UserForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText('Date of Birth'), {
      target: { value: dayjs().add(1, 'day').format('YYYY-MM-DD') }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Update User' }));

    expect(await screen.findByText('Date cannot be in the future')).toBeInTheDocument();
  });

  it('should call handleMutation with correct data when form is valid', async () => {
    render(<UserForm {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Update User' }));

    await waitFor(() =>
      expect(handleMutationMock).toHaveBeenCalledWith({
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01'
      })
    );
  });

  it('should disable the submit button when the status is "pending"', async () => {
    render(<UserForm {...defaultProps} status="pending" />);

    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
  });

  it('should close the modal when the Close button is clicked', async () => {
    render(<UserForm {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(setOpenModalMock).toHaveBeenCalledWith(false);
  });
});
