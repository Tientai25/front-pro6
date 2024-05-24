import React, { useEffect, useState } from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
function UserList() {
    //const users = models.userListModel();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const res = await fetch("https://96c5fr-8081.csb.app/api/user", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(res, "ALL USER");
        const result = await res.json();
        setData(result);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <List component="nav">
                {data.map((user) => (
                    <>
                        <ListItem>
                            <ListItemButton
                                to={`/user/${user._id}`}
                                component={Link}
                                key={user._id}
                            >
                                <ListItemText primary={user.last_name} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
            <Typography variant="body1"></Typography>
        </div>
    );
}

export default UserList;
