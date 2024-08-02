import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignupWithEmailAndPassword from '../hooks/useSignupWithEmailAndPassword';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const { loading, error, signup } = useSignupWithEmailAndPassword();

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
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

  const navigate = useNavigate();

  return (
    <>
      <form className="add-form login" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Email *</label>
          <input
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
            type="text"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-control">
          <label>Username *</label>
          <input
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            value={inputs.username}
            type="text"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-control">
          <label>Full Name *</label>
          <input
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            value={inputs.fullName}
            type="text"
            name="fullName"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-control">
          <label>Password *</label>
          <input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
          />
          <button onClick={handlePasswordVisibility}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </button>
        </div>
        {error && <div className="error">{error.message}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </>
  );
};

export default Signup;
