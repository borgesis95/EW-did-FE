import {
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { StyledDialog, StyledDialogTitle } from '../Dialog/CDialog';
import { useState } from 'react';
import { AssetDto, SourceEnergyEnum, createAssetApi } from '@/api/assets';
import { DatePicker } from '@mui/x-date-pickers';
interface AddAssetDialogProps {
  open: boolean;
  handleToggle: () => void;
  onSuccess: () => void;
}

function AddAssetDialog({
  open,
  handleToggle,
  onSuccess
}: AddAssetDialogProps) {
  const [bodyAsset, setBodyAsset] = useState<AssetDto>();

  const handleChange = (key: string, value: string | SourceEnergyEnum) => {
    setBodyAsset({
      ...bodyAsset,
      [key]: value
    });
  };

  const handleConfirm = () => {
    createAssetApi(bodyAsset).then(() => {
      onSuccess();
    });
  };

  const isDisabled = () => {
    if (bodyAsset?.nickname && bodyAsset?.date && bodyAsset?.source) {
      return false;
    }

    return true;
  };
  return (
    <StyledDialog maxWidth="lg" open={open} onClose={handleToggle}>
      <StyledDialogTitle id="customized-dialog-title" onClose={handleToggle}>
        Add Assets
      </StyledDialogTitle>
      <DialogContent dividers className="p-8">
        <div className="grid grid-cols-12 gap-8">
          <TextField
            className="col-span-12"
            id="deviceNickname"
            label="Nickname device"
            variant="outlined"
            onChange={(e) => handleChange('nickname', e.target.value)}
          />
          <DatePicker
            className="col-span-12"
            label="Date"
            onChange={(e: string) => handleChange('date', e)}
          />{' '}
          <Select
            className="col-span-12"
            id="typeOfEnergy"
            label="Casd"
            placeholder="Choose type of energy you provide"
            onChange={(e) =>
              handleChange('source', e.target.value as SourceEnergyEnum)
            }
          >
            <MenuItem value={SourceEnergyEnum.Solar}>Solar</MenuItem>
            <MenuItem value={SourceEnergyEnum.Wind}>Wind</MenuItem>
            <MenuItem value={SourceEnergyEnum.Battery}>Battery</MenuItem>
          </Select>
          {bodyAsset?.source == SourceEnergyEnum.Battery && (
            <TextField
              id="kwStorage"
              label="KW Storage"
              className="col-span-12"
              type="number"
              onChange={(e) => handleChange('kw', e.target.value)}
            ></TextField>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirm} disabled={isDisabled()}>
          Save changes
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default AddAssetDialog;
