import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ClientContext } from "../Context/ClientContext";
import "../styles/job-list.scss";
import useJobColumns from "../customHooks/useJobColumns";
import { getTableRowsClassname } from "../utils/getTableRowsClassname";
import useFetchJobList from "../customHooks/useFetchJobList";
import { detailedStatusOptions } from "../assets/data/detailedStatusOptions";
import { useNavigate, useParams } from "react-router-dom";
// import SelectFieldsModal from "./SelectFieldsModal";
import { UserContext } from "../Context/UserContext";
import { SelectedYearContext } from "../Context/SelectedYearContext";
import { apiRoutes } from "../utils/apiRoutes";
import axios from "axios";
import { convertToExcel } from "../utils/convertToExcel";

function JobsList() {
  useEffect(() => {
    const savedImporterName = localStorage.getItem("importerName");
    if (savedImporterName === null || savedImporterName === undefined) {
      navigate("/importer");
    }
    // eslint-disable-next-line
  }, []);

  const { importerName } = useContext(ClientContext);
  const { user } = useContext(UserContext);
  const { selectedYear } = useContext(SelectedYearContext);
  const [headers, setHeaders] = useState([]);
  const navigate = useNavigate();

  const [detailedStatus, setDetailedStatus] = useState("all");
  const columns = useJobColumns(detailedStatus);
  const { rows, total, pageState, setPageState, setFilterJobNumber } =
    useFetchJobList(detailedStatus, selectedYear);
  const params = useParams();
  const { reportFieldsAPI, downloadReportAPI } = apiRoutes();

  // // Modal
  // const [openModal, setOpenModal] = React.useState(false);
  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    async function getReportFields() {
      const res = await axios(`${reportFieldsAPI}/${params.importer}`);
      setHeaders(res.data);
    }
    getReportFields();
    // eslint-disable-next-line
  }, [params.importer]);

  const handleReportDownload = async () => {
    const res = await axios.get(
      `${downloadReportAPI}/${selectedYear}/${params.importer}/${params.status}`
    );

    convertToExcel(
      res.data,
      importerName,
      params.status,
      detailedStatus,
      headers
    );
  };

  return (
    <>
      <div className="jobs-list-header">
        <h5>{user.role !== "Executive" ? importerName : user.importer}</h5>
        <input
          type="text"
          placeholder="Search Jobs"
          onChange={(e) => setFilterJobNumber(e.target.value)}
        />
        <select
          name="status"
          onChange={(e) => {
            setDetailedStatus(e.target.value);
            setPageState((old) => ({ ...old, page: 1 }));
          }}
        >
          {detailedStatusOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleReportDownload()}
          style={{ cursor: "pointer" }}
          aria-label="export-btn"
        >
          Export
        </button>
      </div>

      <DataGrid
        getRowId={(row) => row.job_no}
        sx={{
          padding: "0 30px",
          height: "600px",
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
        getRowClassName={getTableRowsClassname}
        disableColumnMenu
      />

      {/* <SelectFieldsModal
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        rows={rows}
        importerName={user.role !== "User" ? importerName : user.importer}
        status={params.status}
        detailedStatus={detailedStatus}
      /> */}
    </>
  );
}

export default JobsList;
