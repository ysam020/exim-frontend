import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/job-list.scss";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { SelectedYearContext } from "../Context/SelectedYearContext";
import { UserContext } from "../Context/UserContext";

function MainReport() {
  const { user } = useContext(UserContext);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const { mainReportAPI } = apiRoutes();
  const { selectedYear } = useContext(SelectedYearContext);
  const [pageState, setPageState] = useState({
    isLoading: false,
    page: 1,
  });

  useEffect(() => {
    async function getReport() {
      setPageState((old) => ({ ...old, isLoading: true }));
      const res = await axios.get(
        `${mainReportAPI}/${selectedYear}/${pageState.page}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRows(res.data.data.sort((a, b) => a.job_no - b.job_no));
      setTotal(res.data.total);
      setPageState((old) => ({
        ...old,
        isLoading: false,
      }));
    }

    getReport();
    // eslint-disable-next-line
  }, [pageState.page, pageState.pageSize]);

  const columns = [
    {
      field: "_id",
      sortable: false,
      hide: true,
    },

    {
      field: "job_no",
      sortable: false,
      headerName: "Job No",
      width: 100,
      align: "center",
    },

    {
      field: "custom_house",
      sortable: false,
      headerName: "Custom House",
      width: 150,
      align: "center",
    },

    {
      field: "job_date",
      sortable: false,
      headerName: "Job Date",
      width: 130,
      align: "center",
    },

    {
      field: "importer",
      sortable: false,
      headerName: "Importer",
      width: 350,
      align: "center",
    },

    {
      field: "supplier_exporter",
      sortable: false,
      headerName: "Supplier/Exporter",
      width: 350,
      align: "center",
    },

    {
      field: "invoice_number",
      sortable: false,
      headerName: "Invoice Number",
      width: 140,
      align: "center",
    },

    {
      field: "invoice_date",
      sortable: false,
      headerName: "Invoice Date",
      width: 150,
      align: "center",
    },

    {
      field: "awb_bl_no",
      sortable: false,
      headerName: "AWB/BL No.",
      width: 200,
      align: "center",
    },

    {
      field: "awb_bl_date",
      sortable: false,
      headerName: "AWB/BL Date",
      width: 150,
      align: "center",
    },

    {
      field: "description",
      sortable: false,
      headerName: "Description",
      width: 500,
    },

    {
      field: "be_no",
      sortable: false,
      headerName: "BE No",
      align: "center",
    },

    {
      field: "be_date",
      sortable: false,
      headerName: "BE Date",
      width: 120,
      align: "center",
    },

    {
      field: "type_of_b_e",
      sortable: false,
      headerName: "Type Of B/E",
      width: 150,
      align: "center",
    },

    {
      field: "no_of_pkgs",
      sortable: false,
      headerName: "No Of Pkgs",
      align: "center",
    },

    {
      field: "unit",
      sortable: false,
      headerName: "Unit",
      align: "center",
      width: 100,
    },

    {
      field: "gross_weight",
      sortable: false,
      headerName: "Gross Weight",
      align: "center",
      width: 150,
    },

    {
      field: "unit_1",
      sortable: false,
      headerName: "Unit",
      align: "center",
      width: 100,
    },

    {
      field: "gateway_igm",
      sortable: false,
      headerName: "Gateway IGM",
      align: "center",
      width: 150,
    },

    {
      field: "gateway_igm_date",
      sortable: false,
      headerName: "Gateway IGM Date",
      align: "center",
      width: 150,
    },

    {
      field: "igm_no",
      sortable: false,
      headerName: "IGM No",
      align: "center",
      width: 150,
    },

    {
      field: "igm_date",
      sortable: false,
      headerName: "IGM Date",
      align: "center",
      width: 150,
    },

    {
      field: "loading_port",
      sortable: false,
      headerName: "Loading Port",
      align: "center",
      width: 200,
    },

    {
      field: "origin_country",
      sortable: false,
      headerName: "Origin Country",
      align: "center",
      width: 200,
    },

    {
      field: "port_of_reporting",
      sortable: false,
      headerName: "Port of Reporting",
      width: 200,
      align: "center",
    },

    {
      field: "shipping_line_airline",
      sortable: false,
      headerName: "Shipping Line/Airline",
      align: "center",
      width: 200,
    },

    {
      field: "container_nos",
      sortable: false,
      headerName: "Container Nos.",
      align: "center",
      width: 150,
      renderCell: (cell) => {
        return cell.row.container_nos.map((container, id) => {
          return (
            // <Tooltip title={container.container_number}>
            <React.Fragment key={id}>
              {container.container_number}
              <br />
            </React.Fragment>
            // </Tooltip>
          );
        });
      },
    },

    {
      field: "container_count",
      sortable: false,
      headerName: "Container Count",
      align: "center",
      width: 150,
    },

    {
      field: "no_of_container",
      sortable: false,
      headerName: "No Of Container",
      align: "center",
      width: 150,
    },

    {
      field: "toi",
      sortable: false,
      headerName: "TOI",
      align: "center",
      width: 150,
    },

    {
      field: "unit_price",
      sortable: false,
      headerName: "Unit Price",
      align: "center",
      width: 150,
    },

    {
      field: "cif_amount",
      sortable: false,
      headerName: "CIF Amount",
      align: "center",
      width: 150,
    },

    {
      field: "assbl_value",
      sortable: false,
      headerName: "Assbl. Value",
      align: "center",
      width: 150,
    },

    {
      field: "total_duty",
      sortable: false,
      headerName: "Total Duty",
      align: "center",
      width: 150,
    },

    {
      field: "out_of_charge",
      sortable: false,
      headerName: "Out of Charge",
      align: "center",
      width: 150,
    },

    {
      field: "consignment_type",
      sortable: false,
      headerName: "Consignment Type",
      align: "center",
      width: 150,
    },

    {
      field: "bill_no",
      sortable: false,
      headerName: "Bill No",
      align: "center",
      width: 150,
    },

    {
      field: "bill_date",
      sortable: false,
      headerName: "Bill Date",
      align: "center",
      width: 150,
    },

    {
      field: "cth_no",
      sortable: false,
      headerName: "CTH No",
      align: "center",
      width: 150,
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <h3 style={{ flex: 1, marginBottom: "20px" }}>Main Report</h3>
      </div>

      <DataGrid
        getRowId={(row) => row.job_no}
        sx={{
          padding: "0 30px",
          height: "680px",
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f8f5ff",
          },
        }}
        className="table expense-table"
        headerAlign="center"
        rows={rows}
        columns={columns}
        stickyHeader
        rowCount={total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[25]}
        getRowHeight={() => "auto"}
        pagination
        page={pageState.page - 1}
        pageSize={25}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPageState((old) => ({ ...old, page: newPage + 1 }));
        }}
        autoHeight={false}
        disableSelectionOnClick
        disableColumnMenu
      />
    </>
  );
}

export default MainReport;
