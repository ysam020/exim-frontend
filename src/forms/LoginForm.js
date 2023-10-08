import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schema/LoginSchema";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { apiRoutes } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import { AssignedImportersContext } from "../Context/AssignedImportersContext";

const LoginForm = (props) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { loginAPI, sendOtpAPI } = apiRoutes();
  const { setAssignedImporters } = useContext(AssignedImportersContext);
  // const [otpSent, setOtpSent] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);

  // useEffect(() => {
  //   let intervalId;

  //   if (otpSent && timeRemaining > 0) {
  //     intervalId = setInterval(() => {
  //       setTimeRemaining((prevTime) => prevTime - 1);
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [otpSent, timeRemaining]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // otp: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const res = await axios.post(loginAPI, values);

      if (res.data.message === "OTP didn't match") {
        alert(res.data.message);
      } else if (res.data.message === "Password didn't match") {
        alert(res.data.message);
      } else if (res.data.message === "Login Successful") {
        // setOtpSent(false);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setAssignedImporters(res.data.importers);
        localStorage.setItem(
          "assignedImporters",
          JSON.stringify(res.data.importers)
        );
        navigate("/dashboard");
      }
    },
  });

  // const sendOtp = async () => {
  //   if (formik.values.email === "") {
  //     alert("Please enter email");
  //   } else {
  //     setOtpSent(true);
  //     setTimeRemaining(300);
  //     const res = await axios.post(sendOtpAPI, {
  //       email: formik.values.email,
  //     });
  //     console.log(res);
  //   }
  // };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        className="login-input"
      />
      <TextField
        type="password"
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        className="login-input"
      />
      {/* <div>
        {otpSent === false ? (
          <p
            onClick={sendOtp}
            style={{ float: "right", fontWeight: 900, cursor: "pointer" }}
          >
            Send OTP
          </p>
        ) : timeRemaining === 0 ? (
          <p
            onClick={sendOtp}
            style={{ float: "right", fontWeight: 900, cursor: "pointer" }}
          >
            Resend OTP
          </p>
        ) : (
          <p>Resend OTP in {timeRemaining} seconds</p>
        )}
      </div>
      {otpSent && (
        <TextField
          type="password"
          size="small"
          margin="dense"
          variant="filled"
          fullWidth
          id="otp"
          name="otp"
          label="OTP"
          value={formik.values.otp}
          onChange={formik.handleChange}
          error={formik.touched.otp && Boolean(formik.errors.otp)}
          helperText={formik.touched.otp && formik.errors.otp}
          className="login-input"
        />
      )} */}
      <Button
        // disabled={!otpSent}
        fullWidth
        type="submit"
        className="submit-form-btn"
        aria-label="login-btn"
      >
        Login
      </Button>

      {!props.forgotPassword && (
        <p
          style={{
            float: "right",
            fontWeight: 900,
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => props.setForgotPassword(true)}
        >
          Forgot password?
        </p>
      )}
    </form>
  );
};

export default LoginForm;
