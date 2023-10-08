import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "react-bootstrap";
import RemoveJobsForm from "../../forms/RemoveJobsForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function RemoveJobsModal(props) {
  return (
    <div>
      <Modal
        open={props.openRemoveJobsModal}
        onClose={props.handleCloseRemoveJobsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Remove Jobs
          </Typography>

          <Container style={{ margin: "20px 0" }}>
            <RemoveJobsForm
              handleCloseRemoveJobsModal={props.handleCloseRemoveJobsModal}
              usernames={props.usernames}
              counts={props.counts}
            />
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
