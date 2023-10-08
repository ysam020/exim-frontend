import "./App.scss";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import { ThemeProvider } from "@mui/material/styles";
import useMuiTheme from "./customHooks/useMuiTheme";
import LoginPage from "./pages/LoginPage";
import { ClientContext } from "./Context/ClientContext";
import { UserContext } from "./Context/UserContext";
import { SelectedYearContext } from "./Context/SelectedYearContext";
import { AssignedImportersContext } from "./Context/AssignedImportersContext";
import { SelectedImporterContext } from "./Context/SelectedImporterContext";
import axios from "axios";
import { apiRoutes } from "./utils/apiRoutes";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [importer, setImporter] = useState(localStorage.getItem("importer"));
  const [importerName, setImporterName] = useState(
    localStorage.getItem("importerName")
  );
  const muiTheme = useMuiTheme();
  const currentYear = new Date().getFullYear() % 100;
  const [selectedYear, setSelectedYear] = useState(
    `${currentYear}-${currentYear + 1}`
  );
  const [assignedImporters, setAssignedImporters] = useState(
    JSON.parse(localStorage.getItem("assignedImporters"))
  );
  const [selectedImporter, setSelectedImporter] = useState(
    localStorage.getItem("selectedImporter")
  );
  const { getAssignedImporterAPI } = apiRoutes();

  useEffect(() => {
    async function getAssignedImporters() {
      if (user?.username) {
        const res = await axios.get(
          `${getAssignedImporterAPI}/${user.username}`
        );
        setAssignedImporters(res.data);
        localStorage.setItem("assignedImporters", JSON.stringify(res.data));
      }
    }
    getAssignedImporters();
    // eslint-disable-next-line
  }, [selectedImporter, selectedImporter]);

  return (
    <SelectedYearContext.Provider value={{ selectedYear, setSelectedYear }}>
      <UserContext.Provider value={{ user, setUser }}>
        <SelectedImporterContext.Provider
          value={{ selectedImporter, setSelectedImporter }}
        >
          <AssignedImportersContext.Provider
            value={{ assignedImporters, setAssignedImporters }}
          >
            <ClientContext.Provider
              value={{ importer, setImporter, importerName, setImporterName }}
            >
              <ThemeProvider theme={muiTheme}>
                <div className="App">
                  {!user ? (
                    <>
                      <LoginPage />
                    </>
                  ) : (
                    <Container fluid style={{ padding: 0 }}>
                      <NavbarComponent />
                    </Container>
                  )}
                </div>
              </ThemeProvider>
            </ClientContext.Provider>
          </AssignedImportersContext.Provider>
        </SelectedImporterContext.Provider>
      </UserContext.Provider>
    </SelectedYearContext.Provider>
  );
}

export default App;
