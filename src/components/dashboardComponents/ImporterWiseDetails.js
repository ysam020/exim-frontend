import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { apiRoutes } from "../../utils/apiRoutes";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { UserContext } from "../../Context/UserContext";

function ImporterWiseDetails(props) {
  const selectedYear = props.selectedYear;
  const [importerData, setImporterData] = useState([]);
  const [selectedImporter, setSelectedImporter] = useState(
    importerData[0]?.importer
  );

  const [data, setData] = useState([]);
  const { importerListAPI, importerJobsAPI } = apiRoutes();
  const { user } = useContext(UserContext);

  const importerNames = importerData.map((importer) => {
    return importer.importer;
  });

  // Get importer list for MUI autocomplete
  useEffect(() => {
    async function getImporterList() {
      const res = await axios.get(`${importerListAPI}/${selectedYear}`, {});
      setImporterData(res.data);
      // Check if importerData is not empty before setting the selectedImporter
      if (res.data.length > 0) {
        setSelectedImporter(res.data[0].importer);
      }
    }
    getImporterList();
    // eslint-disable-next-line
  }, [selectedYear]);

  // Set selected importer on autocomplete onChange
  const handleImporterChange = (event, selectedImporter) => {
    setSelectedImporter(selectedImporter);
  };

  // Fetch the details of the selected importer
  useEffect(() => {
    async function getImporterData() {
      if (selectedImporter) {
        const res = await axios.get(
          `${importerJobsAPI}/${selectedImporter
            .toLowerCase()
            .replace(/ /g, "_")
            .replace(/\./g, "")
            .replace(/\//g, "_")
            .replace(/-/g, "")
            .replace(/_+/g, "_")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .replace(/\[/g, "")
            .replace(/\]/g, "")
            .replace(/,/g, "")}/${selectedYear}`
        );

        setData(res.data);
      }
    }
    getImporterData();
    // eslint-disable-next-line
  }, [selectedImporter, selectedYear]);

  const donutState = {
    series: data,
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["All Jobs", "Pending Jobs", "Completed Jobs", "Canceled Jobs"],
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
        text: "Importer Wise Jobs",
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
    <div className="dashboard-col-inner">
      <Autocomplete
        disablePortal
        options={importerNames}
        getOptionLabel={(option) => option}
        value={selectedImporter}
        onChange={handleImporterChange}
        width="100%"
        renderInput={(params) => (
          <TextField {...params} label="Select importer" />
        )}
      />

      <br />
      <ReactApexChart
        options={donutState.options}
        series={donutState.series}
        type="donut"
        width={500}
      />
    </div>
  );
}

export default ImporterWiseDetails;
