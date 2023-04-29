import Head from 'next/head';
import { useContext } from 'react';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Offers from '@/content/Dashboards/Crypto/Offers';
import { useEffect, useState } from 'react';
import { Asset, AssetsService, initWithMetamask } from 'iam-client-lib';
import { BlockchainContext } from '@/contexts/BlockchainContext';
import Demands from '@/content/Dashboards/Crypto/Demands';
import EnergyChart from '@/components/EnergyChart/EnergyChart';
import BarEnergyChart from '@/components/BarChart/BarChart';
import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Transactions from '@/content/Dashboards/Transactions';

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
            paddingTop={10}
          >
            {/* <Grid item lg={12} paddingTop={20}>
              <DIDTable
                onCreateAsset={onCreateAsset}
                loading={assets?.loading}
                assets={assets?.assets}
              />
            </Grid> */}
            {/* <Grid item lg={12} paddingTop={20}>
              <Assets blockchainParams={null} />
            </Grid> */}

            <Grid item lg={9} paddingTop={20}>
              <EnergyChart />
            </Grid>
            <Grid item lg={3}>
              <BarEnergyChart />
            </Grid>
            <Grid item lg={5} xs={4}>
              <AccountBalance blockchainParams={blockchainParams} />
            </Grid>
            <Grid item lg={7} xs={8}>
              <Transactions />
            </Grid>
            <Grid item lg={12} xs={12}>
              <Offers blockchainParams={blockchainParams} />
            </Grid>
            <Grid item lg={12} xs={12}>
              <Demands blockchainParams={blockchainParams} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

DashboardMicrogrid.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardMicrogrid;
