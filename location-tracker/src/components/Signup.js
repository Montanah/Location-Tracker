import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appLogo from '../images/location_tracker_web_app.png';
import googleLogo from '../images/google_icon.svg';
import facebookLogo from '../images/FacebookLogo.png';
import '../LoginSignup.css';

const SignUpForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/countries')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleNameChange = (e) => {
    setFullname(e.target.value);
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordVerifyChange = (e) => {
    setPasswordVerify(e.target.value);
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    setSelectedCountry(selectedCountryId);

  };

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || !email || !password || !passwordVerify || !selectedCountry) {
      setSignupError('Please fill in all required fields.');
      return;
    }
    if (password !== passwordVerify) {
      setSignupError('Passwords do not match. Please verify your password.');
      return;
    }

    console.log(
      'Sign up with full name:', fullname,
      'email:', email,
      'password:', password,
      'passwordVerify:', passwordVerify,
      'and country:', selectedCountry
    );

    // Make the profile details POST request
    fetch('/api/post/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname,
        email,
        password,
        country_id: selectedCountry,
      }),
    })
      .then(response => response.json())
      .then(profileData => {
        console.log('Profile details response:', profileData);

        // Set signup success flag
        setSignupSuccess(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setSignupError('Signup failed. Please try again.');
      });
  };

  useEffect(() => {
    if (signupSuccess) {
      navigate('/Login');
    }
  }, [signupSuccess, navigate]);

  return (
    <>
      <div id='LS-Header'>
        <img id="logo" src={appLogo} alt="Logo" />
      </div>
      <div className='loginSignUp'>
        <h1 style={{ fontWeight: 'bold', fontSize: '20px' }}>Sign Up</h1>
        {signupSuccess ? (
          <div>
            <p>Sign up successful!</p>
            <button className='LSbutton' onClick={handleSignupSuccess}>
              Sign Up Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label className='input-label'>Full Name:</label>
              <input className='LSInput' id='firstname-input' type="text" value={fullname} onChange={handleNameChange} required />
            </div>
            <div>
              <label className='input-label'>Email:</label>
              <input className='LSInput' id='email-input' type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div>
              <label className='input-label'>Password:</label>
              <input className='LSInput' id='pass-input' type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <div>
              <label className='input-label'>Verify Password:</label>
              <input className='LSInput' id='verify-pass-input' type="password" value={passwordVerify} onChange={handlePasswordVerifyChange} required />
            </div>
            {signupError && <div className="error-message" style={{ color: 'red', fontStyle: 'italic' }}>{signupError}</div>}
            <div>
              <label className='input-label'>Country:</label>
              <select id='country-input' value={selectedCountry} onChange={handleCountryChange} required>
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <button className='LSbutton' type='submit'>Sign Up</button>
          </form>
        )}

        {!signupSuccess && (
          <div>
            <p>
              Already have an account?
              <button className='LSbutton' onClick={() => navigate('/')}>Login</button>
            </p>
            <p>Or sign up with:</p>
            <div className='button-container'>
              <button className='LSbutton' onClick={() => console.log('Google authentication...')}>
                <img className='button-logo' src={googleLogo} alt='Google Logo' />
                Google
              </button>
              <button className='LSbutton' onClick={() => console.log('Facebook authentication...')}>
                <img className='button-logo' src={facebookLogo} alt='Facebook Logo' />
                Facebook
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpForm;