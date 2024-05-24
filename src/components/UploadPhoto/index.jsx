import { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
function UploadPhoto({ user }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileToSend, setFile] = useState({
        user_id: user._id,
        comments: [],
        file_name: "",
    });
    const [err, setErr] = useState();
    const upload = async () => {
        if (!selectedFile) {
            console.error("Please select an image file to upload.");
            setErr("No image is selected");
            return;
        }
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(selectedFile.type)) {
            console.error(
                "Invalid file type. Please select a JPEG, PNG, or GIF image."
            );
            setErr("This is not image file");
            return;
        }
        try {
            console.log(fileToSend.user_id, "File to send");
            const res = await fetch("https://96c5fr-8081.csb.app/api/photo/upphoto", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(fileToSend),
            });

            if (res.ok) {
                try {
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    const res = await fetch(
                        "https://96c5fr-8081.csb.app/api/photo/upload",
                        {
                            method: "post",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: formData,
                        }
                    );
                    if (res.ok) {
                        console.log(await res.json(), "ANH");
                        setErr("");
                    } else {
                        setErr("Upload to folder fail"); // Set generic error message
                    }
                } catch (error) {
                    setErr("Can not upload to folder");
                }
            } else {
                setErr("Upload failed to data"); // Set generic error message
            }
        } catch (error) {
            setErr("Can not upload to data");
        }
    };

    useEffect(() => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
            setFile({
                file_name: selectedFile.name,
                user_id: user._id,
                comments: [],
            });
        };
    }, [selectedFile]);

    return (
        <>
            <div>Upload your photo here: </div>
            <label htmlFor="file-upload">
                <input
                    id="file-upload"
                    type="file"
                    onChange={(event) => {
                        const file = event.target.files[0];
                        setSelectedFile(file); // Update state only if a file is selected
                    }}
                />
            </label>
            <button onClick={upload}>Upload File</button>
            {err}
        </>
    );
}

export default UploadPhoto;
