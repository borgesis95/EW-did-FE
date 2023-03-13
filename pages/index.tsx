import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Wallets from '@/content/Dashboards/Crypto/Wallets';
import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
import WatchList from '@/content/Dashboards/Crypto/WatchList';
import { useEffect, useState } from 'react';
import { Asset, initWithMetamask, SignerService } from 'iam-client-lib';
import DIDTable from '@/components/DIDTable';

interface DataAssets {
  loading: boolean;
  assets: Asset[];
}
function DashboardMicrogrid() {
  const [assets, setAssets] = useState<DataAssets>({
    assets: [],
    loading: true
  });

  useEffect(() => {
    initMetamask();
  }, []);

  const initMetamask = async () => {
    const { connectToCacheServer } = await initWithMetamask();
    const { assetsService } = await connectToCacheServer();

    setAssets({
      assets: [],
      loading: true
    });
    const response = await assetsService.getOwnedAssets();
    console.log('response', response);
    setAssets({
      assets: response,
      loading: false
    });
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
              <DIDTable loading={assets?.loading} assets={assets?.assets} />
            </Grid>

            <Grid item xs={12}>
              <AccountBalance />
            </Grid>
            <Grid item lg={8} xs={12}>
              <Wallets />
            </Grid>
            <Grid item lg={4} xs={12}>
              <AccountSecurity />
            </Grid>
            <Grid item xs={12}>
              <WatchList />
            </Grid>
          </Grid>
        </Container>
      </div>

      <Footer />
    </>
  );
}

DashboardMicrogrid.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardMicrogrid;
