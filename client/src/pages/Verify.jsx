import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../service";
import toast, { Toaster } from "react-hot-toast";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const verify = async () => {
    try {
      const response = await axios.get(`${baseURL}/auth/verifyemail/${token}`);
      console.log(response.data);
      toast.success(response.data.message + " ,please wait!");
      setTimeout(() => {
        navigate(`/profile-setup/${response.data.user._id}`);
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="row align-items-center justify-content-center vh-100">
      <div className="col-12 col-md-6 col-lg-4">
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
        <div className="card shadow border-success">
          <div className="card-body d-flex flex-column gap-3 align-items-center justify-content-center">
            <div className="fs-3 fw-semibold text-success ">Verify is you</div>
            <div className="text-lead text-center">
              Make sure is you and press the button. We send verification link
              to your email.
            </div>
            <div
              className="btn  btn-success rounded-pill w-75"
              onClick={() => {
                verify();
              }}
            >
              Verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
