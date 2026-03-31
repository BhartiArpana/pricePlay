import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/landing.scss';
import { useAuth } from '../../auth/hook/useAuth';

const LandingPage = () => {
  const {user} = useAuth()

  const navigate = useNavigate();

  const handleStartGame = () => {
    // Yahan tumhara game initialization logic aayega
    console.log("Game Starting...");
    if(user){
      navigate('/products')

    }else{
      navigate('/login')
    }
  };


  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-logo">
        
            <span className="logo-text">Deal<span className="highlight">Master</span>AI</span>
       
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/leaderboard" className="nav-item">Leaderboard</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1 className="headline">Can You Outsmart the Machine?</h1>
          <p className="sub-headline">
            Master the art of the deal. Negotiate with a ruthless AI seller, 
            break its hidden constraints, and land the lowest price to top 
            the global leaderboard.
          </p>
          <div className="cta-group">
            {/* Proper Button for Action */}
            <button className="btn btn-primary" onClick={handleStartGame}>
              Start negotiation 
            </button>
            
            {/* Link for Information */}
           
          </div>
        </div>
      </header>
      
      <div className="radial-glow"></div>
    </div>
  );
};

export default LandingPage;