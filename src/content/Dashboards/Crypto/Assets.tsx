import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  Paper
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AvatarWrapper, CardAddAction } from './Offers';
import { useEffect, useState } from 'react';
import AddAssetDialog from '@/components/AddAssetDialog/AddAssetDialog';
import { AssetDto, SourceEnergyEnum, getAssetsApi } from '@/api/assets';
import { useDispatch } from 'react-redux';
import { fetchAssetsList, selectAssets } from '@/store/slices/assets.slice';
import { useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
interface AssetsProps {
  blockchainParams: any;
}

function Assets({ blockchainParams }: AssetsProps) {
  const [isCreateAssetOpen, setIsCreateAssetOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector(selectAssets);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    dispatch(fetchAssetsList());
  };

  const handleDialogToggle = () => {
    setIsCreateAssetOpen(!isCreateAssetOpen);
  };

  const handleConfirmCreationAssets = () => {
    handleDialogToggle();
  };

  const renderSourceIcon = (sourceType: SourceEnergyEnum) => {
    console.log('source', sourceType);

    switch (sourceType) {
      case SourceEnergyEnum.Solar:
        return (
          <img
            alt="solar"
            height={25}
            width={25}
            src="/static/images/solar-panel.png"
          />
        );

      case SourceEnergyEnum.Wind:
        return (
          <img
            alt="solar"
            height={40}
            width={40}
            src="/static/images/windmill.png"
          />
        );
      case SourceEnergyEnum.Battery:
        return (
          <img
            alt="solar"
            height={30}
            width={30}
            src="/static/images/battery.png"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">My assets</Typography>
      </Box>

      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogToggle}
        >
          Add asset
        </Button>
      </div>

      <Card>
        {' '}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Nickname</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Kw</TableCell>
                <TableCell align="left">load</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assets?.map((row) => (
                <TableRow
                  key={row.nickname}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Box textAlign="left" className="flex">
                      {renderSourceIcon(
                        parseInt(row.source) as SourceEnergyEnum
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.nickname}</TableCell>

                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    <Box textAlign="left" className="flex"></Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <AddAssetDialog
        onSuccess={handleDialogToggle}
        handleToggle={handleConfirmCreationAssets}
        open={isCreateAssetOpen}
      ></AddAssetDialog>
    </>
  );
}

export default Assets;
