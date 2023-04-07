import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useSelector } from 'react-redux';
import { selectAssets } from '@/store/slices/assets.slice';

interface AddDerDialogProps {
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

function AddOfferDialog({
  open,
  handleToggle,
  handleConfirm
}: AddDerDialogProps) {
  const [form, setForm] = React.useState<IOfferForm>();

  const assets = useSelector(selectAssets);

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
            {assets.map((option) => (
              <MenuItem key={option.nickname} value={option.nickname}>
                {option.nickname}
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
