import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Switch from "@mui/material/Switch";
import useAuth from "../../utils/hooks/useAuth";
import API from "../../utils/API";

import "./style.css";


function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const [usernameShow, setUsernameShow] = useState('none');
  const [passwordShow, setPasswordShow] = useState('none');
  const [username, setUsername] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState('password');
  const [toggleText, setToggleText] = useState('Show Password')

  const togglePassword = () => {
    // e.preventDefault();
      if (showPassword === 'password') {
        setShowPassword('text');
        setToggleText('Hide Password');
      } else {
        setShowPassword('password');
        setToggleText('Show password');
      }
  }

  const handleLoginInputChange = e => {
    console.log(e.target.name, e.target.value)
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  async function handleLogin(e) {
    if (!loginInfo.username && !loginInfo.password) {
      setUsernameShow('inline')
      setPasswordShow('inline')
      return
    }
    if (!loginInfo.username) {
      setUsernameShow('inline')
      return
    }
    if (!loginInfo.password) {
      setPasswordShow('inline')
      return
    }
    if (loginInfo.username !== '' && loginInfo.password !== '') {
      console.log('login info', loginInfo)
      API.login(loginInfo.username, loginInfo.password)
        .then(data => {
          console.log(data);
          if (data.accessToken) {
            const userId = data?.id;
            const userName = data?.username
            const token = data?.accessToken;
            const role = data?.role;
            setAuth({ userId, userName, role, token })
            console.log('auth info', userId, userName, role, token)
            localStorage.setItem("token", data.accessToken);
            setLoginInfo({
              // username: '',
              // password: ''
            })
            navigate(from, { replace: true });
          } else { alert('Your username or password was incorrect!') }
        }).catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="mainLogin">
      <div className="sub-main-login">

        <h1 className="loginTitle">Login</h1>

        {/* <div className="form-alert-box"> */}
        <label htmlFor='username'>Username:</label>
        <input type="text"
          aria-required='true'
          onChange={handleLoginInputChange}
          value={loginInfo.username}
          name="username"
          className="input-field inputLogin" />
        {/* <p className="form-alert" style={{ display: `${usernameShow}` }}>This field is required. Please provide a valid username.</p>
              </div> */}


        {/* <div className="form-alert-box"> */}
        <label htmlFor='password'>Password:</label>
        <input
          type={showPassword}
          aria-required='true'
          onChange={handleLoginInputChange}
          value={loginInfo.password}
          name="password"
          className="input-field inputLogin"
          id="password-inpt"
        />
        <div><Switch onClick={togglePassword} /><label id='switch-label'>{toggleText}</label></div>
        {/* <p className="form-alert" style={{ display: `${passwordShow}` }}>This field is required. Please enter your password.</p>
              </div> */}



        <button className="btnLogSign"
          onClick={handleLogin}
          type="submit">Login</button>


        <p className="linksLogin">
          {/* <a href="#">Forgot Password</a> */}
          New Here?
          <a href="/signup" id="sign-up">Sign Up</a>
        </p>
      </div>
    </div>

  );
}

export default Login;
