import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { baseURL } from "../service";
import { useParams } from "react-router-dom";
import validator from "validator";

const ProfileSetup = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uplodedImage, setUplodedImage] = useState(null);

  const { id } = useParams();

  const [profileData, setProfileData] = useState({
    account_id: id,
    name: "",
    username: "",
    semester: "",
    major: "",
    section: "",
    gender: "male",
    bio: "",
    avatar: "",
    coverPhoto: "",
  });

  const {
    account_id,
    name,
    username,
    semester,
    major,
    section,
    gender,
    bio,
    avatar,
    coverPhoto,
  } = profileData;

  const handleUploadProfile = async (e) => {
    e.preventDefault();

    //check the input err
    if (
      avatar === "" ||
      bio === "" ||
      name === "" ||
      username === "" ||
      semester === "empty" ||
      major === "empty" ||
      section === "empty"
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (avatar === "") {
      toast.error("Click the profile tag and upload your own picture.");
      return;
    }

    if (bio === "") {
      toast.error("Please add bio");
      return;
    }

    if (name === "") {
      toast.error("Please fill your name");
      return;
    }

    if (username === "") {
      toast.error("Please fill your name");
      return;
    }

    if (validator.isAlphanumeric(username)) {
      toast.error("invalid username");
      return;
    }

    if (semester === "empty") {
      toast.error("Please select semester");
      return;
    }

    if (major === "empty") {
      toast.error("Please select semester");
      return;
    }

    if (section === "empty") {
      toast.error("Please select semester");
      return;
    }

    try {
      const response = await axios.put(`${baseURL}/updateprofile`, {
        account_id,
        name,
        username,
        semester,
        major,
        section,
        gender,
        bio,
        avatar,
        coverPhoto,
      });
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //Convert to base 64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUplodedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-12 col-md-8 col-lg-6">
          <Toaster position="top-center" reverseOrder={false} gutter={8} />

          <form>
            <div className="container-fluid">
              <div className="row">
                {/* profile pic */}
                <div
                  className="mb-3 col-12 d-flex justify-content-center"
                  title="click for profile pic"
                >
                  <label
                    htmlFor="user-profile-uploader"
                    className="bg-white rounded-circle border border-primary"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <img
                      src={
                        uplodedImage
                          ? imagePreview
                          : `https://cdn-icons-png.flaticon.com/128/149/149071.png`
                      }
                      alt="img"
                      className="object-fit-cover rounded-circle"
                      title="click for upload profile pic"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleImageChange(e);
                      setProfileData({ ...profileData, avatar: imagePreview });
                    }}
                    name=""
                    className="d-none"
                    id="user-profile-uploader"
                  />
                </div>
                {/* bio */}
                <div className="mb-3 col-12">
                  <input
                    type="text"
                    placeholder="Add your bio"
                    className="user-bio d-block bg-body text-center mx-auto focused-input"
                    onChange={(e) => {
                      setProfileData({ ...profileData, bio: e.target.value });
                    }}
                  />
                </div>
                {/* full name */}
                <div className="mb-3 col-12 ">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    className="focused-input p-2 w-100"
                    onChange={(e) => {
                      setProfileData({ ...profileData, name: e.target.value });
                    }}
                  />
                </div>
                {/* username */}
                <div className="mb-3 col-12">
                  <input
                    type="text"
                    placeholder="Username"
                    className="focused-input p-2 w-100"
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* semester */}
                <div className="mb-3 col-6">
                  <select
                    className="focused-input p-2 w-100"
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        semester: e.target.value,
                      });
                    }}
                  >
                    <option value="empty">Select semester</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
                {/* major */}
                <div className="mb-3 col-6">
                  <select
                    className="focused-input p-2 w-100"
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        major: e.target.value,
                      });
                    }}
                  >
                    <option value="empty">Select major</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Technology">
                      Computer Technology
                    </option>
                  </select>
                </div>
                {/* Section */}
                <div className="mb-3 col-12">
                  <select
                    className="focused-input p-2 w-100"
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        section: e.target.value,
                      });
                    }}
                  >
                    <option value="empty">Select your Section</option>
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                    <option value="Section D">Section D</option>
                  </select>
                </div>
                {/* gender */}
                <div className="mb-3 col-12 d-flex justify-content-center gap-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="user-gender"
                      id="gender-male"
                      defaultChecked
                      onChange={() => {
                        setProfileData({ ...profileData, gender: "male" });
                      }}
                    />
                    <label className="form-check-label" htmlFor="gender-male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="user-gender"
                      id="gender-female"
                      onChange={() => {
                        setProfileData({ ...profileData, gender: "female" });
                      }}
                    />
                    <label className="form-check-label" htmlFor="gender-female">
                      Female
                    </label>
                  </div>
                </div>
                <div
                  className="mb-3 btn btn-primary w-75 mx-auto"
                  onClick={(e) => {
                    handleUploadProfile(e);
                  }}
                >
                  CONTINUE
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
