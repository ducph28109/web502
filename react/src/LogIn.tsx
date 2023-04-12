import React, { useEffect } from 'react';
import { useState } from 'react';

const Login = ({ login, err }) => {
  const [valueInput, setValueInput] = useState({});
  console.log(err);
  const onHandChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValueInput({ ...valueInput, [name]: value });
  };
  const onHandSubmit = (e) => {
    e.preventDefault();
    login(valueInput);
  };
  return (
    <div className="containerLogin">
      <div className="left">
      
      </div>
      <div className="right">
        <form onSubmit={onHandSubmit}>
          <h1>Login</h1>
          {/* <strong>{err}</strong> */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={onHandChange}
              className="form-control"
              placeholder="Enter Price"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={onHandChange}
              className="form-control"
              placeholder="Enter Image"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-login">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
