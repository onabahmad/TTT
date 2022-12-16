import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import "./Histogram.css";

const Histogram = ({ words, counts }) => {
  console.log(words);
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: words,
      },
    },
    series: [
      {
        name: "Count",
        data: counts,
      },
    ],
  });

  return (
    <div>
      <Chart
        id="cart"
        options={state.options}
        series={state.series}
        type="histogram"
        width="500"
      />
    </div>
  );
};
export default Histogram;
