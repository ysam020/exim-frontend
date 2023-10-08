import React, { useContext, useState, useEffect } from "react";
import "../../../styles/dashboard.scss";
import RegisterModal from "../../modals/RegisterModal";
import JobsOverview from "../JobsOverview";
import ImporterWiseDetails from "../ImporterWiseDetails";
import { Container, Row, Col } from "react-bootstrap";
import AssignJobsModal from "../AssignJobsModal";
import { UserContext } from "../../../Context/UserContext";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { SelectedYearContext } from "../../../Context/SelectedYearContext";
import RemoveUserModal from "../../modals/RemoveUserModal";
import RemoveJobsModal from "../../modals/RemoveJobsModal";
import TrackTasks from "./TrackTasks";
import axios from "axios";
import { apiRoutes } from "../../../utils/apiRoutes";

const ManagerDashboard = () => {
  // Register Modal
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setOpenRegisterModal(false);
  // Remove User Modal
  const [openRemoveUserModal, setOpenRemoveUserModal] = useState(false);
  const handleOpenRemoveUserModal = () => setOpenRemoveUserModal(true);
  const handleCloseRemoveUserModal = () => setOpenRemoveUserModal(false);
  // Assign Jobs Modal
  const [openAssignJobsModal, setOpenAssignJobsModal] = useState(false);
  const handleOpenAssignJobsModal = () => setOpenAssignJobsModal(true);
  const handleCloseAssignJobsModal = () => setOpenAssignJobsModal(false);
  // Remove Jobs Modal
  const [openRemoveJobsModal, setOpenRemoveJobsModal] = useState(false);
  const handleOpenRemoveJobsModal = () => setOpenRemoveJobsModal(true);
  const handleCloseRemoveJobsModal = () => setOpenRemoveJobsModal(false);

  const { selectedYear } = useContext(SelectedYearContext);
  const { user } = useContext(UserContext);
  const { getUsersWithJobsAPI } = apiRoutes();
  const [usernames, setUsernames] = useState([]);
  const [counts, setCounts] = useState([]);

  const actions = [
    {
      icon: <PersonAddAltRoundedIcon />,
      name: "Add User",
      onClick: handleOpenRegisterModal,
    },
    {
      icon: <PersonRemoveIcon />,
      name: "Remove User",
      onClick: handleOpenRemoveUserModal,
    },
    {
      icon: <AssignmentIndRoundedIcon />,
      name: "Assign Jobs",
      onClick: handleOpenAssignJobsModal,
    },
    {
      icon: <BookmarkRemoveIcon />,
      name: "Remove Jobs",
      onClick: handleOpenRemoveJobsModal,
    },
  ];

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${getUsersWithJobsAPI}/${selectedYear}`);
      setUsernames(res.data.map((item) => item.username));
      setCounts(res.data.map((item) => item.jobsCount));
    }

    getData();
    // eslint-disable-next-line
  }, [selectedYear]);

  return (
    <>
      <Container fluid className="dashboard-container">
        <h4>Hello, {user.username}</h4>

        <JobsOverview selectedYear={selectedYear} />

        <Row>
          <Col className="dashboard-col">
            <ImporterWiseDetails selectedYear={selectedYear} />
          </Col>

          <Col className="dashboard-col">
            <TrackTasks usernames={usernames} counts={counts} />
          </Col>
        </Row>
      </Container>
      <RegisterModal
        openRegisterModal={openRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
      />
      <AssignJobsModal
        openAssignJobsModal={openAssignJobsModal}
        handleCloseAssignJobsModal={handleCloseAssignJobsModal}
        usernames={usernames}
        counts={counts}
      />
      <RemoveUserModal
        openRemoveUserModal={openRemoveUserModal}
        handleCloseRemoveUserModal={handleCloseRemoveUserModal}
      />
      <RemoveJobsModal
        openRemoveJobsModal={openRemoveJobsModal}
        handleCloseRemoveJobsModal={handleCloseRemoveJobsModal}
        usernames={usernames}
        counts={counts}
      />

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default ManagerDashboard;
