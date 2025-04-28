import { Button } from '@mui/material';
import { useState } from 'react';
import { useCreateUser } from '../../hooks/useUsers/useUsers';
import { User } from '../../services/user/interfaces';
import { UserForm } from '../userForm/UserForm';
import Styles from './CreateUser.module.css';

const { button, form } = Styles;

export function CreateUser() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const { status, mutateAsync } = useCreateUser();

  const handleMutation = async (user: User) => {
    await mutateAsync(user);
    setOpenModal(false);
  };

  return (
    <div className={form}>
      <Button onClick={handleOpenModal} variant="contained" className={button}>
        Add user
      </Button>
      <UserForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleMutation={handleMutation}
        status={status}
      />
    </div>
  );
}
