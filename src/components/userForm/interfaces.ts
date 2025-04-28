import { User } from '../../services/user/interfaces';

export interface UserFormProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  handleMutation: (user: User) => void;
  status: string;
  user?: User;
}
