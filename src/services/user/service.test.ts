import axios from 'axios';
import { API_BASE } from '../constants';
import { User } from './interfaces';
import { createUser } from './service';

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
});
