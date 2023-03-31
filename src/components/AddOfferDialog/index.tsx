import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/lab';

interface AddDerDialogProps {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: (form: IOfferForm) => void;
}

const items = [
  {
    label: 'did:ethr:volta:0x26c7C921f5FF52B862357ced3084bB34b499AF33',
    value: 'did:ethr:volta:0x26c7C921f5FF52B862357ced3084bB34b499AF33'
  },
  {
    label: 'did:ethr:volta:0xfBEf6719d378f985111Dba028d533044b59af0D0',
    value: 'did:ethr:volta:0xfBEf6719d378f985111Dba028d533044b59af0D0'
  },
  {
    label: 'did:ethr:volta:0x27D49f054844Ef69209c739E0a5A179915cCB51D',
    value: 'did:ethr:volta:0x27D49f054844Ef69209c739E0a5A179915cCB51D'
  }
];

export interface IOfferForm {
  price: number;
  asset: string;
  quantity: string;
  startDate: string;
  endDate: string;
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
            style={{ marginTop: 20, marginBottom: 20 }}
            id="outlined-number"
            label="Price"
            placeholder="Price"
            type="number"
            onChange={(e) => handleChange('price', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            style={{ marginTop: 20, marginBottom: 20 }}
            id="outlined-number"
            label="quantity"
            placeholder="quantity"
            type="number"
            onChange={(e) => handleChange('quantity', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />

          <div className="flex gap-2">
            <DatePicker
              value={form?.startDate}
              label="Seleziona data inizio offerta"
              className="mt-8"
              renderInput={(params) => <TextField {...params} />}
              onChange={(value) => handleChange('startDate', value)}
            ></DatePicker>
            <DatePicker
              value={form?.endDate}
              label="Seleziona data fine offerta"
              className="mt-8"
              renderInput={(params) => <TextField {...params} />}
              onChange={(value) => handleChange('endDate', value)}
            ></DatePicker>
          </div>
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
