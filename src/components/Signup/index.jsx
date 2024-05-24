import React, { useState } from "react";
import { Link } from "react-router-dom";
function SignupForm(props) {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        description: "",
        location: "",
        occupation: "",
        username: "",
        password: "",
    });
    const [pass2, set2] = useState();
    const [err, setErr] = useState();
    const handleSignUp = async (e) => {
        if (
            !user.first_name ||
            !user.last_name ||
            !user.description ||
            !user.location ||
            !user.occupation ||
            !user.username ||
            !user.password ||
            !pass2
        ) {
            setErr("Not enough infomation");
            e.preventDefault();
        } else if (user.password !== pass2) {
            setErr("Two passwords are not alike");
            e.preventDefault();
        } else if (user.password === pass2) {
            console.log(user.password, "MK");
            console.log(user.password, "Khanh");
            e.preventDefault();
            try {
                const res = await fetch("https://96c5fr-8081.csb.app/api/admin/sign", {
                    method: "post",
                    headers: {
                        Accept: "application /json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                if (res.ok) {
                    alert("Create successfully");
                    console.log(res);
                } else {
                    setErr("Can not create");
                }
            } catch (err) {
                setErr("Can not Connect");
            }
        }
    };
    return (
        <>
            <form
                onSubmit={handleSignUp}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1>Sign Up</h1>
                <div>Your first name: </div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                ></input>
                <br />

                <div>Your last name: </div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                ></input>
                <br />

                <div>Your location: </div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                ></input>
                <br />

                <div>Your description: </div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, description: e.target.value })}
                ></input>
                <br />

                <div>Your occupation: </div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, occupation: e.target.value })}
                ></input>
                <br />

                <div>Your username: </div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                ></input>
                <br />

                <div>Your password: </div>
                <input
                    type="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                ></input>
                <br />

                <div>Re-enter password: </div>
                <input type="password" onChange={(e) => set2(e.target.value)}></input>
                <br />
                <h3 style={{ color: "red" }}>{err}</h3>
                <div>
                    Return to <Link to="/login">login</Link>
                </div>
                <br />
                <button type="submit">Sign up</button>
            </form>
        </>
    );
}
export default SignupForm;
