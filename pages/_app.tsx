import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import './index.css';
import Web3 from 'web3';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { AbiItem } from 'web3-utils';
import { BlockchainContext } from '@/contexts/BlockchainContext';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export { EW_CONTRACT_ABI, EW_CONTRACT_ADDRESS } from '../contracts/ew_contract';
import { EW_CONTRACT_ABI, EW_CONTRACT_ADDRESS } from '../contracts/ew_contract';
import it from 'date-fns/locale/it';
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface DerManagementProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

interface IBlockChainSettings {
  accounts: string[];
  web3: Web3;
  contract: any;
}

function DerManagementApp(props: DerManagementProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [blockchainSettings, setBlockchainSettings] =
    useState<IBlockChainSettings>();

  useEffect(() => {
    initializeBlockchain();
  }, []);

  const initializeBlockchain = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(
      EW_CONTRACT_ABI.abi as AbiItem[],
      EW_CONTRACT_ADDRESS
    );

    setBlockchainSettings({
      accounts: accounts,
      web3: web3,
      contract: contract
    });
  };

  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={it}>
      <BlockchainContext.Provider value={blockchainSettings}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>DER MANAGMENT</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <SidebarProvider>
            <ThemeProvider>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </SidebarProvider>
        </CacheProvider>
      </BlockchainContext.Provider>
    </LocalizationProvider>
  );
}

export default DerManagementApp;
