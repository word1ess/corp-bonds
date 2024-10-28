// import { useState } from "react";
// import Chart from "react-apexcharts";
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
export default function BondChart({ isMobile }) {
  // const [chartData, setChartData] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //     },
  //   },
  //   series: [
  //     {
  //       name: "series-1",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91],
  //     },
  //     {
  //       name: "series-2",
  //       data: [60, 20, 25, 30, 79, 10, -10, 91],
  //     },
  //   ],
  // });

  const chartContainerRef = useRef();
  const chartRef = useRef();
  const priceSeriesRef = useRef();
  const volumeSeriesRef = useRef();

  // Sample data
  const priceData = [
    { time: "2023-10-01", value: 100 },
    { time: "2023-10-02", value: 102 },
    { time: "2023-10-03", value: 101 },
    { time: "2023-10-04", value: 104 },
    { time: "2023-10-05", value: 103 },
  ];

  const volumeData = [
    { time: "2023-10-01", value: 1000 },
    { time: "2023-10-02", value: 1500 },
    { time: "2023-10-03", value: 1200 },
    { time: "2023-10-04", value: 1800 },
    { time: "2023-10-05", value: 1600 },
  ];

  useEffect(() => {
    // Create the chart
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#ffffff",
        textColor: "#000000",
      },
      rightPriceScale: {
        visible: true,
        borderVisible: false,
        autoScale: true, // Enable auto-scaling
      },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
        autoScale: false, // Disable auto-scaling for left scale
      },
    });

    // Add line series for bond prices
    priceSeriesRef.current = chartRef.current.addLineSeries({
      color: "#2196F3",
      lineWidth: 2,
    });

    // Add histogram series for volume
    volumeSeriesRef.current = chartRef.current.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // Set as an overlay by setting a blank priceScaleId
    });

    // Set data to series
    priceSeriesRef.current.setData(
      priceData.map((item) => ({ time: item.time, value: item.value }))
    );
    volumeSeriesRef.current.setData(
      volumeData.map((item) => ({ time: item.time, value: item.value }))
    );

    // Apply scale margins for better visualization
    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7, // Positioning the volume series
        bottom: 0,
      },
    });

    return () => chartRef.current.remove(); // Cleanup on unmount
  }, []);

  return (
    <section className="bond-chart">
      <h2>Изменение цены и доходности облигации</h2>
      {/* <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={isMobile ? 300 : 500}
      /> */}
      <div
        ref={chartContainerRef}
        style={{
          position: "relative",
          width: "100%",
          height: `${isMobile ? 300 : 500}px`,
        }}
      />
      {/* Здесь можно добавить селектор даты */}
    </section>
  );
}
