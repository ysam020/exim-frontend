import React, { useContext, useEffect, useState } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { IconButton } from "@mui/material";
import axios from "axios";
import { apiRoutes } from "../../utils/apiRoutes";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import { SelectedImporterContext } from "../../Context/SelectedImporterContext";

function JobsOverview(props) {
  const [jobs, setJobs] = useState({
    totalJobs: 0,
    pendingJobs: 0,
    completedJobs: 0,
    canceledJobs: 0,
  });

  const { jobsOverviewAPI, importerJobsAPI } = apiRoutes();
  const { user } = useContext(UserContext);
  const { selectedImporter } = useContext(SelectedImporterContext);

  useEffect(() => {
    async function getJobsOverview() {
      if (user.role === "Executive" || user.role === "Assistant Manager") {
        if (selectedImporter) {
          setJobs({
            totalJobs: 0,
            pendingJobs: 0,
            completedJobs: 0,
            canceledJobs: 0,
          });
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
              .replace(/,/g, "")}/${props.selectedYear}`
          );
          const [totalJobs, pendingJobs, completedJobs, canceledJobs] =
            res.data;
          setJobs({
            totalJobs,
            pendingJobs,
            completedJobs,
            canceledJobs,
          });
        }
      } else {
        const res = await axios.get(`${jobsOverviewAPI}/${props.selectedYear}`);
        setJobs(res.data);
      }
    }

    getJobsOverview();
    // eslint-disable-next-line
  }, [props.selectedYear, selectedImporter]);

  return (
    <Row className="jobs-overview">
      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton aria-label="total-jobs">
            <DensitySmallIcon />
          </IconButton>
          <div>
            <p>Total Jobs</p>
            <h3>{jobs?.totalJobs}</h3>
          </div>
        </div>
      </Col>

      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton aria-label="pending-jobs">
            <HourglassBottomIcon />
          </IconButton>
          <div>
            <p>Pending Jobs</p>
            <h3>{jobs?.pendingJobs}</h3>
          </div>
        </div>
      </Col>

      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton aria-label="completed-jobs">
            <CheckCircleOutlineIcon />
          </IconButton>
          <div>
            <p>Completed Jobs</p>
            <h3>{jobs?.completedJobs}</h3>
          </div>
        </div>
      </Col>

      <Col xl={6} className="jobs-overview-item">
        <div className="jobs-overview-item-inner">
          <IconButton aria-label="canceled-jobs">
            <DoDisturbIcon />
          </IconButton>
          <div>
            <p>Canceled Jobs</p>
            <h3>{jobs?.canceledJobs}</h3>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default JobsOverview;
