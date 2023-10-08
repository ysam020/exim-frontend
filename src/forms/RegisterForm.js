import React from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schema/RegisterSchema";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const { registerAPI } = apiRoutes();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "Director",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await axios.post(registerAPI, values, {});
      console.log(res);
      if (res.data.message === "User already registered") {
        alert(res.data.message);
      } else if (res.data.message === "Successfully registered") {
        alert(res.data.message);
        navigate("/dashboard");
      }

      props.handleCloseRegisterModal();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="register-form">
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{ marginBottom: "10px", height: "55px" }}
      />

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

      <TextField
        type="password"
        margin="dense"
        variant="outlined"
        fullWidth
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        select
        margin="dense"
        variant="outlined"
        fullWidth
        id="role"
        name="role"
        label="Role"
        defaultValue="Director"
        onChange={formik.handleChange}
        sx={{ marginBottom: "10px" }}
      >
        <MenuItem value="Director">Director</MenuItem>
        <MenuItem value="General Manager">General Manager</MenuItem>
        <MenuItem value="Senior Manager">Senior Manager</MenuItem>
        <MenuItem value="Assistant Manager">Assistant Manager</MenuItem>
        <MenuItem value="Executive">Executive</MenuItem>
      </TextField>

      <button
        type="submit"
        className="submit-form-btn"
        aria-labelledby="register-btn"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
