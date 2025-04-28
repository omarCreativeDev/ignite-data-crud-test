import { FormEvent, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import dayjs from 'dayjs';
import { UserFormProps } from './interfaces';

export function UserForm({ openModal, setOpenModal, handleMutation, status, user }: UserFormProps) {
  const isEditMode = Boolean(user);
  const buttonLabel = isEditMode ? 'Update User' : 'Create User';
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [isPristine, setIsPristine] = useState(!user);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPristine(false);

    if (lastName.trim().length && !isFutureDate(dateOfBirth)) {
      handleMutation({ ...user, firstName, lastName, dateOfBirth });
      handleCloseModal();
      resetForm();
      setIsPristine(true);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDateOfBirth('');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const isFutureDate = (date: string) => {
    return dayjs(date).isAfter(dayjs(), 'day');
  };

  const isLastNameInValid = !isPristine && !lastName.trim().length;
  const isDobInValid = isFutureDate(dateOfBirth);

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={isLastNameInValid}
            helperText={isLastNameInValid ? 'Last name is required' : ''}
          />
          <TextField
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            fullWidth
            margin="normal"
            error={isDobInValid}
            helperText={isDobInValid ? 'Date cannot be in the future' : ''}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleCloseModal} color="primary" variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={status === 'pending'}
          variant="contained"
          color="primary"
        >
          {status === 'pending' ? 'Saving...' : buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
