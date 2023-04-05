import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  MenuItem,
  Select,
  TextField,
  styled
} from '@mui/material';
import { StyledDialog, StyledDialogTitle } from '../Dialog/CDialog';
import { useState } from 'react';
import { CreateAssetsRequest, SourceEnergyEnum } from '@/api/assets';
interface AddAssetDialogProps {
  open: boolean;
  handleToggle: () => void;
  handleConfirm: () => void;
}

function AddAssetDialog({
  open,
  handleToggle,
  handleconfirm
}: AddAssetDialogProps) {
  const [bodyAsset, setBodyAsset] = useState<CreateAssetsRequest>();

  const handleChange = (key: string, value: string | SourceEnergyEnum) => {
    setBodyAsset({
      ...bodyAsset,
      [key]: value
    });
  };

  const handleConfirm = () => {
    console.log('body', bodyAsset);
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
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Select
            className="col-span-12"
            labelId="typeOfEnergy"
            id="typeOfEnergy"
            label="Age"
            placeholder="Choose type of energy you provide"
            onChange={(e) =>
              handleChange('source', e.target.value as SourceEnergyEnum)
            }
          >
            <MenuItem value={SourceEnergyEnum.Solar}>Solar</MenuItem>
            <MenuItem value={SourceEnergyEnum.Wind}>Wind</MenuItem>
          </Select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirm}>
          Save changes
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default AddAssetDialog;
