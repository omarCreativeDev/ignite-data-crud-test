import axios from 'axios';
import { API_BASE } from '../constants';
import { GetUsersResponse, User } from './interfaces.ts';

export const createUser = async (user: Omit<User, 'id'>) => {
  return await axios.post<string>(API_BASE, user);
};

export const getUsers = async () => {
  const { data } = await axios.get<GetUsersResponse>(API_BASE);
  return data;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  return await axios.put(`${API_BASE}/${id}`, data);
};
