import React, { useEffect, useState } from "react";
import { Avatar, Divider, Grid, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "date-fns";
function Comment({ photo, data, users }) {
    const [allUS, setAll] = useState([]);
    const fetchData1 = async () => {
        const res = await fetch("https://96c5fr-8081.csb.app/api/user", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const result = await res.json();
        setAll(result);
    };
    useEffect(() => {
        fetchData1();
    }, [data]);
    const [newComment, setNewComment] = useState({
        user_id: users._id,
        comment: "",
        photo_id: "",
    });
    const handleCommentSubmit = async (id) => {
        if (!newComment.comment) return;
        else {
            const res = await fetch("https://96c5fr-8081.csb.app/api/photo/comment", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newComment),
            });
        }
    };
    return (
        <>
            <div>
                Upload day: {formatDate(new Date(photo.date_time), "yyyy-MM-dd")}
            </div>
            <img
                src={`https://96c5fr-8081.csb.app/images/${photo.file_name}`}
                style={{ width: "250px", height: "150" }}
                alt="Uploaded photos"
            />
            <h1>Comment:</h1>
            {photo.comments.map((comment) => {
                comment.userInfo = allUS.find((user) => user._id == comment.user_id);
                console.log(comment?.userInfo?.last_name, "TEN");
                return (
                    <>
                        <div style={{ display: "flex" }}>
                            <Avatar> {comment?.userInfo?.last_name[0]}</Avatar>
                            <div>
                                <Link to={`/user/${comment.user_id}`}>
                                    {comment?.userInfo?.last_name}
                                </Link>
                                <div>{comment.comment}</div>
                            </div>
                        </div>

                        <h3>
                            Comment-date:{" "}
                            {formatDate(new Date(comment.date_time), "yyyy-MM-dd")}
                        </h3>
                        <br />
                    </>
                );
            })}
            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar>{/* Your logic to display current user's avatar */}</Avatar>
                <TextField
                    id="outlined-basic-multiline"
                    label="Add a comment"
                    multiline
                    rows={2}
                    onChange={(e) =>
                        setNewComment({
                            ...newComment,
                            comment: e.target.value,
                            photo_id: photo._id,
                        })
                    }
                    style={{ marginLeft: "10px", width: "calc(100% - 60px)" }} // Adjust width as needed
                />
                <button onClick={() => handleCommentSubmit()} disabled={!newComment}>
                    Submit
                </button>
            </div>
            <Divider />
            <br></br>
        </>
    );
}
export default Comment;
