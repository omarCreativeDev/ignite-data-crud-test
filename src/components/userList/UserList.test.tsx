import { render, screen } from '@testing-library/react';
import { useGetUsers } from '../../hooks/useUsers/useUsers';
import { UserList } from './UserList';

jest.mock('../../hooks/useUsers/useUsers', () => ({
  useGetUsers: jest.fn(),
  useDeleteUser: jest.fn(),
  useUpdateUser: jest.fn().mockReturnValue({ status: 'idle', mutateAsync: jest.fn() })
}));

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading indicator when fetching users', () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false
    });

    render(<UserList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render error message when there is an error fetching users', () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true
    });

    render(<UserList />);

    expect(screen.getByText(/Error loading users/i)).toBeInTheDocument();
  });

  it('should display "No users found" when there are no users', () => {
    (useGetUsers as jest.Mock).mockReturnValue({
      data: { users: [] },
      isFetching: false,
      isError: false
    });

    render(<UserList />);

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it('should render a table with users when data is fetched', async () => {
    const mockUsers = [
      { id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' },
      { id: '2', firstName: 'Jane', lastName: 'Doe', dateOfBirth: '1992-02-02' }
    ];

    (useGetUsers as jest.Mock).mockReturnValue({
      data: { users: mockUsers },
      isFetching: false,
      isError: false
    });

    render(<UserList />);

    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();
    expect(screen.getByText('01/01/1990')).toBeInTheDocument();
    expect(screen.getByText('02/02/1992')).toBeInTheDocument();
  });
});
