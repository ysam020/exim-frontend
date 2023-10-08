import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../forms/LoginForm";
import "../styles/login.scss";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);
  return (
    <Container fluid className="login-container" style={{ height: "100vh" }}>
      <Row className="login-row">
        <Col className="login-left-col">
          <div className="login-left-col-inner-container">
            <img src={require("../assets/images/logo.webp")} alt="logo" />
          </div>
        </Col>
        <Col className="login-right-col">
          <div className="login-right-col-inner-container">
            <img src={require("../assets/images/Lock.webp")} alt="lock" />
            {!forgotPassword ? (
              <LoginForm
                forgotPassword={forgotPassword}
                setForgotPassword={setForgotPassword}
              />
            ) : (
              <ForgotPasswordForm
                forgotPassword={forgotPassword}
                setForgotPassword={setForgotPassword}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
