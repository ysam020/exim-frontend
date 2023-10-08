import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { selectFieldsdata } from "../../assets/data/selectFieldsData";
import { Container, Row, Col } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import { convertToExcel } from "../../utils/convertToExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "hidden",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function SelectFieldsModal(props) {
  const [selectedFields, setSelectedFields] = React.useState(
    localStorage.getItem("selectedFields")
      ? JSON.parse(localStorage.getItem("selectedFields"))
      : [
          { id: 1, name: "Job No", fieldName: "job_no" },
          { id: 2, name: "Custom House", fieldName: "custom_house" },
          { id: 4, name: "Importer", fieldName: "importer" },
          { id: 6, name: "Invoice Number", fieldName: "invoice_number" },
          { id: 7, name: "Invoice Date", fieldName: "invoice_date" },
        ]
  );

  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select fields to be displayed in report
          </Typography>

          <Container
            style={{ margin: "20px 0", height: "500px", overflow: "scroll" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFields(selectFieldsdata);
                  } else {
                    setSelectedFields([]);
                  }
                }}
              />
              Select All
            </div>
            <Row>
              {selectFieldsdata.map((data) => {
                return (
                  <Col xs={4} key={data.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFields([...selectedFields, data]);
                          } else {
                            setSelectedFields(
                              selectedFields.filter(
                                (item) => item.id !== data.id
                              )
                            );
                          }
                        }}
                        checked={
                          data.name === "Job No" ||
                          data.name === "Importer" ||
                          data.name === "Invoice Date" ||
                          data.name === "Invoice Number" ||
                          data.name === "Custom House"
                            ? true
                            : selectedFields.filter(
                                (item) => item.id === data.id
                              ).length > 0
                        }
                      />
                      <Typography>{data.name}</Typography>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>

          <button
            onClick={() =>
              convertToExcel(
                props.rows,
                props.importerName,
                props.status,
                props.detailedStatus,
                selectedFields
              )
            }
            aria-label="export-btn"
            className="download-report-btn"
          >
            Download Now
          </button>
        </Box>
      </Modal>
    </div>
  );
}
