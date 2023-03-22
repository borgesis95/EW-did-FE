import Head from 'next/head';
import { useContext } from 'react';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Offers from '@/content/Dashboards/Crypto/Offers';
import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
import WatchList from '@/content/Dashboards/Crypto/WatchList';
import { useEffect, useState } from 'react';
import {
  Asset,
  AssetsService,
  initWithMetamask,
  SignerService
} from 'iam-client-lib';
import DIDTable from '@/components/DIDTable';
import { BlockchainContext } from '@/contexts/BlockchainContext';

interface DataAssets {
  loading: boolean;
  assets: Asset[];
}

let assService: AssetsService;

function DashboardMicrogrid() {
  const [assets, setAssets] = useState<DataAssets>({
    assets: [],
    loading: true
  });

  const [assetService, setAssetService] = useState<AssetsService>([]);
  const blockchainParams = useContext(BlockchainContext);

  useEffect(() => {
    // initMetamask();
  }, []);

  const initMetamask = async () => {
    const { connectToCacheServer } = await initWithMetamask();
    const { assetsService } = await connectToCacheServer();
    setAssetService(assetService);
    assService = assetsService;

    fetchAssets();
  };

  const fetchAssets = async () => {
    setAssets({
      assets: [],
      loading: true
    });

    const response = await assService.getOwnedAssets();
    setAssets({
      assets: response,
      loading: false
    });
  };

  const onCreateAsset = async () => {
    setAssets({
      ...assets,
      loading: true
    });
    const response = await assService?.registerAsset();
    console.log('response', response);
    fetchAssets();
  };
  return (
    <>
      <Head>
        <title>Microgrid management</title>
      </Head>
      <div className="p-8">
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item lg={12} paddingTop={20}>
              <DIDTable
                onCreateAsset={onCreateAsset}
                loading={assets?.loading}
                assets={assets?.assets}
              />
            </Grid>

            <Grid item lg={12} xs={12}>
              <Offers blockchainParams={blockchainParams} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

DashboardMicrogrid.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardMicrogrid;
