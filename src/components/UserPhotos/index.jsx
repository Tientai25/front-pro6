import React, { useEffect, useState } from "react";
import { Avatar, Divider, Grid, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "date-fns";
import Comment from "./item/Comment";
function UserPhotos({ users }) {
    const user = useParams();
    //const photos=models.photoOfUserModel(user.userId);
    const [data, setData] = useState([]);
    console.log(data, "Khanh1");
    const fetchData = async () => {
        const res = await fetch(
            `https://96c5fr-8081.csb.app/api/photo/${user.userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        const result = await res.json();
        setData(result);
    };
    useEffect(() => {
        fetchData();
    }, [user]);
    return (
        <Typography variant="body1">
            {data?.map((photo) => {
                return (
                    <>
                        <Comment photo={photo} data={data} users={users}></Comment>
                    </>
                );
            })}
        </Typography>
    );
}
export default UserPhotos;
