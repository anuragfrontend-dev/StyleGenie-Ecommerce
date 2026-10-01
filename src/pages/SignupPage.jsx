import { useState } from "react";
import { EyeOff, Eye } from 'lucide-react';
import { Link,useNavigate } from "react-router-dom";
import './SignupPage.css'

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic]=useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handlePassword = () => {
    setPasswordShow(!passwordShow);
  }


  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
      setError('User alredy exists');
      return;
    }
    const newUser = { name, email, password, profilePic };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    navigate('/');
  }

  return (
    <div className="signup-page">
      <div className="signup-left">
        <img src="styleGenie.jpeg" />
        <div className="signup-overlay"></div>
        <div className="signup-left-text">
          <h1>Define Your Style.<br />Own Your Story.</h1>
          <p>Join 10,000+ trendsetters</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-logo">✨ StyleGenie</div>

        <form className="signup-card" onSubmit={handleSignup}>
          <h3>Welcome to StyleGenie</h3>
          <p className="subtitle">Please sign up to your account</p>
          
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text"
              placeholder="Enter your name" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>


          <div className="input-group">
            <label>Email</label>
            <input
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group signup-password-input">
            <label>Password</label>
            <input
              type={passwordShow ? 'text' : 'password'}
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordShow ?
              <EyeOff height={16} width={16} color='#300' className='signup-passwordToggle' onClick={handlePassword} />
              : <Eye height={16} width={16} color='#300' className='signup-passwordToggle' onClick={handlePassword} />}
          </div>
          
          {error && (<p className="error-text" style={{ color: 'red' }} >{error}</p>)}

          <div className="signup-options">
            <label><input type="checkbox" /> Remember me</label>
          </div>
          
          <button className="signup-btn" type='submit'>Sign up</button>


          <p className="login-text">
            Already have an account? <Link to="/Login" style={{ fontWeight: 'bold', color: 'black' }}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}