import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, logingFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar'
import { fetchProfile } from "../redux/profileSlice";


function JoinUs() {
  const [join, setJoin] = useState("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/singIn", { email, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      openSnackbar("Signin successfull");
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

      const token = JSON.parse(localStorage.getItem("token")); // Use the same key 'token'
      const response = await axios.post(
        "/profile/createProfile",
        {
          imgUrl,
          name,
          email,
          phoneNumber,
          businessName,
          contactAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // Use the 'token' you retrieved earlier
          },
        }
      );
      const data = response.data;
      dispatch({ type: fetchProfile, payload: data });
      navigate("/Dashboard");
    } catch (error) {
      dispatch(logingFailure());
    }
  };

  // if (user) {
  //   navigate('/dashboard')
  // }
  const handleShowPassword = () => setShowPassword(!showPassword);

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
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
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
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            <button onClick={handlesingin}>sign In</button>
          </div>
          <button onClick={() => setJoin("signIn")}>Switch to Sign In</button>
        </div>
      )}
    </div>
  );
}

export default JoinUs;
