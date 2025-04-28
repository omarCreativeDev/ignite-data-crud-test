import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../services/user/service';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
