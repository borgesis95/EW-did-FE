import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { getTransactionApi } from '@/api/grid';
import { TransactionDto } from '@/api/response.types';
import { format } from 'date-fns';

function Transactions() {
  useEffect(() => {
    fetchTransactions();
  }, []);

  const [transactions, setTransactions] = useState<TransactionDto[]>();

  const fetchTransactions = () => {
    getTransactionApi().then((response) => {
      setTransactions(response.data.data);
    });
  };

  return (
    <Card style={{ maxHeight: 500, overflowY: 'scroll', overflowX: 'hidden' }}>
      {' '}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Produced/consumed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((row) => (
              <TableRow
                key={row.address}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  {format(new Date(row.date), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
                <TableCell align="left">
                  {(row.price / 100).toFixed(2)} €
                </TableCell>
                <TableCell align="left">
                  <Box textAlign="left" className="flex">
                    {row.price > 0 ? (
                      <img
                        alt="up"
                        height={25}
                        width={25}
                        src="/static/images/up.png"
                      />
                    ) : (
                      <img
                        alt="down"
                        height={25}
                        width={25}
                        src="/static/images/down.png"
                      />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default Transactions;
