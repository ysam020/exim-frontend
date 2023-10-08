import React, { useContext } from "react";
import "../../styles/dashboard.scss";
import { UserContext } from "../../Context/UserContext";
import ManagerDashboard from "./Manager/ManagerDashboard";
import ExecutiveDashboard from "./Executive/ExecutiveDashboard";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.role === "Director" ||
      user.role === "General Manager" ||
      user.role === "Senior Manager" ? (
        <ManagerDashboard />
      ) : user.role === "Assistant Manager" || user.role === "Executive" ? (
        <ExecutiveDashboard />
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
