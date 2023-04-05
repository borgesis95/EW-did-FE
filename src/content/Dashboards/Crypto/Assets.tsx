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
  styled
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AvatarWrapper, CardAddAction } from './Offers';
import { useState } from 'react';
import AddDerDialog from '@/components/AddDerDialog';
import AddAssetDialog from '@/components/AddAssetDialog/AddAssetDialog';

interface AssetsProps {
  blockchainParams: any;
}

function Assets({ blockchainParams }: AssetsProps) {
  const [isCreateAssetOpen, setIsCreateAssetOpen] = useState<boolean>(false);

  const handleDialogToggle = () => {
    setIsCreateAssetOpen(!isCreateAssetOpen);
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
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Click to add a new asset">
            <CardAddAction onClick={handleDialogToggle}>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
      <AddAssetDialog
        handleConfirm={handleDialogToggle}
        handleToggle={handleDialogToggle}
        open={isCreateAssetOpen}
      ></AddAssetDialog>
      {/* <AddOfferDialog
      handleToggle={handleDialogToggle}
      handleConfirm={handleConfirm}
      open={isDialogOpen}
    /> */}
    </>
  );
}

export default Assets;
