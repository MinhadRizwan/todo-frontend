import React from 'react'
import "./Signup.css";
import axios from 'axios';
import { useState } from 'react';
import HeadingComp from './HeadingComp.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/index.js';

const Signin = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post('https://todo-backend-fpdg.onrender.com/api/v1/signin', Inputs).then((response) => {
      sessionStorage.setItem('id', response.data.others._id);
      dispatch(authAction.login());
      setInputs({
        email: "",
        username: "",
        password: ""
      });
      history("/todo")
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={Inputs.email}
                onChange={change}
              />
              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={Inputs.password}
                onChange={change}
              />
              <button className="btn-signup p-2 my-3" onClick={submit}>Sign In</button>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            <HeadingComp first="Already have an account?" second="Sign " third="In" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin;