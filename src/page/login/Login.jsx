import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputField from "../../components/inputField/inputField";
import LoaderSpiner from "../../components/Loader/LoaderSpiner";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const initialState = {
    identifier: "",
    password: "",
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.identifier) {
      errors.identifier = "Username or Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const { formState, handleBlur, handleChange, handleFocus, handleSubmit } =
    useForm({
      init: initialState,
      validate: validateForm,
    });

  const handleLoginSubmit = async ({ hasError, errors, values }) => {
    try {
      if (!hasError) {
        setLoading(true);
        const response = await axios.post(
          "https://classicit.onrender.com/api/auth/login",
          {
            identifier: values.identifier,
            password: values.password,
          }
        );
        const userData = response.data;

        loginUser(userData?.user);

        setLoading(false);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
      setIsError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="text-xl font-semibold py-5">Ready for use MediaBook?</h2>
        <form onSubmit={(e) => handleSubmit(e, handleLoginSubmit)}>
          <div className="custom-login-input-container">
            <InputField
              label="Email or Username"
              type="text"
              name="identifier"
              placeholder="Enter Your Email or Username"
              value={formState.identifier.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={formState.identifier.error}
              required
            />
          </div>

          <div className="custom-login-input-container">
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formState.password.value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={formState.password.error}
              required
            />
          </div>

          {loading ? <LoaderSpiner /> : null}
          {loading ? <LoaderSpiner /> : null}
          {isError && <span className="text-red-600 ">{isError}</span>}
          <div className="signup-button-container">
            <button className="signup-button" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="login-or">
          <p>OR</p>
        </div>
        <Link to="/register" className="mt-4 w-full facebook-login ">
          <button>Sign Up </button>
          <FontAwesomeIcon
            className="w-6 ml-3"
            icon={faChevronRight}
            beatFade
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
