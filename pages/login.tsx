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

function Login() {
  let signerService: SignerService;
  const router = useRouter();

  const initSignerService = async function (providerType: ProviderType) {
    switch (providerType) {
      case ProviderType.MetaMask:
        return initWithMetamask();
      default:
        return null;
    }
  };

  const onLogin = async (providerType: ProviderType) => {
    const { signerService: signService } = await initSignerService(
      providerType
    );
    signerService = signService;
    if (signerService) {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Login Microgrid</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <img alt="ewlogo" height={180} src="/static/images/ew-logo.png" />
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
