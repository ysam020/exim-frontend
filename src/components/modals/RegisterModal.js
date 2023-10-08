import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "react-bootstrap";
import RegisterForm from "../../forms/RegisterForm";

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

export default function RegisterModal(props) {
  return (
    <div>
      <Modal
        open={props.openRegisterModal}
        onClose={props.handleCloseRegisterModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a User
          </Typography>

          <Container style={{ margin: "20px 0" }}>
            <RegisterForm
              handleCloseRegisterModal={props.handleCloseRegisterModal}
            />
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
