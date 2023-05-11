import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  styled,
  Avatar,
  alpha,
  ListItemAvatar
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  convertCentToEth as convertEurToEth,
  convertEthToCent,
  convertEurToCent,
  convertCentToEth as convertEuroToEth
} from '@/utils/utils';
import { getAverage } from '@/api/grid';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

interface AccountBalanceProps {
  blockchainParams: any;
}

interface Balance {
  cent: number;
  eth: number;
}

function AccountBalance({ blockchainParams }: AccountBalanceProps) {
  const subscribe = () => {
    const contract = blockchainParams.contract;
    contract.events
      .TransferReceived({})
      .on('data', async function (event) {
        getBalance();
        getMoneyToPay();
      })
      .on('error', console.error);

    contract.events
      .MoneyReceived({})
      .on('data', async function (event) {
        getBalance();
        getMoneyToPay();
      })
      .on('error', console.error);
  };

  const [balance, setBalance] = useState<Balance>();
  const [remainToPay, setRemainToPay] = useState<number>();
  const [average, setAveage] = useState<{
    bids: number;
    offers: number;
  }>();

  useEffect(() => {
    if (blockchainParams) {
      subscribe();
      getBalance();
      getMoneyToPay();
      fetchAverage();
    }
  }, [blockchainParams]);

  const fetchAverage = () => {
    getAverage().then((response) => {
      setAveage(response.data.data);
    });
  };

  const getBalance = async () => {
    const account = blockchainParams.accounts[0].toLowerCase();
    const value = await blockchainParams.web3.eth.getBalance(account);

    const eth_balance = parseInt(
      blockchainParams.web3.utils.fromWei(value, 'ether')
    );

    const cent_balance = convertEthToCent(eth_balance);

    setBalance({
      eth: eth_balance,
      cent: cent_balance
    });
  };

  const sendMoney = async () => {
    const absValue = Math.abs(remainToPay); // convert in euro

    const ethereumPrice = convertEurToEth(absValue).toString();
    const centPrice = absValue * 100;

    const value = blockchainParams.web3.utils.toWei(ethereumPrice, 'ether');

    const contract = blockchainParams.contract;
    const account = blockchainParams.accounts[0].toLowerCase();

    await contract.methods
      .pay(parseInt(centPrice.toFixed(2)))
      .send({ from: account, value: value });
  };

  const receiveMoney = async () => {
    const account = blockchainParams.accounts[0].toLowerCase();
    const contract = blockchainParams.contract;

    const cent = convertEurToCent(remainToPay);
    const eth = convertEuroToEth(remainToPay);
    const wei = blockchainParams.web3.utils.toWei(eth.toString());

    await contract.methods
      .withDrawMoney(account, cent, wei)
      .send({ from: account });
  };

  const getMoneyToPay = async () => {
    const account = blockchainParams.accounts[0].toLowerCase();

    const value = await blockchainParams.contract.methods
      .getPaymentTransaction(account)
      .call();

    const remainToPay = value / 100;
    setRemainToPay(remainToPay);
  };

  /**TODO DELETE */
  const resetPayment = async () => {
    await blockchainParams.contract.methods.resetPaymaent().call();
  };

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={12}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
              className="mt-8"
            >
              Account Balance: {balance?.eth} ETH / {balance?.cent} €
            </Typography>

            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Average offer: {average?.offers / 100} € /KW
            </Typography>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Average bids: {average?.bids / 100} € /KW
            </Typography>
            <Box>
              <Typography variant="h3" gutterBottom>
                You have to{' '}
                {remainToPay > 0
                  ? `receive ${remainToPay}`
                  : `pay ${Math.abs(remainToPay)}`}
                €
              </Typography>
            </Box>
            <Box>
              <Grid sm item style={{ marginTop: 32 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={remainToPay == 0}
                  onClick={remainToPay > 0 ? receiveMoney : sendMoney}
                  className="mt-8"
                >
                  {remainToPay > 0 ? 'Receive' : 'Pay'}
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
