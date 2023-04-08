import { Button, IconButton, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TimeSlotDto } from '../AddOfferDialog';
import { useState } from 'react';

export interface TimeSlotProps {
  fascia: string;
  onAddNewTimeSlot: (body: TimeSlotDto) => void;
}

function TimeSlot({ fascia, onAddNewTimeSlot }: TimeSlotProps) {
  const [body, setBody] = useState<TimeSlotDto>();

  const addNewItem = () => {
    console.log('BODY', body);
    onAddNewTimeSlot(body);
  };

  const onValueChange = (key: string, value: string | number) => {
    setBody({
      ...body,
      [key]: value
    });
  };
  return (
    <div>
      <Typography variant="h5" component="h5" className="my-4 p-2">
        Slot {fascia}
      </Typography>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <TimePicker
            ampm={false}
            onChange={(value: string) => onValueChange('startTime', value)}
          ></TimePicker>
        </div>
        <div className="col-span-1">
          <TimePicker
            ampm={false}
            onChange={(value: string) => onValueChange('endTime', value)}
          ></TimePicker>
        </div>
        <div className="col-span-1">
          <TextField
            id="outlined-number"
            label="quantity"
            placeholder="quantity"
            type="number"
            onChange={(e: any) => onValueChange('quantity', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div className="col-span-1">
          <TextField
            id="outlined-number"
            label="price"
            placeholder="Price"
            type="number"
            onChange={(e) => onValueChange('price', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div className="col-span-1 flex justify-center">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addNewItem}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TimeSlot;
