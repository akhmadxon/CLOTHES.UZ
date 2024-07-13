import * as React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axios from "../../../service/config.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };
  return <div style={style}>{open ? children : null}</div>;
};

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .required("Age is required")
    .min(0, "Age must be a positive number"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  gender: Yup.string().oneOf(["male", "female"], "Invalid gender").required("Gender is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  phone_number: Yup.string()
    .matches(
      /^\d+$/,
      "Phone number must be only digits"
    )
    .required("Phone number is required"),
});

const Index = ({ open, handleClose, item }) => {
  const initialValues = {
    age: item?.age || "",
    email: item?.email || "",
    first_name: item?.first_name || "",
    last_name: item?.last_name || "",
    gender: item?.gender || "",
    password: item?.password || "",
    phone_number: item?.phone_number || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`/worker`, values);
      console.log(res);
      handleClose(); 
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Add a worker
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="age"
                  type="number"
                  as={TextField}
                  label="Age"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="age"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="email"
                  type="text"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="first_name"
                  type="text"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="first_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field name="gender" as={RadioGroup} row>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </Field>
                <Field
                  name="last_name"
                  type="text"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="last_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="phone_number"
                  type="text"
                  as={TextField}
                  label="Phone"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px", backgroundColor: "black"}}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;
