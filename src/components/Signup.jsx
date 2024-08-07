import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignupWithEmailAndPassword from '../hooks/useSignupWithEmailAndPassword';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';


const Signup = () => {
  const { loading, error, signup } = useSignupWithEmailAndPassword();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPass: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputs);
  };


  return (
    <>
    <NavBar />
    <div className="signupScreen">
        <div className="formContainer">
            <h1 className="authH1">Register</h1>
             {/*Google Authentication*/}
            <button className="google-login">
            <img src="../public/assets/googleLogo.webp" alt="Google Logo"/>
            Log in using Google
        </button>
        {/*separator*/}
            <div className="separator"><div className="hr"></div><span>or</span><div className="hr"></div></div>
            <p className="already2">Sign up using email address</p>
      <form className="add-form login" onSubmit={handleSubmit}>
         {/*email field*/}
        <div className="field input-field">
          <input
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
            type="text"
            name="email"
            placeholder="Enter your email"
          />
        </div>
         {/*username field*/}
        <div className="field input-field">
          <input
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            value={inputs.username}
            type="text"
            name="username"
            placeholder="Enter your username"
          />
        </div>
         {/*password field*/}
        <div className="passContainer">
        <div className="field input-field">
          <input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
          />
           {/*visibility switch for password*/}
          <button className="eye-icon" onClick={handlePasswordVisibility}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </button>
        </div>
        </div>
         {/*repeat password*/}
        <div className="field input-field">
          <input
            onChange={(e) => setInputs({ ...inputs, repeatPass: e.target.value })}
            value={inputs.repeatPass}
            type="password"
            name="repeatPass"
            placeholder="Repeat Password"
          />
        </div>
        {error && <div className="error">{error.message}</div>}
        <button className="signupBtn" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
       
      </form>
      <p className="already">Already have an account? <Link to="/login"><a>Log In</a></Link></p>
      
      </div>
      </div>
    </>
  );
};

export default Signup;
