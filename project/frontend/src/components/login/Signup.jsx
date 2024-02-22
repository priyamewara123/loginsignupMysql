import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import NoteContext from '../../context/NoteContext';

const Signup = (props) => {

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    agreeTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/users/signup",
        signupData
      );
      console.log(response);
      if (response.data.success) {
        navigate("/main");
        setErrorMessage("Registration successful");
        // Reset the input fields after successful registration
        setSignupData({
          username: "",
          email: "",
          country: "",
          password: "",
          agreeTerms: false,
        });
        window.alert("Registration successful");
      } else {
        setErrorMessage("Email is already in use. Please choose another.");
      }

      setSignupData({
        username: "",
        email: "",
        country: "",
        password: "",
        agreeTerms: false,
      });
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src="../../assets/images/logo.svg" alt="Logo" />
                  </div>
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">
                    Signing up is easy. It only takes a few steps
                  </h6>
                  <form className="pt-3" onSubmit={signupHandler}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        value={signupData.username}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            username: e.target.value,
                          })
                        }
                        className="form-control form-control-lg"
                        id="exampleInputUsername1"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => {
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          });
                          setErrorMessage("");
                        }}
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control form-control-lg"
                        id="exampleFormControlSelect2"
                        placeholder='phoneNumber'
                        value={signupData.phone_number}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            phone_number: e.target.value,
                          })
                        }
                        required
                      />
                        
                  
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div className="form-check" style={{ marginTop: "10px" }}>
                      <label
                        className="form-check-label text-muted"
                        style={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "black",
                          opacity: 1,
                        }}
                      >
                        <input
                          type="checkbox"
                          value={signupData.agreeTerms}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              agreeTerms: e.target.checked,
                            })
                          }
                          className="form-check-input"
                          style={{ marginLeft: "5px" }}
                          required
                        />{" "}
                        I agree to all Terms & Conditions
                      </label>
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        SIGN UP
                      </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary">
                        Login
                      </Link>
                    </div>
                  </form>
                  {errorMessage && (
                    <div className="text-danger mt-3">{errorMessage}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
    </>
  );
};

export default Signup;
