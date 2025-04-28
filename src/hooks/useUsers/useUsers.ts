import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../../services/user/interfaces.ts';
import { createUser, getUsers, updateUser } from '../../services/user/service';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: User }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
