import { React, useState } from "react";
import "../Login/style.css";
import API from "../../utils/API"
import useAuth from '../../utils/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Switch from '@mui/material/Switch';

function SignUp(props) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [usernameShow, setUsernameShow] = useState('none');
  const [passwordShow, setPasswordShow] = useState('none');
  const [firstNameShow, setFirstNameShow] = useState('none');
  const [lastNameShow, setLastNameShow] = useState('none');
  const [emailShow, setEmailShow] = useState('none');
  const [birthdayShow, setBirthdayShow] = useState('none');
  const [zipCodeShow, setZipCodeShow] = useState('none');
  const [newUser, setNewUser] = useState({});
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   password: '',
  //   role: 'paidUser',
  //   email: '',
  //   birthday: '',
  //   zipCode: '',
  // });
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState('password');
  const [toggleText, setToggleText] = useState('Show Password')

  const togglePassword = () => {
    // e.preventDefault();
    // passwordInput.forEach(inpt => {
      // console.log('inpt type', inpt.type)
      if (showPassword === 'password') {
        setShowPassword('text');
        setToggleText('Hide Password');
      } else {
        setShowPassword('password');
        setToggleText('Hide Password');
      }
    // })
  }

  const handlePostUser = (e) => {
    console.log(newUser)
    e.preventDefault();
    // if (!newUser.username) {
    //   setUsernameShow('inline')
    //   return
    // }
    // if (!newUser.firstName) {
    //   setFirstNameShow('inline')
    //   return
    // }
    // if (!newUser.lastName) {
    //   setLastNameShow('inline')
    //   return
    // }
    // if (!newUser.email) {
    //   setEmailShow('inline')
    //   return
    // }
    // if (!newUser.birthday) {
    //   setBirthdayShow('inline')
    //   return
    // }
    // if (!newUser.password) {
    //   setPasswordShow('inline')
    //   return
    // }
    // if (!newUser.password) {
    //   setPasswordShow('inline')
    //   return
    // }
    // if (newUser.username !== '' && newUser.password !== '' && newUser.firstName !== '' && newUser.lastName !== '' && newUser.email !== '' && newUser.birthday !== '' && newUser.zipCode !== '') {
      API.signUp(newUser)
        .then((newData) => {
          if (newData.id) {
            console.log(newData)
            // setUserId(newData.id);
            // setUsername(newData.username);
            // setToken(newData.accessToken);
            localStorage.setItem("token", newData.accessToken);
       
          } else {
            alert('Your request was not successful. \nPlease check the form and try again.');
            console.log('front end post req prob:', newData)
            return
          }
        })
        .then(navigate(`/profile`))
        .catch(err => {
          alert('Sorry! Our bad, there was a problem.');
          console.log('there was an error', err)
          return
        })
    // }
  };

  const handleCollectUser = e => {
    console.log(e.target.name, e.target.value)
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }



  return (

    <div className="mainSign">

      <form className="sub-main-sign" onSubmit={handlePostUser}>
        <h1 className="signTitle">Sign Up</h1>
        <div className='subform-box'>
          <div className='signup-subform'>
            <h2>Choose a Username & Password</h2>
            <label htmlFor='username'>Username:</label>
            <input
              type="text"
              // placeholder="Enter Username"
              className="input-field inputSign"
              required
              name='username'
              onChange={handleCollectUser}
            />
            <label htmlFor='password'>Password:</label>
            <input
              type={showPassword}
              // placeholder="password"
              className="input-field inputSign password-inpt"
              required
              name='password'
              onChange={handleCollectUser}
            />
            <label htmlFor='check-password'>Re-enter Password:</label>
            <input
              type={showPassword}
              // placeholder="password"
              className="input-field inputSign password-inpt"
              required
              name='check-password'
              onChange={handleCollectUser}
            />
            <div><Switch onClick={togglePassword}/><label id='switch-label'>{toggleText}</label></div>
          </div>
          <div className='signup-subform right-box'>
            <h2>Complete Your Profile</h2>
            <label htmlFor='firstName'>First Name:</label>
            <input
              type="text"
              // placeholder="first name"
              className="input-field inputSign"
              required
              name='firstName'
              onChange={handleCollectUser}
            />
            <label htmlFor='lastName'>Last Name:</label>
            <input
              type="text"
              // placeholder="last name"
              className="input-field inputSign"
              required
              name='lastName'
              onChange={handleCollectUser}
            />
            <label htmlFor='birthday'>Birthday:</label>
            <input
              type="date"
              // placeholder="birthday"
              className="input-field inputSign"
              required
              name='birthday'
              onChange={handleCollectUser}
            />
            <label htmlFor='email'>Email:</label>
            <input
              type="text"
              // placeholder="email"
              className="input-field inputSign"
              required
              name='email'
              onChange={handleCollectUser}
            />


          </div>

        </div>


        {/* <div className="email-input">
                <input
                  type="text"
                  className="input-field inputSign"
                  placeholder="role"
                  required
                  name='role'
                  onChange={props.handleCollectUser}
                />
              </div> */}
        <label className="ts-label">
          <input type="checkbox" className="checkbox"></input>I have agree to the
          <a href="/terms" className='checkboxLinks'> Terms of Service </a>and <a href="/privacy" className='checkboxLinks'> Privacy </a>
        </label>

        <button className="btnLogSign">Sign Up</button>

        <p className="links">
          Already have an account?
          <a href="/users/login" id='login'>Login</a>
        </p>
      </form>

    </div>

  );
}

export default SignUp;
