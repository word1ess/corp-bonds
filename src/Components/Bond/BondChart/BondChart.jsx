import { useState } from "react";
import Chart from "react-apexcharts";
export default function BondChart({ isMobile }) {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "series-2",
        data: [60, 20, 25, 30, 79, 10, -10, 91],
      },
    ],
  });
  return (
    <section className="bond-chart">
      <h2>Изменение цены и доходности облигации</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={isMobile ? 300 : 500}
      />
    </section>
  );
}
