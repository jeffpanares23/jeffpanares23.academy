import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useHistory } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';


export default function LoginPage() {

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReSubmitted, setIsReSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const isnavigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      Axios.post('http://localhost:8002/login', {
        username: usernameLogin,
        password: passwordLogin,
      }).then((response) => {
        if (response.data.message) {
          toast.warning('Wrong username/password combinationesss!');
        } else {
          const userId = response.data[0].id;
          console.log(userId);
          console.log(response);

          sessionStorage.setItem('userId', userId); // Store userId in sessionStorage

          const storedUserId = sessionStorage.getItem('userId');
          if (storedUserId) {
            console.log('Session ID:', storedUserId);
          } else {
            console.log('Session expired or not established');
          }

          // Store authentication token in sessionStorage
          const authToken = response.data.token;
          sessionStorage.setItem('token', authToken);

          setIsSubmitted(true);
          // toast.success('Logged in successfully!');
        }
      });
    }
  };


  const validate = () => {
    let result = true;
    if (usernameLogin === '' || usernameLogin === null) {
      result = false;
      toast.warning('Username Required!')
    }
    if (passwordLogin === '' || passwordLogin === null) {
      result = false;
      toast.warning('Password Required!')
    }
    return result;
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (IsValidate()) {
      Axios.post("http://localhost:8002/create", {
        name,
        username,
        email,
        password,
      }).then(() => {
        toast.success('Registered Successfully!.')
        navigate('/success');
        setUserList([
          ...userList,
          {
            name,
            username,
            email,
            password,
          },
        ]);
      });
    }
  };


  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter a value in ';
    if (name === null || name === '') {
      isproceed = false;
      errormessage += 'Full name ';
    }
    if (username === null || username === '') {
      isproceed = false;
      errormessage += 'Username ';
    }
    if (email === null || email === '') {
      isproceed = false;
      errormessage += 'Email ';
    }
    if (password === null || password === '') {
      isproceed = false;
      errormessage += 'Password ';
    }
    if (!isproceed) {
      toast.warning(errormessage)
    }
    return isproceed;
  }




  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };


  const renderForm = (
    <>
      <section className='hero' style={{ display: "grid", justifyContent: "center" }}>
        <div className="logo-container mr-4" style={{ position: "absolute", left: "20%", top: "25%" }}>
          <img src="/assets/academy-logo.png" alt="Logo" className="logo mb-2" style={{
            width: "600px",
          }}
          />
        </div>
        <div className="ant-modal-content"
          style={{
            background: "white",
            width: "450px",
            padding: "20px 24px",
            borderRadius: "10px",
            color: "rgba(0, 0, 0, 0.88)",
            top: "25%",
            position: "absolute",
            left: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
          }}>

          <MDBContainer className="p-3 d-flex flex-column w-100" style={{ width: "520px" }}>

            {/* <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                  Login
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                  Register
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs> */}

            <MDBTabsContent>

              <MDBTabsPane show={justifyActive === 'tab1'}>
                <form>
                  <div className="text-center mb-3">

                    <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm" />
                      </MDBBtn>
                    </div>

                  </div>

                  <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' name='username' onChange={(event) => { setUsernameLogin(event.target.value); }} />
                  <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='password' onChange={(event) => { setPasswordLogin(event.target.value); }} />

                  <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                  </div>

                  <MDBBtn className="mb-4 w-100 bttn" onClick={handleLoginSubmit}>Sign in</MDBBtn>
                  <p className="text-center">Not a member? <a href="" onClick={() => handleJustifyClick('tab2')}>Register</a></p>
                </form>
              </MDBTabsPane>

              <MDBTabsPane show={justifyActive === 'tab2'}>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="text-center mb-3">

                    <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm" />
                      </MDBBtn>
                    </div>

                  </div>

                  <MDBInput wrapperClass='mb-4' label='Full Name' id='form3' type='text' onChange={(event) => { setName(event.target.value); }} />
                  <MDBInput wrapperClass='mb-4' label='Username' id='form4' type='text' onChange={(event) => { setUsername(event.target.value); }} />
                  <MDBInput wrapperClass='mb-4' label='Email' id='form5' type='email' onChange={(event) => { setEmail(event.target.value); }} />
                  <MDBInput wrapperClass='mb-4' label='Password' id='form6' type='password' onChange={(event) => { setPassword(event.target.value); }} />

                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' required />
                  </div>

                  <MDBBtn className="w-100 bttn" type='submit'>Sign up</MDBBtn>
                </form>
              </MDBTabsPane>

            </MDBTabsContent>

          </MDBContainer>
        </div>
      </section>
    </>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? navigate("/dashboard/app") : renderForm}
      </div>
    </div>
  );
}

