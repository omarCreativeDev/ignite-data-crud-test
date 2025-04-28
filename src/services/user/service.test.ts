import axios from 'axios';
import { API_BASE } from '../constants';
import { User } from './interfaces';
import { createUser, getUsers } from './service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const newUser: Omit<User, 'id'> = {
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1995-05-10'
    };
    mockedAxios.post.mockResolvedValueOnce({ data: 'User created' });

    const result = await createUser(newUser);

    expect(mockedAxios.post).toHaveBeenCalledWith(API_BASE, newUser);
    expect(result.data).toBe('User created');
  });

  it('should fetch users', async () => {
    const users = [{ id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' }];
    mockedAxios.get.mockResolvedValueOnce({ data: users });

    const result = await getUsers();

    expect(mockedAxios.get).toHaveBeenCalledWith(API_BASE);
    expect(result).toEqual(users);
  });
});
