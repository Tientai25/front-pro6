import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
function TopBar({ user, setUser }) {

    function handleLogout() {
        localStorage.removeItem("token");
    }
    return (
        <>
            <AppBar className="topbar-appBar" position="fixed">
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" color="inherit">
                        User: {user.last_name} {user.first_name}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                        style={{ position: "absolute", right: 0 }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default TopBar;
