import {useState} from 'react';
import {auth} from '../firebase/config.js'
import { createUserWithEmailAndPassword, 
         sendPasswordResetEmail, 
         signInWithEmailAndPassword } 
         from "firebase/auth";
import NavBar from './NavBar.jsx'


function LoginPage() {
    const AuthForm = () => {
        const [isLoggedIn, setIsLoggedIn] = useState(true);
        const navigate = useNavigate();
        const [inputs, setInputs] = useState({
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    const handleAuth = () => {
        if(!inputs.email || !inputs.password){
            alert("Please fill all the fields!");
            return; 
        }
        navigate("/")
    }

  function handleCredentials(e) {
    
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");

    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //fix this
    setError(error.message)
    // ..
  });
  }
  
  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("logged in")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    setError(error.message)
  });
  }

  function handlePasswordReset() {
    const email = prompt('Please enter your email');

    sendPasswordResetEmail(auth, email);

    alert('Email sent! Check your inbox for password reset instructions!')
  }
  
    return (
      <>        
        <NavBar />

        <div className="container login-page">
          <section>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login /
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                   / Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e) => {handleCredentials(e)}} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange={(e) => handleCredentials(e)} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Login</button>
                    : 
                    <div className="form-control">
                      <label> Repeat Password *</label>
                      <input onChange={(e) => handleCredentials(e)} type="password" name="password" placeholder="Repeat your password" />
                  
                    <button onClick={(e)=>{handleSignup(e)}}className="active btn btn-block">Sign Up</button>
                    </div>
                  }

                {
                    error && <div className="error">{error}</div>
                }
                  
                  <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  