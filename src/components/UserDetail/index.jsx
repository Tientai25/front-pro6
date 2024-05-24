import React, { useEffect, useState } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Link, Route, Router, Routes, useParams } from "react-router-dom";
function UserDetail() {
    const user = useParams();
    const [data, setData] = useState({});
    const fetchData = async () => {
        const res = await fetch(
            `https://96c5fr-8081.csb.app/api/user/${user.userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        const result = await res.json();
        console.log(result);
        setData(result);
    };
    useEffect(() => {
        fetchData();
    }, [user]);
    return (
        <>
            <Typography variant="body1">
                <div>
                    User Name: {data.last_name + " " + data.first_name}
                    <br />
                    <Divider variant="middle" />
                    Address: {data.location}
                    <br />
                    <Divider variant="middle" />
                    Decription: {data.description}
                    <br />
                    <Divider variant="middle" />
                    Occupation: {data.occupation}
                    <br />
                    <Divider variant="middle" />
                </div>
            </Typography>
            <Button component={Link} to={`/photo/${data._id}`}>
                See Photos
            </Button>
        </>
    );
}

export default UserDetail;
