import React from 'react';
import '../style/Style.css';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

 const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate('');

  const [errorMessage, setErrorMessage] = useState('');
  const loginHandler = async (e) => {
    
  e.preventDefault(); // Prevent the default form submission behavior

  try {
    const response = await axios.post('http://localhost:8000/users/login', loginData);
    console.log(response);

    if (response.data.success) {
      navigate('/main');
      setErrorMessage(response.data.message);
    } else {
      console.log('Login unsuccessful. Server response:', response.data);
      setErrorMessage(response.data.message);
      setLoginData({
        email: '',
        password: '',
      });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    setErrorMessage('Internal Server Error');
  }
};


  return (
    <div>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src="../../assets/images/logo.svg" alt="logo" />
                  </div>
                
                  <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3"  onSubmit={loginHandler}>
                    <div className="form-group">
                      <input
                        className={`form-control form-control-lg ${errorMessage ? 'is-invalid' : ''}`}
                        id="exampleInputEmail1"
                        placeholder="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={`form-control form-control-lg ${errorMessage ? 'is-invalid' : ''}`}
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                       
                      >
                        LOG IN
                      </button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                        <input
                          type="checkbox"
                          value={loginData.agreeTerms}
                          onChange={(e) => setLoginData({ ...loginData, agreeTerms: e.target.checked })}
                          className="form-check-input"
                          style={{ marginLeft: '5px' }}
                          required
                        />{' '} Keep me signed in
                        </label>
                      </div>
                      <a href="#" className="auth-link text-black">
                        Forgot password?
                      </a>
                    </div>
                    <div className="mb-2">
                    </div>
                        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                   
                    
                    <div className="text-center mt-4 font-weight-light">
                      Don't have an account? <Link to="/" className="text-primary">SignUp</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
    </div>
  );
}

export default Login;
