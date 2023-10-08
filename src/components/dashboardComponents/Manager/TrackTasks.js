import React from "react";
import ReactApexChart from "react-apexcharts";

function TrackTasks(props) {
  const areAllZeros = props.counts.every((number) => number === 0);
  const donutState = {
    series: props.counts,
    options: {
      chart: {
        width: 350,
        height: 400,
        type: "donut",
      },
      labels: props.usernames,
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
        position: "right",
      },
      title: {
        align: "left",
        margin: 40,
        floating: true,
        style: {
          fontSize: "1rem",
          fontWeight: "500",
          fontFamily: "poppins",
          color: "#212121",
          lineHeight: "1.2",
          marginBottom: "50px !important",
        },
      },
      responsive: [
        {
          breakpoint: 1320,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div
      className="dashboard-col-inner"
      style={{ flex: "1 !important", minHeight: "445px" }}
    >
      <h4 style={{ textAlign: "left" }}>Pending Work</h4>
      {areAllZeros ? (
        <p style={{ textAlign: "left" }}>No Pending Jobs</p>
      ) : (
        <ReactApexChart
          options={donutState.options}
          series={donutState.series}
          type="donut"
          width={500}
        />
      )}
    </div>
  );
}

export default TrackTasks;
