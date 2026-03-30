import React from 'react';
import '../styles/login.scss';
import {useGoogleLogin} from '@react-oauth/google'
import {googleAuth} from '../services/auth.api'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useState } from 'react';

const Login = () => {
  const {handleLogin,handleRegister} = useAuth()
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

    const googleResponse = async(authResult)=>{
        try{
          if(authResult['code']){
            const result = await googleAuth(authResult['code'])
            const {name,email,image } = result.data.user
            const token = result.data.token
            const obj = {name,email,image ,token }
            localStorage.setItem('user_info',JSON.stringify(obj))
            navigate('/chat')
            console.log(`name: ${name},email:${email},image:${image}`);
            
          }
           
        }catch(err){
          console.error('Error while requesting google auth', err);
          
        }
    }
  const handleGoogleLogin = useGoogleLogin({
    onSuccess:googleResponse,
    onError:googleResponse,
    flow:'auth-code',
    ux_mode: 'popup'
  })

  const handleSubmit =async (e) => {
    e.preventDefault();
    await handleLogin(email,password)
    navigate('/chat')
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Enter your details to access your account</p>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" 
            placeholder="name@company.com"
            value={email} 
            onInput={(e)=>setEmail(e.target.value)}
            required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" 
            placeholder="••••••••"
             value={password} 
            onInput={(e)=>setPassword(e.target.value)}
            required />
          </div>

          <div className="helper-text">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>
         <div className="auth-footer">
            <p>Already have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;