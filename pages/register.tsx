import Head from 'next/head';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { createUserApi, RegistrationUser } from '@/api/user';
import { initWeb3 } from './login';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BlockchainContext } from '@/contexts/BlockchainContext';
let web3: Web3 | undefined = undefined; // Will hold the web3 instance

function Register() {
  const [body, setBody] = useState<RegistrationUser>();
  const router = useRouter();
  const blockchainParams = useContext(BlockchainContext);

  useEffect(() => {}, []);

  const handleChange = (key: string, value: string) => {
    setBody({
      ...body,
      [key]: value
    });
  };

  const handleSignup = async () => {
    if (!web3) {
      web3 = await initWeb3();
    }

    const request: RegistrationUser = {
      ...body,
      address: blockchainParams.accounts[0]
    };

    console.log('blockchainParams');
    createUserApi(request).then((response) => {
      router.push('/login');
    });
  };

  return (
    <>
      <div>
        <Head>
          <title>Sign in </title>
        </Head>
        <div className="flex justify-center items-center p-14">
          <Container maxWidth="sm">
            <Box textAlign="center" className="flex justify-center">
              <img
                alt="ewlogo"
                height={350}
                width={350}
                src="/static/images/logo-app.png"
              />
            </Box>
            <Typography variant="h3" className="flex justify-center !my-4 ">
              Sign up
            </Typography>

            <FormControl fullWidth>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                onChange={(event) =>
                  handleChange('username', event.currentTarget.value)
                }
              />
              <TextField
                style={{ marginTop: 8 }}
                id="email"
                label="Email"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) =>
                  handleChange('email', event.currentTarget.value)
                }
              />

              <div className="flex justify-end mt-4">
                <Button
                  variant="contained"
                  style={{ width: '30%' }}
                  onClick={handleSignup}
                >
                  Sign up
                </Button>
              </div>
            </FormControl>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Register;
