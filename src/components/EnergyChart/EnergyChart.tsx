import { EnergyInfoDto, getRetrieveEnergyData } from '@/api/user';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

function EnergyChart() {
  const [dataChart, setDataChart] = useState<EnergyInfoDto[]>([]);

  useEffect(() => {
    fetchDatachart();
  }, []);

  const fetchDatachart = () => {
    getRetrieveEnergyData().then((response) => {
      setDataChart(response.data.data);
    });
  };

  return (
    <div>
      <Typography variant="h3">Energy Charts</Typography>

      <LineChart
        className="mt-8"
        width={1200}
        height={350}
        data={dataChart}
        margin={{ left: -40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="produced" stroke="#8884d8" />
        <Line type="monotone" dataKey="consumed" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default EnergyChart;
