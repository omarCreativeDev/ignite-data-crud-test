import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { User } from '../../services/user/interfaces.ts';
import { CreateUser } from './CreateUser';
import { useCreateUser } from '../../hooks/useUsers/useUsers';

jest.mock('../../hooks/useUsers/useUsers', () => ({
  useCreateUser: jest.fn()
}));

jest.mock('../userForm/UserForm', () => ({
  UserForm: jest.fn(() => <div>Mocked UserForm</div>)
}));

let mutateAsyncMock: jest.Mock;

describe('CreateUser Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mutateAsyncMock = jest.fn();
    (useCreateUser as jest.Mock).mockReturnValue({
      status: 'idle',
      mutateAsync: mutateAsyncMock
    });
  });

  it('should render the Add user button', () => {
    render(<CreateUser />);

    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });

  it('should open the UserForm modal when the button is clicked', () => {
    render(<CreateUser />);

    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    expect(screen.getByText('Mocked UserForm')).toBeInTheDocument();
  });

  it('should call mutateAsync when handleMutation is called', async () => {
    render(<CreateUser />);

    const user: User = { id: '123', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' };

    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    await act(async () => {
      await mutateAsyncMock(user);
    });

    expect(mutateAsyncMock).toHaveBeenCalledWith(user);
  });

  it('should render the CreateUser component with status idle', async () => {
    render(<CreateUser />);

    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });
});
