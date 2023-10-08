import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiRoutes } from "../utils/apiRoutes";

function useFetchJobList(detailedStatus, selectedYear) {
  const [rows, setRows] = useState([]);
  const params = useParams();
  const { getJobsListAPI } = apiRoutes();
  const [filterJobNumber, setFilterJobNumber] = useState("all");
  const [pageState, setPageState] = useState({
    isLoading: false,
    page: 1,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (filterJobNumber === "") {
      setFilterJobNumber("all");
    }
  }, [filterJobNumber]);

  useEffect(() => {
    async function getData() {
      setRows([]);
      setPageState((old) => ({ ...old, isLoading: true }));

      const res = await axios(
        `${getJobsListAPI}/${selectedYear}/${params.importer}/jobs/${
          params.status
        }/${pageState.page}/${filterJobNumber}/${detailedStatus
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/,/g, "")}`
      );

      setPageState((old) => ({
        ...old,
        isLoading: false,
      }));

      setRows(res.data.data);
      setTotal(res.data.total);
    }

    getData();
  }, [
    params.client,
    params.status,
    detailedStatus,
    getJobsListAPI,
    selectedYear,
    params.importer,
    pageState.page,
    pageState.pageSize,
    filterJobNumber,
  ]);

  return { rows, total, pageState, setPageState, setFilterJobNumber };
}

export default useFetchJobList;
