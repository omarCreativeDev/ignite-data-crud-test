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

    if (lastName.trim().length && !isFutureDate()) {
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

  const isLastNameInValid = !isPristine && !lastName.trim().length;

  const isFutureDate = () => dayjs(dateOfBirth).isAfter(dayjs(), 'day');
  const isDateInvalid = () => !dayjs(dateOfBirth).isValid();
  const isDobInValid = isFutureDate() || isDateInvalid();
  const dobErrorMessage = () => {
    if (isDateInvalid()) return 'Invalid date format';
    if (isFutureDate()) return 'Date cannot be in the future';
  };

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
            helperText={dobErrorMessage()}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleCloseModal} color="primary" variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLastNameInValid || isDobInValid || status === 'pending'}
          variant="contained"
          color="primary"
        >
          {status === 'pending' ? 'Saving...' : buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
