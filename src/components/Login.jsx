import { useState } from "react"
import React from 'react'


const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    
  return (
    <>
    <form className="add-form login">
    <div className="form-control">
        <label>Email *</label>
        <input onChange={(e) => setInputs({...inputs, email: e.target.value})} type="text" name="email" placeholder="Enter your email" />
    </div>
    <div className="form-control">
        <label>Password *</label>
        <input onChange={(e) => setInputs({...inputs, password: e.target.value})} type="password" name="password" placeholder="Enter your password" />
    </div>
    <button type="submit">Login</button>
    </form>
    </>
  )
}

export default Login