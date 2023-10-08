import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../schema/FeedbackSchema";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { apiRoutes } from "../utils/apiRoutes";

const FeedbackForm = () => {
  const { user } = useContext(UserContext);
  const email = user.email;
  const { feedbackAPI } = apiRoutes();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert("Thanks for your feedback");
      const data = { ...values, email };
      const res = await axios.post(feedbackAPI, { data });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "60%", margin: "auto", marginTop: "50px" }}
    >
      <TextField
        size="small"
        margin="dense"
        variant="outlined"
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        className="login-input"
      />

      <TextField
        size="small"
        margin="dense"
        variant="outlined"
        fullWidth
        multiline
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        className="login-input"
      />

      <Button
        fullWidth
        type="submit"
        className="submit-form-btn"
        aria-label="submit-btn"
      >
        Submit
      </Button>
    </form>
  );
};

export default FeedbackForm;
