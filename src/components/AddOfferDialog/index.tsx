import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, MenuItem } from '@mui/material';

interface AddDerDialogProps {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: (form: IOfferForm) => void;
}

const items = [
  {
    label: 'did 1',
    value: '2'
  },
  {
    label: 'did 2',
    value: '1'
  }
];

export interface IOfferForm {
  price: number;
  asset: string;
}

function AddOfferDialog({
  open,
  handleToggle,
  handleConfirm
}: AddDerDialogProps) {
  const [form, setForm] = React.useState<IOfferForm>();

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
      <DialogTitle>Add new offer</DialogTitle>
      <DialogContent style={{ height: 300, width: 600 }}>
        <FormControl fullWidth>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            onChange={(e) => handleChange('asset', e.target.value)}
          >
            {items.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            style={{ marginTop: 20 }}
            id="outlined-number"
            label="Price"
            placeholder="Price"
            type="number"
            onChange={(e) => handleChange('price', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>Cancella</Button>
        <Button onClick={onConfirm}>Crea offerta</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddOfferDialog;
