import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

export const jobStatus = [
  { id: 1, name: "Pending", url: "pending", icon: <HourglassBottomIcon /> },
  {
    id: 2,
    name: "Completed",
    url: "completed",
    icon: <CheckCircleOutlineIcon />,
  },
  { id: 3, name: "Cancelled", url: "cancelled", icon: <DoDisturbIcon /> },
  { id: 4, name: "All", url: "all", icon: <DensitySmallIcon /> },
];
