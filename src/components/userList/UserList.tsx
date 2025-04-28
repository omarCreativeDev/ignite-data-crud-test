import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import dayjs from 'dayjs';
import { useGetUsers } from '../../hooks/useUsers/useUsers';

export function UserList() {
  const { data, isFetching, isError } = useGetUsers();

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
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
