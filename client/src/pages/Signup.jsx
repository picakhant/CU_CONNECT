import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { baseURL } from "../service";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState("");

  const { email, password, confirmPassword } = signUpData;

  const register = async () => {
    //input error handling
    if (email === "" || password === "" || confirmPassword === "") {
      toast.error("Please fill all field");
      return;
    }

    if (email === "") {
      toast.error("Please fill your email");
      return;
    }

    if (password === "") {
      toast.error("Please fill your password");
      return;
    }

    if (confirmPassword === "") {
      toast.error("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}/auth/register`, {
        email,
        password,
        confirmPassword,
      });
      console.log(response);
      setLoading(false);
      toast.success("Verificatin email was send, please verify.");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="row vh-100 justify-content-center align-items-center">
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
      <div className="col-12 col-md-6 col-lg-4 shadow">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className="text-center fs-3 fw-semibold">Sign up</div>
          <div className="mb-3">
            <label htmlFor="signup-user-email">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="signup-user-email"
              placeholder="example123@gmail.com"
              onChange={(e) => {
                setSignUpData({ ...signUpData, email: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signup-user-passwrod">Your Pasword</label>
            <input
              type="text"
              className="form-control"
              id="signup-user-passwrod"
              placeholder="Type your strong password"
              onChange={(e) => {
                setSignUpData({ ...signUpData, password: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signup-user-confirm-passwrod">
              Confrim Passwrod
            </label>
            <input
              type="text"
              className="form-control"
              id="signup-user-confirm-passwrod"
              placeholder="Retype your password"
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary w-100"
              disabled={loading && true}
              type="submit"
            >
              {!loading ? " Sign up" : "loading..."}
            </button>
          </div>
          <div className="mb-3">
            <Link to={"/login"}>
              <div className="btn btn-link w-100">Already account, Login</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
