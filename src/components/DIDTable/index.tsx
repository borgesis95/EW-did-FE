import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Asset } from 'iam-client-lib';
import { format } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AddDerDialog from '../AddDerDialog';

interface DIDTableProps {
  assets: Asset[];
  loading: boolean;
  onCreateAsset: () => void;
}

function DIDTable({ assets, loading, onCreateAsset }: DIDTableProps) {
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  const handleConfirm = () => {
    handleDialog();
    onCreateAsset();
  };

  return (
    <>
      <div className="mb-4 flex justify-between  bg-red">
        <Typography variant="h3" component="h3">
          My devices
        </Typography>
        <Button variant="contained" onClick={handleDialog}>
          Aggiungi DER
        </Button>
      </div>
      {!loading ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Identifier</TableCell>
                <TableCell align="right">CreatedAt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets?.map((asset) => (
                <TableRow
                  key={asset.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {asset.id}
                  </TableCell>
                  <TableCell align="right">
                    {format(new Date(asset.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="flex justify-center">
          <CircularProgress className="flex justify-center" />
        </div>
      )}
      <AddDerDialog
        open={isDialogOpen}
        handleConfirm={handleConfirm}
        handleToggle={handleDialog}
      />
    </>
  );
}

export default DIDTable;
