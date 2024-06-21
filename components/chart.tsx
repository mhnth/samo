'use client';

import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

interface ChartsProps {
  expenseByCategory: { [key: string]: number };
  incomeExpenseByMonth: { [key: string]: { income: number; expense: number } };
}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const Charts: React.FC<ChartsProps> = ({
  expenseByCategory,
  incomeExpenseByMonth,
}) => {
  // Dữ liệu cho biểu đồ tròn
  const pieChartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  // Dữ liệu cho biểu đồ cột
  const barChartData = {
    labels: Object.keys(incomeExpenseByMonth),
    datasets: [
      {
        label: 'Income',
        data: Object.values(incomeExpenseByMonth).map((data) => data.income),
        backgroundColor: '#36A2EB',
        barThickness: 24,
        maxBarThickness: 24,
      },
      {
        label: 'Expense',
        data: Object.values(incomeExpenseByMonth).map((data) => data.expense),
        backgroundColor: '#FF6384',
        barThickness: 24,
        maxBarThickness: 24,
      },
    ],
  };

  return (
    <div className="mx-auto grid gap-12 md:max-w-7xl lg:grid-flow-col">
      <div className="flex h-full grow flex-col items-center rounded-md bg-white p-4 shadow-md">
        <span className="mb-3 w-full border-b border-gray-200 text-center text-xl">
          Biểu đồ tổng thu nhập và chi tiêu theo tháng
        </span>
        <Bar className="bar-chart" data={barChartData} />
      </div>
      <div className="flex flex-col items-center rounded-md bg-white p-4 shadow-md">
        <p className="mb-3 w-full border-b border-gray-200 text-center text-xl">
          Biểu đồ tỷ lệ chi tiêu theo các danh mục
        </p>
        <Pie
          // style={{ maxWidth: '600px', maxHeight: '600px' }}
          style={{ maxWidth: '300px', maxHeight: '300px' }}
          data={pieChartData}
        />
      </div>
    </div>
  );
};

export default Charts;
