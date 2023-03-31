import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';

interface AddRequestdialog {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: (form: IRequestForm) => void;
}

export interface IRequestForm {
  quantityEnergy: number;
  price: number;
}

function AddRequestDialog({
  open,
  handleToggle,
  handleConfirm
}: AddRequestdialog) {
  const [form, setForm] = React.useState<IRequestForm>();

  const handleChange = (key: string, value: number | string) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const onConfirm = () => {
    handleConfirm(form);
  };

  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>Add new request</DialogTitle>
      <DialogContent style={{ height: 300, width: 600 }}>
        <FormControl fullWidth>
          <TextField
            style={{ marginTop: 20, marginBottom: 20 }}
            id="outlined-number"
            label="KW necessary"
            placeholder="KW necessary"
            type="number"
            onChange={(e) => handleChange('kw', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            style={{ marginTop: 20, marginBottom: 20 }}
            id="outlined-number"
            label="price  max"
            placeholder="price max"
            type="number"
            onChange={(e) => handleChange('price', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>cancel</Button>
        <Button onClick={onConfirm}>Create request</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddRequestDialog;
