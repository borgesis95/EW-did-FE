import axios from '@/config/axios_instance';
import {
  Box,
  Card,
  Container,
  Button,
  FormControl,
  styled
} from '@mui/material';
import { ProviderType } from 'iam-client-lib';
import { initWithMetamask, SignerService } from 'iam-client-lib';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { JwtToken } from '@/models/jwt';
import { BlockchainContext } from '@/contexts/BlockchainContext';
import { useContext } from 'react';
const MainContent = styled(Box)(
  () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(6)};
  `
);

const LoginWrapper = styled('div')(
  () => `
    display : flex;
    justify-content:center;
    `
);

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export const initWeb3 = async () => {
  if (!web3) {
    try {
      await (window as any).ethereum.enable();
      web3 = new Web3((window as any).ethereum);
      return web3;
    } catch (error) {
      window.alert('You need to allow MetaMask.');
      return;
    }
  }
};

function Login() {
  let signerService: SignerService;

  const router = useRouter();
  const blockchainParams = useContext(BlockchainContext);

  const initSignerService = async function (providerType: ProviderType) {
    switch (providerType) {
      case ProviderType.MetaMask:
        return initWithMetamask();
      default:
        return null;
    }
  };

  const onLogin = async (providerType: ProviderType) => {
    if (!web3) {
      web3 = await initWeb3();
    }

    const publicAddress = blockchainParams?.accounts[0]?.toLowerCase();
    axios.get<{ nonce: string }>(`user/${publicAddress}`).then((response) => {
      handleSignMessage(publicAddress, response.data.nonce);
    });
  };

  const handleSignMessage = async (address: string, nonce: string) => {
    try {
      const signature = await web3!.eth.personal.sign(
        `nonce_${nonce}`,
        address,
        ''
      );
      handleAuthenticate(address, signature);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuthenticate = async (address: string, signature: string) => {
    const body = {
      address: address,
      msg: signature
    };

    axios.post(`user/auth`, body).then((response) => {
      const jwtToken = response.data.data;
      const jwt_decoded = jwt.decode(jwtToken) as JwtToken;
      if (jwt_decoded) {
        const cookiesToSave = {
          user: jwt_decoded?.email,
          jwt: jwtToken
        };
        Cookies.set('user', JSON.stringify(cookiesToSave));
        router.push('/');
      }
    });
  };

  return (
    <>
      <Head>
        <title>Login Microgrid</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center" className="flex justify-center">
              <img
                alt="ewlogo"
                height={180}
                width={180}
                src="/static/images/ew-logo.png"
              />
            </Box>
            <Container maxWidth="sm">
              <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                <FormControl variant="outlined" fullWidth>
                  <LoginWrapper>
                    <img
                      alt="metamask"
                      height={80}
                      width={100}
                      src="/static/images/metamask-logo.png"
                    />
                    <Button
                      onClick={() => onLogin(ProviderType.MetaMask)}
                      style={{ alignSelf: 'center' }}
                      variant="contained"
                    >
                      Login with metamask
                    </Button>
                  </LoginWrapper>
                </FormControl>
              </Card>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
