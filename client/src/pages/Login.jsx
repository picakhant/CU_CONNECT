import React from "react";

const Login = () => {
  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-12 col-md-6 col-lg-4 shadow">
        <form>
          <div className="mb-3">
            <label htmlFor="user-login-email">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="user-login-email"
              placeholder="exapmle123@gmail.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user-login-password">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="user-login-password"
              placeholder="Type your password"
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary w-100">Login</button>
          </div>
          <div className="mb-3">
            <div className="btn btn-link">Forgot password?, click herer!</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
