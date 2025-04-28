import {
  CircularProgress,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useGetUsers, useUpdateUser } from '../../hooks/useUsers/useUsers';
import dayjs from 'dayjs';
import { User } from '../../services/user/interfaces';
import { UserForm } from '../userForm/UserForm';

export function UserList() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const { data, isFetching, isError } = useGetUsers();
  const { status, mutateAsync } = useUpdateUser();

  const handleMutation = async (user: User) => {
    await mutateAsync({ id: user?.id || '', data: user });
    setOpenModal(false);
  };

  if (isFetching) return <CircularProgress />;
  if (isError) return <p>Error loading users</p>;
  if (!data?.users.length) return <p>No users found.</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users.map((user) => {
            const { id = '', firstName, lastName, dateOfBirth } = user;

            return (
              <TableRow key={id}>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{dayjs(dateOfBirth).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon onClick={handleOpenModal} />
                    <UserForm
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      handleMutation={handleMutation}
                      status={status}
                      user={user}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
