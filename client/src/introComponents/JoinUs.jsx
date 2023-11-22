import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, logingFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "../css/joinUs.css";

function JoinUs() {
  const [join, setJoin] = useState("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/singIn", { email, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate("/Dashboard");
    } catch (error) {
      dispatch(logingFailure());
    }
  };
  const handlesingin = async (e) => {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/singUp", { name, email, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate("/Dashboard");
    } catch (error) {
      dispatch(logingFailure());
    }
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="join-us-container">
      {join === "signIn" ? (
        <div>
          {/* <div>Sing In</div> */}
          <div className="sign-in-container">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handleLogin}>Sing in</button>
            <button onClick={() => setJoin("signUp")}>Switch to Sign Up</button>
          </div>
        </div>
      ) : (
        <div className="sign-up-container">
          <div>
            <input
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handlesingin}>Sign up</button>
          </div>
          <button onClick={() => setJoin("signIn")}>Switch to Sign In</button>
        </div>
      )}
    </div>
  );
}

export default JoinUs;
