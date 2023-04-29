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
import { convertCentToEth, convertEthToCent } from '@/utils/utils';

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

function AccountBalance({ blockchainParams }: AccountBalanceProps) {
  // const theme = useTheme();
  const [balance, setBalance] = useState<string>();
  const [remainToPay, setRemainToPay] = useState<number>();

  useEffect(() => {
    if (blockchainParams) {
      getBalance();
      getMoneyToPay();
    }
  }, [blockchainParams]);

  const getBalance = async () => {
    const account = blockchainParams.accounts[0].toLowerCase();
    const value = await blockchainParams.web3.eth.getBalance(account);

    console.log('VALUE', value);
    const converted = parseInt(
      blockchainParams.web3.utils.fromWei(value, 'ether')
    );

    console.log('convert', converted);
    const res = convertEthToCent(converted);

    console.log('converted', res);
    setBalance('11');
  };

  const sendMoney = async () => {
    console.log('eth', blockchainParams.web3.utils);

    const convertedPrice = convertCentToEth(parseInt(balance)).toString();

    const value = blockchainParams.web3.utils.toWei(convertedPrice, 'ether');

    console.log('value', value);
    const contract = blockchainParams.contract;
    const account = blockchainParams.accounts[0].toLowerCase();

    await contract.methods.pay().send({ from: account, value: value });
  };

  const getMoneyToPay = async () => {
    const account = blockchainParams.accounts[0].toLowerCase();

    console.log('blockchainParams', blockchainParams.contract);
    const value = await blockchainParams.contract.methods
      .getPaymentTransaction(account)
      .call();

    console.log('value', value);
    setRemainToPay(value);
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
            >
              Account Balance
            </Typography>
            <Box>
              {balance && (
                <Typography variant="h3" gutterBottom>
                  You have to {parseInt(balance) <= 0 ? 'receive' : 'pay'}{' '}
                  {parseInt(balance) / 100} €
                </Typography>
              )}
            </Box>
            <Box>
              <Grid sm item>
                <Button fullWidth variant="contained" onClick={sendMoney}>
                  {parseInt(balance) < 0 ? 'Receive' : 'Send'}
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
