import React from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schema/ForgotPasswordSchema";
import { apiRoutes } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordForm = (props) => {
  const navigate = useNavigate();
  const { sendChangePasswordOtpAPI, changePasswordAPI } = apiRoutes();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await axios.post(changePasswordAPI, values);
      //   console.log(res);
      //   if (res.data.message === "User already registered") {
      //     alert(res.data.message);
      //   } else if (res.data.message === "Successfully registered") {
      //     alert(res.data.message);
      //     navigate("/dashboard");
      //   }
    },
  });

  const sendOtp = async () => {
    if (formik.values.email === "") {
      alert("Please enter email");
    } else {
      const res = await axios.post(sendChangePasswordOtpAPI, {
        email: formik.values.email,
      });
      console.log(res);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="register-form">
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ marginBottom: "10px", height: "55px" }}
      />

      <p
        style={{
          float: "right",
          fontWeight: 900,
          cursor: "pointer",
        }}
        onClick={sendOtp}
      >
        Send OTP
      </p>

      <TextField
        type="otp"
        margin="dense"
        variant="outlined"
        fullWidth
        id="otp"
        name="otp"
        label="OTP"
        value={formik.values.otp}
        onChange={formik.handleChange}
        error={formik.touched.otp && Boolean(formik.errors.otp)}
        helperText={formik.touched.otp && formik.errors.otp}
        sx={{ marginBottom: "10px", height: "55px" }}
      />

      <TextField
        type="password"
        margin="dense"
        variant="outlined"
        fullWidth
        id="password"
        name="password"
        label="New password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ marginBottom: "10px", height: "55px" }}
      />

      <button
        type="submit"
        className="submit-form-btn"
        aria-labelledby="register-btn"
      >
        Change Password
      </button>

      <p
        onClick={() => props.setForgotPassword(false)}
        style={{
          float: "right",
          fontWeight: 900,
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Back to login
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
