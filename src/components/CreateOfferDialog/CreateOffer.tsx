import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';

interface CreateOfferProps {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: (form: IOfferForm) => void;
}

export interface IOfferForm {
  price: number;
  asset: string;
  quantity: string;
  startDate: string;
  endDate: string;
}

function CreateOffer({ open, handleToggle, handleConfirm }: CreateOfferProps) {
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
      <DialogTitle>Create new offer</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            id="outlined-select-currency"
            label="Minimum price"
            type="number"
            onChange={(e) => handleChange('price', e.target.value)}
          ></TextField>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>Delete</Button>
        <Button onClick={onConfirm}>Create offer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOffer;
