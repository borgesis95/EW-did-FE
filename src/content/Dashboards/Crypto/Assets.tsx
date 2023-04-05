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
import { useEffect, useState } from 'react';
import AddAssetDialog from '@/components/AddAssetDialog/AddAssetDialog';
import { AssetDto, SourceEnergyEnum, getAssetsApi } from '@/api/assets';

interface AssetsProps {
  blockchainParams: any;
}

function Assets({ blockchainParams }: AssetsProps) {
  const [isCreateAssetOpen, setIsCreateAssetOpen] = useState<boolean>(false);
  const [assetsList, setAssetsList] = useState<AssetDto[]>();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    getAssetsApi().then((response) => {
      setAssetsList(response.data.data);
    });
  };

  const handleDialogToggle = () => {
    setIsCreateAssetOpen(!isCreateAssetOpen);
  };

  const handleConfirmCreationAssets = () => {
    handleDialogToggle();
  };

  const renderAssetList = () => {
    return assetsList?.map((asset, index) => {
      return (
        <Grid key={index} xs={12} sm={6} md={3} item>
          <Card
            key={index}
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                {asset.source == SourceEnergyEnum.Solar ? (
                  <img alt="BTC" src="/static/images/windmill.png" />
                ) : (
                  <img alt="BTC" src="/static/images/solar-panel.png" />
                )}
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                {asset?.nickname || 'DID'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
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
        {renderAssetList()}
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
        onSuccess={handleDialogToggle}
        handleToggle={handleConfirmCreationAssets}
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
