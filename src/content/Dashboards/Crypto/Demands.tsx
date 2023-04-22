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
  Chip
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
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
  const [DemandsList, setDemandsList] = useState<IRequestForm[]>();

  useEffect(() => {
    if (blockchainParams) {
      fetchMyDemands();
      subscribe();
    }
  }, [blockchainParams]);

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const subscribe = () => {
    const contract = blockchainParams.contract;
    contract.events
      .OfferCreated({})
      .on('data', async function (event) {
        console.log(event.returnValues);
        fetchMyDemands();
      })
      .on('error', console.error);
  };

  const handleConfirm = async (form: IRequestForm) => {
    const contract = blockchainParams.contract;
    const account = blockchainParams.accounts[0].toLowerCase();
    await contract.methods
      .createBid(account, form.price, Date.now())
      .send({ from: account });
    handleDialogToggle();
  };

  const fetchMyDemands = async () => {
    const contract = blockchainParams.contract;
    const account = blockchainParams.accounts[0].toLowerCase();

    const res = await contract.methods.getBidsByAddress(account).call();

    if (res.length > 0) {
      const demands: IRequestForm[] = res
        .map((item) => {
          const res = item;

          return {
            price: res.maxPrice,
            quantityEnergy: res.quantityEnergy,
            date: format(
              new Date(parseInt(res.creationDate)),
              'dd/MM/yyyy HH:mm'
            )
          };
        })
        .sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          } else return 1;
        });

      demands[0].active = true;
      setDemandsList(demands);
    }
  };

  const renderDemands = () => {
    return DemandsList?.map((request, index) => {
      return (
        <Grid key={index} xs={12} sm={6} md={3} item>
          <Card
            key={index}
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <div className="flex justify-between">
                <AvatarWrapper>
                  <img alt="BTC" src="/static/images/tower.png" />
                </AvatarWrapper>
                {request.active && (
                  <Chip
                    className="self-center"
                    label="Active"
                    color="success"
                  />
                )}
              </div>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  {request.price}€/KW
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {request.date}
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
          <Tooltip arrow title="Click to add a new request">
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
