import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate=useNavigate();
  const location=useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit=(e)=>{
    e.preventDefault();
    setError('');
    
    const users=JSON.parse(localStorage.getItem('users'))||[];

    const user=users.find((u)=>(u.email === email && u.password === password));

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.removeItem('isGuest');
      window.dispatchEvent(new Event("userUpdated"));
      navigate(from, { replace: true }); 

      setEmail('');
      setPassword('');

    } else {
      setError("Invalid email or password");
    }

  }
  
  const handlePassword=()=>{
    setPasswordShow(!passwordShow);
  }

  const handleGuest=()=>{
    localStorage.setItem('isGuest','true');
    localStorage.removeItem('loggedInUser');
    navigate('/');
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="styleGenie.jpeg" />
        <div className="login-overlay"></div>
        <div className="login-left-text">
          <h1>Define Your Style.<br/>Own Your Story.</h1>
          <p>Join 10,000+ trendsetters</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-logo">✨ StyleGenie</div>

        <form className="login-card" onSubmit={handleSubmit}>
          <h3>Welcome back</h3>
          <p className="subtitle">Please sign in to your account</p>

          <div className="input-group">
            <label>Email</label>
            <input 
              placeholder="you@email.com" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="input-group password-input">
            <label>Password</label>
            <input 
              type={passwordShow? 'text':'password'}
              placeholder="Write your password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          {passwordShow? 
            <EyeOff height={16} width={16} color='#300' className='passwordToggle' onClick={handlePassword} />
            :<Eye height={16} width={16} color='#300' className='passwordToggle' onClick={handlePassword} />}
          </div>

          {error && (<p className="error-text" style={{ color: 'red' }} >{error}</p>)}

          <div className="login-options">
            <label><input type="checkbox" /> Remember me</label>
            <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Forgot password?</span>
          </div>

          <button className="login-btn" type='submit'>Log In</button>

          <div className='or-section'>
            <div></div>
            <span>OR</span>
            <div></div>
          </div>
          <button className='guest-btn' onClick={handleGuest}>Continue as Guest</button>

          <p className="signup-text">
            Don't have an account? <Link to="/Signup" style={{fontWeight:'bold', color:'black'}}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

