import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import './AdminSignup.css'; // Import the AdminSignup.css file

function AdminSignup() {

  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
    } else {
      console.log('Form data submitted:', formData);
      setPasswordMismatch(false);
      Axios.post('https://table-tales-backend.onrender.com/adminSignup', formData)
      .then((res)=>{

        if(res.status === 200)
        {
          console.log("Successfully created an account")
          console.log(res.data)
          nav('/admin-login')
        }
      })
      .catch(err => {
        
        if (err.response && err.response.status === 400) {
          alert("Enter all fields");
        
        } 
        if (err.response && err.response.status === 402) {
          alert("Admin already exists with this email");
        
        } 

        else {
          alert("An error occurred. Please try again.");
          console.error(err);
        }
      })

    }
  };

  const inputStyle = {
    marginBottom: '20px',
    position: 'relative',
  };

  const formStyle = {
    background: 'rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    transition: 'transform 0.3s',
  };

  const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/adminbackground.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-container">
      <div style={pageStyle}>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Link to="/" className="table-tales-link">
                <p className="row justify-content-center table-tales-heading">Table Tales</p>
              </Link>
              <div className="card gradient-background form-container" style={formStyle}>
                <div className="card-body">
                  <h2 className="row justify-content-center text-light  ">Create Admin Account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="password">Password:</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          required
                          style={{ width: '100%' }}
                        />
                        <button
                          type="button"
                          className="btn btn-link password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        >
                          <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`} style={{ color: 'black' }}></i>
                        </button>
                      </div>
                    </div>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                          style={{ width: '100%' }}
                        />
                        <button
                          type="button"
                          className="btn btn-link password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        >
                          <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`} style={{ color: 'black' }}></i>
                        </button>
                      </div>
                    </div>
                    {passwordMismatch && (
                      <div className="text-danger" style={{ fontWeight: 'bolder', marginBottom: '20px' }}>
                        Password and Confirm Password do not match.
                      </div>
                    )}
                    <div className="text-center">
                      <button type="submit" className="btn btn-orange">Register</button>
                    </div>
                  </form>
                  <p className="mt-3 login-link">
                    Already have an account?{' '}
                    <Link to="/admin-login">Admin Log in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
