import React, { useState } from "react";

import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import InputField from "../../components/inputField/inputField";
import LoaderSpiner from "../../components/Loader/LoaderSpiner";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();

  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "Username is required";
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!values.email) {
      errors.email = "Email is require";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid Email Format";
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must have at least 6 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "one lowercase & one uppercase, one digit and  special character";
    }

    return errors;
  };

  const {
    formState,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    reset,
  } = useForm({
    init: initialState,
    validate: validateForm,
  });

  const handleRegisterSubmit = async ({ hasError, errors, values }) => {
    try {
      if (!hasError) {
        setLoading(true);
        const response = await axios.post(
          "https://classicit.onrender.com/api/auth/register",
          {
            userName: values.userName,
            email: values.email,
            password: values.password,
          }
        );
        const data = response.data;

        const token = data?.access_token;
        localStorage.setItem("access_token", token);
        loginUser(data?.user);
        console.log("User1:", data);
        navigate("/");
      }
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.log(error);
      setIsError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <Link
          to="/login"
          className=" w-8 cursor-pointer text-center rounded-full"
        >
          <FontAwesomeIcon size="xl" icon={faArrowLeft} />
        </Link>
        <h2 className="text-xl font-semibold py-2">
          Sign up to unlock the best Feature
        </h2>
        <form onSubmit={(e) => handleSubmit(e, handleRegisterSubmit)}>
          <div className="custom-input-container">
            <InputField
              label="Username"
              type="text"
              name="userName"
              placeholder="Enter Your Username"
              value={formState.userName.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={formState.userName.error}
            />
          </div>
          <div className="custom-input-container py-1">
            <InputField
              label={"Email"}
              type="email"
              name="email"
              value={formState.email.value}
              placeholder="Enter Your Email"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="custom-input"
              error={formState.email.error}
              required
            />
          </div>
          <div className="custom-input-container">
            <InputField
              label={"Password"}
              type="password"
              name="password"
              value={formState.password.value}
              placeholder="Enter Your Password"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="custom-input"
              error={formState.password.error}
              required
            />
          </div>
          {loading ? <LoaderSpiner /> : null}
          {isError && <span className="text-red-600 ">{isError}</span>}
          <div className="signup-button-container">
            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <div className="signup-or">
          <p>OR</p>
        </div>

        <div className="my-3">
          <p>
            Already have an account?{" "}
            <Link className="text-blue-800 font-bold" to="/login">
              Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
