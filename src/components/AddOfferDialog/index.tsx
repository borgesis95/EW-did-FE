import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAssets } from '@/store/slices/assets.slice';
import TimeSlot from '../TimeSlot/TimeSlot';
import { useState } from 'react';

interface AddDerDialogProps {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: (form: IOfferForm) => void;
}

export interface TimeSlotDto {
  startTime: string;
  endTime: string;
  quantity: number;
  price: number;
}
export interface IOfferForm {
  price: number;
  asset: string;
  quantity: string;
  startDate: string;
  endDate: string;
  timeSlot: TimeSlotDto[];
}

const TIMESLOT_INITIAL: TimeSlotDto = {
  price: 0,
  quantity: 0,
  startTime: '',
  endTime: ''
};

function AddOfferDialog({
  open,
  handleToggle,
  handleConfirm
}: AddDerDialogProps) {
  const [form, setForm] = React.useState<IOfferForm>();
  const [timeSlotArray, setTimeSlotArray] = useState<TimeSlotDto[]>([
    TIMESLOT_INITIAL
  ]);

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

  const onAddNewTimeSlot = (slot: TimeSlotDto) => {
    setTimeSlotArray([slot, ...timeSlotArray]);
  };

  const timeSlotRender = () => {
    return timeSlotArray.map((_, index) => {
      return (
        <TimeSlot
          fascia={`f${index}`}
          key={index}
          onAddNewTimeSlot={onAddNewTimeSlot}
        />
      );
    });
  };

  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>Add new offer</DialogTitle>
      <DialogContent>
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
          {timeSlotRender()}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>Delete</Button>
        <Button onClick={onConfirm}>Create offer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddOfferDialog;
