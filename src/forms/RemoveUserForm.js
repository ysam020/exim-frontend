import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { apiRoutes } from "../utils/apiRoutes";
import { UserContext } from "../Context/UserContext";

const RemoveUserForm = () => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { getUsersAPI, removeUserAPI } = apiRoutes();
  const { user } = useContext(UserContext);

  const userList = users.map((user) => user.username);
  const filteredUsers = userList.filter((name) => name !== user.username);

  const validationSchema = Yup.object().shape({
    user: Yup.string().required("User is required"),
  });

  const formik = useFormik({
    initialValues: {
      user: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await axios.delete(`${removeUserAPI}/${values.user}`, {});
      if (res.status === 200) {
        alert("User removed succesfully");
        setToggle(!toggle);
      }
    },
  });

  useEffect(() => {
    async function getUsers() {
      const res = await axios(getUsersAPI, {});
      setUsers(res.data);
    }

    getUsers();
    // eslint-disable-next-line
  }, [toggle]);

  const handleChangeUserAutocomplete = (event, value) => {
    formik.setFieldValue("user", value); // Update the 'user' field in Formik
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        options={filteredUsers}
        getOptionLabel={(option) => option}
        width="100%"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select user"
            error={formik.touched.user && Boolean(formik.errors.user)}
            helperText={formik.touched.user && formik.errors.user}
          />
        )}
        id="user"
        name="user"
        onChange={handleChangeUserAutocomplete}
        value={formik.values.user}
        style={{ marginBottom: "15px" }}
      />

      <Button
        fullWidth
        type="submit"
        className="submit-form-btn"
        aria-label="assign-jobs-btn"
      >
        Remove
      </Button>
    </form>
  );
};

export default RemoveUserForm;
