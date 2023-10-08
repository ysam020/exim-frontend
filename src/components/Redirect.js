import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/importer");
    // eslint-disable-next-line
  }, []);
}

export default Redirect;
