import { useState } from "react";
import { Link } from "react-router-dom";
function Login({ onLogin }) {
    const [user, setUser] = useState();
    const [err, setErr] = useState("");
    const handleLogin = async () => {
        try {
            const res = await fetch("https://96c5fr-8081.csb.app/api/admin/login", {
                method: "post",
                headers: {
                    Accept: "application /json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("res", res);
            if (res.ok) {
                const userInfo = await res.json();
                console.log(userInfo.user, "Khanh Nam");
                setUser(userInfo.user);
                onLogin && onLogin(userInfo.user, "USER");
                localStorage.setItem("token", userInfo.token);
            } else {
                setErr("Wrong password or wrong user");
            }
        } catch (err) {
            setErr("Can not login");
        }
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1>Login</h1>
                <br />
                <div>Username</div>
                <input
                    type="text"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <br />
                <span>Password:</span>
                <input
                    type="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <br />
                <h3 style={{ color: "red" }}>{err}</h3>
                <div>
                    Please <Link to="/signup">sign up</Link> if you don't have account
                </div>
                <br />
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    );
}

export default Login;
