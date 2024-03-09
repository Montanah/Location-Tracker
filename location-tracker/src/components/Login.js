import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
import appLogo from '../images/location_tracker_web_app.png';
import googleLogo from '../images/google_icon.svg';
import facebookLogo from '../images/FacebookLogo.png';
import eyeIcon from '../images/eye_icon.svg';
import eyeOffIcon from '../images/eye_off_icon.svg';
import '../LoginSignup.css';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login(email, password)
      .then((data) => {
        if (data.access_token) {
          // Save the token to local storage or session storage
          AuthService.saveToken(data.access_token);
          navigate('/Dashboard');
        } else {
          setLoginError('Email and/or Password Incorrect! Please try again.');
          setEmail('');
          setPassword('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoginError('An error occurred during login. Please try again.');
        setEmail('');
        setPassword('');
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }; 

  return (
    <>
      <div id="LS-Header">
        <img id="logo" src={appLogo} alt="Logo" />
      </div>
      <div className="loginSignUp">
        <h1 style={{ fontWeight: 'bold', fontSize: '20px' }}>Login</h1>
        <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
          Need an account?
          <Link to="/Signup" style={{ color: 'red', fontWeight: 'bold', textDecoration: 'none', marginLeft: '5px' }}>Sign Up</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className='input_wrapper'>
            <input
                className="LSInput"
                id="email-input"
                type="email"
                placeholder='Your Email'
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label for="email" className="input-label">Email:</label>
          </div>
          <div className='input_wrapper'>
            <input
                className="LSInput"
                id="pass-input"
                type={showPassword ? 'text' : 'password'}
                placeholder='Your Password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label for="password" className="input-label">Password:</label>
              <img
                onClick={handleShowPassword}
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt='Eye Icon'
                title='Eye Icon'
                className='eye-icon'
              />
          </div>
          {loginError && <div style={{ color: 'red', fontSize: '13px', fontStyle: 'italic'}} className="error-message">{loginError}</div>}
          <button className="LSbutton" type="submit" >
            Login
          </button>
          <p>Or continue with:</p>
          <div className="button-container">
            <button className="LSbutton" onClick={() => console.log('Google authentication...')}>
              <img className="button-logo" src={googleLogo} alt="Google Logo" />
              Google
            </button>
            <button className="LSbutton" onClick={() => console.log('Facebook authentication...')}>
              <img className="button-logo" src={facebookLogo} alt="Facebook Logo" />
              Facebook
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogInForm;