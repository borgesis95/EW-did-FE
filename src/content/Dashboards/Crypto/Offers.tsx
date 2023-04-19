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
import AddOfferDialog, { IOfferForm } from '@/components/AddOfferDialog';
import { OfferDto, Offers } from '@/models/offers';
import { format } from 'date-fns';
import CreateOffer from '@/components/CreateOfferDialog/CreateOffer';

export const AvatarWrapper = styled(Avatar)(
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

export const CardAddAction = styled(Card)(
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

interface OffersProps {
  blockchainParams: any;
}

function Offers({ blockchainParams }: OffersProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [offersList, setOffersList] = useState<Offers[]>();

  const [offersDto, setOffersDto] = useState<OfferDto[]>();

  useEffect(() => {
    if (blockchainParams) {
      fetchMyOffers();
      fetchOffersBdyId();
    }
  }, [blockchainParams]);

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  // const handleConfirm = async (form: IOfferForm) => {
  //   const contract = blockchainParams.contract;

  //   const asset = form.asset.split(':')[3];
  //   const startDate = new Date(form.startDate).getTime();
  //   const endDate = new Date(form.endDate).getTime();

  //   await contract.methods
  //     .createEnergyOffer(asset, form.price, startDate, endDate, form.quantity)
  //     .send({ from: blockchainParams.accounts[0] });

  //   handleDialogToggle();
  // };

  const handleConfirmCreationOffer = async (form: IOfferForm) => {
    console.log('new', form);
    const contract = blockchainParams.contract;

    await contract.methods
      .createOffer(blockchainParams.accounts[0], form.price, Date.now())
      .send({ from: blockchainParams.accounts[0] });

    handleDialogToggle();
    fetchMyOffers();
  };

  const fetchMyOffers = async () => {
    const contract = blockchainParams.contract;
    const res = await contract.methods.getOffers().call();

    console.log('res', res);

    const offersMapped: Offers[] = res.map((item) => {
      const res = item;
      return {
        asset: res.asset,
        price: res.price,
        startDate: res.startDate,
        endDate: res.endDate
      };
    });

    setOffersList(offersMapped);
  };

  const fetchOffersBdyId = async () => {
    const contract = blockchainParams.contract;
    const res = await contract.methods
      .getOffersByAddress(blockchainParams.accounts[0])
      .call();

    let result = res
      .map((item) => {
        const date = parseInt(item[2]);
        const offer: OfferDto = {
          address: item[0],
          price: item[1],
          date: format(new Date(date), 'dd/MM/yyyy HH:mm'),
          active: false
        };

        return offer;
      })
      .sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else return 1;
      });

    /*Offers have been ordered by time and only the recent one will be considered by aggregator */
    result[0].active = true;

    setOffersDto(result);

    return offersDto;
  };

  const renderOffer = () => {
    return offersDto?.map((offer, index) => {
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
                  <img alt="BTC" src="/static/images/solar-energy.png" />
                </AvatarWrapper>
                {offer.active && (
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
                  {offer.price}€/KW
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {offer.date}
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
        <Typography variant="h3">Offers</Typography>
      </Box>
      <Grid container spacing={3}>
        {renderOffer()}
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
      {/* <AddOfferDialog
        handleToggle={handleDialogToggle}
        handleConfirm={handleConfirm}
        open={isDialogOpen}
      /> */}
      <CreateOffer
        handleToggle={handleDialogToggle}
        handleConfirm={handleConfirmCreationOffer}
        open={isDialogOpen}
      />
    </>
  );
}

export default Offers;
