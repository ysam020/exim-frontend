import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "react-bootstrap";
import AssignJobsForm from "../../forms/AssignJobsForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function AssignJobsModal(props) {
  return (
    <div>
      <Modal
        open={props.openAssignJobsModal}
        onClose={props.handleCloseAssignJobsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assign Jobs
          </Typography>

          <Container style={{ margin: "20px 0" }}>
            <AssignJobsForm
              usernames={props.usernames}
              counts={props.counts}
              handleClose={props.handleCloseAssignJobsModal}
            />
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
