import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TableViewIcon from "@mui/icons-material/TableView";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FeedbackIcon from "@mui/icons-material/Feedback";

const importer = localStorage.getItem("importerName");

export function sidebarData(role, importerURL) {
  const sidebarData = [
    {
      id: 1,
      icon: <SpaceDashboardIcon />,
      name: "Dashboard",
      url: "dashboard",
    },
    { id: 2, icon: <HomeRoundedIcon />, name: "Importer", url: "importer" },
    {
      id: 3,
      icon: <TaskAltIcon />,
      name: "Jobs",
      url:
        role !== "Director" ||
        role !== "General Manager" ||
        role !== "Senior Manager" ||
        role !== "Assistant Manager"
          ? `${importerURL}/jobs/pending`
          : `${importer}/jobs/pending`,
    },
    {
      id: 4,
      icon: <TableViewIcon />,
      name: "Main Report",
      url: "main_report",
    },
    {
      id: 5,
      icon: <FeedbackIcon />,
      name: "Feedback",
      url: "feedback",
    },
  ];

  return sidebarData;
}
