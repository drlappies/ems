import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userThunk from "../../redux/thunks/user";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInput from "../../hooks/useInput";

function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, handleUsernameChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userThunk.postLogin(username, password));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item>
        <Card elevation={3}>
          <form onSubmit={handleSubmit}>
            <CardHeader title="Employee Management System" subheader="Demo" />
            <CardContent>
              <TextField
                margin="normal"
                fullWidth
                variant="standard"
                label="Username"
                type="text"
                name="username"
                onChange={handleUsernameChange}
                value={username}
              />
              <TextField
                margin="normal"
                fullWidth
                variant="standard"
                label="Password"
                type="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
