import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, logingFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function JoinUs() {
  const [join, setJoin] = useState("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/singIn", { email, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate("/")
    } catch (error) {
      dispatch(logingFailure());
    }
  };

  const handlesingin = async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res =await axios.post('/auth/singUp',{name,email,password});
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate('/')
    } catch (error) {
      dispatch(logingFailure());
    }
  }

  return (
    <div>
      {join === "signIn" ? (
        <div>
          <div>Sing In</div>
          <div>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handleLogin}>sing in</button>
          </div>
          <button onClick={() => setJoin("signUp")}>Switch to Sign Up</button>
        </div>
      ) : (
        <div>
          <div>
            <input
            placeholder="name"
            onChange={(e)=>setName(e.target.value)}
            ></input>
            <input
            type="email"
            placeholder="email"
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
            <input
            type="password"
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <button onClick={handlesingin}>sign In</button>
          </div>
          <button onClick={() => setJoin("signIn")}>Switch to Sign In</button>
        </div>
      )}
    </div>
  );
}

export default JoinUs;
