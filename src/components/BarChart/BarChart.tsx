import { EnergyInfoDto, EnergyTotalDto, getTotalEnergy } from '@/api/user';
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Line
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];

const COLORS = ['#8884d8', '#82ca9d'];

const RADIAN = Math.PI / 180;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  console.log('fill', fill);

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={COLORS[0]}
        color={COLORS[0]}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={COLORS[1]}
        color={COLORS[1]}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} (KW)`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const BarEnergyChart = () => {
  const [dataChart, setDataChart] = useState<EnergyTotalDto[]>();
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    fetchDatChart();
  }, []);

  const fetchDatChart = () => {
    getTotalEnergy().then((response) => {
      setDataChart(response.data.data);
    });
  };

  const onEnter = (_, index: number) => {
    setIndex(index);
  };

  return (
    <PieChart width={500} height={400}>
      <Pie
        activeIndex={index}
        activeShape={renderActiveShape}
        data={dataChart}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill={COLORS[1]}
        dataKey="value"
        onMouseEnter={onEnter}
      />
      {/* {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))} */}
    </PieChart>
  );
};

export default BarEnergyChart;
