import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AddDerDialogProps {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: () => void;
}

function AddDerDialog({
  open,
  handleToggle,
  handleConfirm
}: AddDerDialogProps) {
  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>Aggiungi DER</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vuoi aggiungere un nuovo DER al tuo portafoglio?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>Cancella</Button>
        <Button onClick={handleConfirm}>Sì</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDerDialog;
