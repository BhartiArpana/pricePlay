import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.scss';
import { useAuth } from '../hook/useAuth';

const Register = () => {
    const {handleRegister}  = useAuth()
    const navigate = useNavigate()
   const [name, setName] = useState('')
   const [email,setEmail] = useState('')
   const [password, setPassword] = useState('')

  

  const handleSubmit = async(e) => {
    e.preventDefault();
  
   await handleRegister(name,email,password)
   navigate('/chat')
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join the ultimate negotiation challenge</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your name" 
              required 
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="name@company.com" 
              required 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              required 
               value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            Register Now
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="bg-glow"></div>
    </div>
  );
};

export default Register;