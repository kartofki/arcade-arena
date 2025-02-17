import { useState } from "react";
import React from "react";
import NavBar from './NavBar';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const { loading, error, login } = useLogin();
    const [inputs, setInputs] = useState({
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
        login(inputs);
    };

    return (
        <>
            <NavBar />
            <div className="signupScreen">
                <div className="formContainer">
                    <h1 className="authH1">Login</h1>
                    <div className="separator">
                        <div className="hr"></div>
                        <span>fill the fields below</span>
                        <div className="hr"></div>
                    </div>
                    <p className="already2">Log in using email address</p>
                    <form className="add-form login" onSubmit={handleSubmit}>
                        <div className="field input-field">
                            <input
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                value={inputs.email}
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="passContainer">
                            <div className="field input-field">
                                <input
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    value={inputs.password}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                />
                                <button className="eye-icon" onClick={handlePasswordVisibility}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </button>
                            </div>
                        </div>
                        {error && <div className="error">{error.message}</div>}
                        <button className="signupBtn" type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="already">
                        Don't have an account? <Link to="/signup">Register now</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
