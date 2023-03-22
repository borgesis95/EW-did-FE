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
import { useEffect, useState } from 'react';
import { Demands } from '@/models/Demands';
import { format } from 'date-fns';
import AddRequestDialog, { IRequestForm } from '@/components/AddRequestDialog';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      margin: ${theme.spacing(2, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(5.5)};
      width: ${theme.spacing(5.5)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
      };
    
      img {
        // background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
      }
  `
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);

interface DemandsProps {
  blockchainParams: any;
}

function Demands({ blockchainParams }: DemandsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [DemandsList, setDemandsList] = useState<Demands[]>();

  useEffect(() => {
    if (blockchainParams) {
      //   fetchMyDemands();
    }
  }, [blockchainParams]);

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleConfirm = async (form: IRequestForm) => {
    const contract = blockchainParams.contract;
    console.log('price', form.kw);
    handleDialogToggle();
  };

  const fetchMyDemands = async () => {
    const contract = blockchainParams.contract;
    const res = await contract.methods.getDemands().call();

    const DemandsMapped: Demands[] = res.map((item) => {
      const res = item;
      return {
        asset: res.asset,
        price: res.price,
        startDate: res.startDate,
        endDate: res.endDate
      };
    });

    console.log('DemandsMaped', DemandsMapped);
    setDemandsList(DemandsMapped);
  };

  const renderDemands = () => {
    return DemandsList?.map((offer, index) => {
      var startDate = new Date(offer.startDate);
      const isValidStartDate =
        startDate instanceof Date && !isNaN(startDate.valueOf());

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
                <img alt="BTC" src="/static/images/ew-logo.png" />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                {offer.asset}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                BTC
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  {offer.price}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {isValidStartDate && format(startDate, 'it')} - end date
                </Typography>
              </Box>
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
        <Typography variant="h3">Demands</Typography>
      </Box>
      <Grid container spacing={3}>
        {renderDemands()}
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Click to add a new offer">
            <CardAddAction onClick={handleDialogToggle}>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
      <AddRequestDialog
        handleToggle={handleDialogToggle}
        handleConfirm={handleConfirm}
        open={isDialogOpen}
      />
    </>
  );
}

export default Demands;
