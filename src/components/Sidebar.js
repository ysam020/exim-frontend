import React, { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";
import { sidebarData } from "../assets/data/sidebarData";
import { IconButton, ListItemButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { jobStatus } from "../assets/data/jobStatus";
import { ClientContext } from "../Context/ClientContext";
import { UserContext } from "../Context/UserContext";
import useFileUpload from "../customHooks/useFileUpload";
import Snackbar from "@mui/material/Snackbar";
import { SelectedImporterContext } from "../Context/SelectedImporterContext";

function Sidebar() {
  const { importer } = useContext(ClientContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const inputRef = useRef();
  const { handleFileUpload, snackbar } = useFileUpload(inputRef);
  const isUserRoleUser =
    user.role !== "Director" ||
    user.role !== "General Manager" ||
    user.role !== "Senior Manager" ||
    user.role !== "Assistant Manager";

  const sidebarDataArray = sidebarData(user.role, user.importerURL);
  const { selectedImporter } = useContext(SelectedImporterContext);

  return (
    <div className="sidebar">
      <div className="avatar">
        <img
          src={require("../assets/images/sidebar-logo.webp")}
          alt=""
          width={180}
          height={87}
        />
      </div>

      {!isUserRoleUser ? (
        ""
      ) : (
        <>
          <label htmlFor="uploadBtn" className="uploadBtn-mobile">
            Upload Party Data (excel file)
          </label>
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="uploadBtnMobile"
            name="uploadBtnMobile"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </>
      )}

      {sidebarDataArray.map((val) => {
        const { id, icon, name, url } = val;

        if (
          user.role !== "Director" &&
          user.role !== "General Manager" &&
          user.role !== "Senior Manager" &&
          (name === "Importer" || name === "Main Report")
        ) {
          return null; // Hide Importer and Main Report
        }

        return (
          <div key={id}>
            <div key={id} className="sidebar-listItem">
              <NavLink to={`/${url}`} key={id} className="sidebar-link">
                <div
                  sx={{ textAlign: "left" }}
                  className="appbar-links"
                  style={{ padding: "5px 0" }}
                  aria-label="list-item"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ color: "#ffffff9f" }} aria-label={icon}>
                      {icon}
                    </IconButton>
                    <p className="sidebar-list-text">{name}</p>
                  </div>
                </div>
              </NavLink>
            </div>
            {name === "Jobs" &&
              jobStatus.map((job) => (
                <div
                  key={job.id}
                  className="sidebar-listItem"
                  style={{ padding: "0 20px" }}
                >
                  <NavLink
                    to={
                      (user.role === "Executive" ||
                        user.role === "Assistant Manager") &&
                      selectedImporter
                        ? `${selectedImporter
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
                            .replace(/,/g, "")}/jobs/${job.url}` // Navigate to the importerURL assigned to the user, if user.role=== User
                        : `${importer}/jobs/${job.url}`
                    }
                    key={job.id}
                    className="sidebar-link"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        sx={{
                          color: "#ffffff9f",
                          border: "none !important",
                        }}
                        aria-label="icon"
                      >
                        {job.icon}
                      </IconButton>
                      <p className="sidebar-list-text">{job.name}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
          </div>
        );
      })}

      <div
        sx={{ textAlign: "left" }}
        className="sidebar-listItem"
        style={{
          padding: "5px 0",
        }}
        onClick={() => {
          setUser(null);
          navigate("/");
          localStorage.removeItem("user");
          localStorage.removeItem("selectedImporter");
          localStorage.removeItem("assignedImporters");
          localStorage.removeItem("importerName");
          localStorage.removeItem("importer");
        }}
      >
        <div className="sidebar-link">
          <ListItemButton
            sx={{ textAlign: "left" }}
            className="appbar-links"
            style={{
              padding: "5px 0",
            }}
            aria-label="list-item"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ color: "#ffffff9f" }} aria-label="icon">
                <LogoutRoundedIcon />
              </IconButton>
              <p className="sidebar-list-text">Logout</p>
            </div>
          </ListItemButton>
        </div>
      </div>

      <Snackbar
        open={snackbar}
        message="Jobs added successfully!"
        sx={{ left: "auto !important", right: "24px !important" }}
      />
    </div>
  );
}

export default Sidebar;
