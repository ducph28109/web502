import React, { useEffect } from 'react';
import { useState } from 'react';

const Register = ({ signUp, err }) => {
  const [valueInput, setValueInput] = useState({});
  const [errs, setErrs] = useState('');

  const onHandChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValueInput({ ...valueInput, [name]: value });
  };
  const onHandSubmit = (e) => {
    e.preventDefault();
    signUp(valueInput);
  };
  return (
    <div className="containerSignUp">
      <div className="left-signUp">
       
      </div>
      <div className="right-signUp">
        <form onSubmit={onHandSubmit}>
          <h1>Register</h1>
          <em style={{ color: 'red' }}>
            {err}
            {errs}
          </em>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={onHandChange}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={onHandChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={onHandChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Res_Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={onHandChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-signUp btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
