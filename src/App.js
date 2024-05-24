import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Button } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import SignupForm from "./components/Signup";
import UploadPhoto from "./components/UploadPhoto";
import { jwtDecode } from "jwt-decode";
const App = () => {
  const [US, setUS] = useState();
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Router>
        <div>
          <Link
            to="/login"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Please Login to use the App
          </Link>
          <Routes>
            <Route path="/login" element={<Login onLogin={setUS}></Login>} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
      </Router>
      // </div>
    );
  } else {
    const decoded = jwtDecode(token);
    console.log(decoded.check, "USer");
    return (
      <>
        <Router>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopBar user={decoded.check} />
              </Grid>
              <div className="main-topbar-buffer" />
              <Grid item sm={3}>
                <Paper className="main-grid-item" sx={{ mt: "30px" }}>
                  <UserList />
                  <Button component={Link} to={"/upload"}>
                    upload your photo
                  </Button>
                </Paper>
              </Grid>
              <Grid item sm={9}>
                <Paper className="main-grid-item" sx={{ mt: "50px" }}>
                  <Routes>
                    <Route path="/user/:userId" element={<UserDetail />} />
                    <Route
                      path="/photo/:userId"
                      element={<UserPhotos users={decoded.check} />}
                    />
                    <Route path="/users" element={<UserList />} />
                    <Route
                      path="/upload"
                      element={<UploadPhoto user={decoded.check} />}
                    />
                  </Routes>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Router>
      </>
    );
  }
};

export default App;
