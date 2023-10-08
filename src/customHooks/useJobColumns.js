import React from "react";
import { Link, useParams } from "react-router-dom";

function useJobColumns(detailedStatus) {
  const params = useParams();

  const columns = [
    {
      field: "_id",
      sortable: false,
      hide: true,
      headerName: "ID",
    },

    {
      field: "job_no",
      sortable: false,
      headerName: "Job Number",
      width: 100,
      align: "center",
    },

    {
      field: "custom_house",
      sortable: false,
      headerName: "Custom House",
      width: "150",
      align: "center",
    },

    {
      field: "awb_bl_no",
      sortable: false,
      headerName: "Bill of Lading Number",
      width: "200",
      align: "center",
      hide:
        detailedStatus === "Estimated Time of Arrival" ||
        detailedStatus === "Gateway IGM Filed" ||
        detailedStatus === "Discharged" ||
        detailedStatus === "all"
          ? false
          : true,
      renderCell: (cell) => {
        return cell.row.awb_bl_no.toString();
      },
    },

    {
      field: "be_no",
      sortable: false,
      headerName: "Bill of Entry Number",
      width: 150,
      align: "center",
      // hide:
      //   detailedStatus === "BE Noted, Arrival Pending" ||
      //   detailedStatus === "BE Noted, Clearance Pending" ||
      //   detailedStatus === "Custom Clearance Completed"
      //     ? false
      //     : true,
    },

    {
      field: "be_date",
      sortable: false,
      headerName: "Bill of Entry Date",
      width: 150,
      align: "center",
      // hide:
      //   detailedStatus === "BE Noted, Arrival Pending" ||
      //   detailedStatus === "BE Noted, Clearance Pending" ||
      //   detailedStatus === "Custom Clearance Completed"
      //     ? false
      //     : true,
    },

    {
      field: "container_numbers",
      sortable: false,
      headerName: "Container Numbers",
      width: 150,
      align: "center",
      renderCell: (cell) => {
        return cell.row.container_nos.map((container, id) => {
          return (
            <React.Fragment key={id}>
              {container.container_number}
              <br />
            </React.Fragment>
          );
        });
      },
    },

    {
      field: "eta",
      sortable: false,
      headerName: "ETA",
      width: 150,
      align: "center",
      hide:
        detailedStatus === "Estimated Time of Arrival" ||
        detailedStatus === "Gateway IGM Filed" ||
        detailedStatus === "BE Noted, Arrival Pending" ||
        detailedStatus === "all"
          ? false
          : true,
      renderCell: (cell) => {
        return cell.row.eta === "undefined.undefined.d." ||
          cell.row.eta === undefined
          ? ""
          : cell.row.eta;
      },
    },

    {
      field: "discharge_date",
      sortable: false,
      headerName: "Discharge Date",
      width: 250,
      align: "center",
      hide: detailedStatus === "Discharged" ? false : true,
      renderCell: (cell) => {
        return cell.row.eta === "undefined.undefined.d." ||
          cell.row.eta === undefined
          ? ""
          : cell.row.eta;
      },
    },

    {
      field: "arrival_date",
      sortable: false,
      headerName: "Arrival Date",
      width: 250,
      align: "center",
      hide: detailedStatus !== "BE Noted, Clearance Pending" ? true : false,
      renderCell: (cell) => {
        return cell.row.container_nos.map((container, id) => {
          return (
            <React.Fragment key={id}>
              {container.arrival_date}
              <br />
            </React.Fragment>
          );
        });
      },
    },

    {
      field: "out_of_charge",
      sortable: false,
      headerName: "Out of Charge Date",
      width: 250,
      align: "center",
      hide: detailedStatus !== "Custom Clearance Completed" ? true : false,
    },

    {
      field: "pol",
      sortable: false,
      hide: true,
      headerName: "POL",
    },

    {
      field: "date",
      sortable: false,
      hide: true,
      headerName: "Date",
    },

    {
      field: "party",
      sortable: false,
      hide: true,
      headerName: "Party",
    },

    {
      field: "invoice_number",
      sortable: false,
      hide: true,
      headerName: "Invoice Number",
    },

    {
      field: "invoice_date",
      sortable: false,
      headerName: "Invoice Date",
      width: "160",
      hide: true,
    },

    {
      field: "invoice_value_and_rate",
      sortable: false,
      hide: true,
      headerName: "Invoice Value and Rate",
    },

    {
      field: "bill_number",
      sortable: false,
      hide: true,
      headerName: "Bill Number",
    },

    {
      field: "bill_date",
      sortable: false,
      hide: true,
      headerName: "Bill Date",
    },

    {
      field: "commodity",
      sortable: false,
      hide: true,
      headerName: "Commodity",
    },

    {
      field: "number_of_packages",
      sortable: false,
      hide: true,
      headerName: "Number of Packages",
    },

    {
      field: "net_wt_mt",
      sortable: false,
      hide: true,
      headerName: "Net Weight (MT)",
    },

    {
      field: "free_time",
      sortable: false,
      hide: true,
      headerName: "Free Time",
    },

    {
      field: "detention_from",
      sortable: false,
      hide: true,
      headerName: "Detention From",
    },

    {
      field: "shipping_line",
      sortable: false,
      hide: true,
      headerName: "Shipping Line",
    },

    {
      field: "size",
      sortable: false,
      hide: true,
      headerName: "Size",
    },

    {
      field: "remarks",
      sortable: false,
      headerName: "Remarks",
      width: "250",
    },

    {
      field: "do_validity",
      sortable: false,
      hide: true,
      headerName: "Do Validity",
    },

    {
      field: "checklist",
      sortable: false,
      hide: true,
      headerName: "Checklist",
    },

    {
      field: "client",
      sortable: false,
      hide: true,
      headerName: "Client",
    },

    {
      field: "status",
      sortable: false,
      headerName: "Status",
      width: "200",
      hide: true,
    },

    {
      field: "detailed_status",
      sortable: false,
      hide: true,
      headerName: "Detailed Status",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: "80",
      align: "center",

      renderCell: (cell) => {
        return (
          <Link to={`/${params.importer}/job/${cell.row.job_no}`}>
            View Job
          </Link>
        );
      },
    },
  ];

  return columns;
}

export default useJobColumns;
