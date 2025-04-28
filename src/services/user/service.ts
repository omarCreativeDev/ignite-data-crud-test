import axios from 'axios';
import { API_BASE } from '../constants';
import { User } from './interfaces.ts';

export const createUser = async (user: Omit<User, 'id'>) => {
  return await axios.post<string>(API_BASE, user);
};
