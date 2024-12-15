import React, { useState } from "react";
import { TextingImage, Logo } from "../../assets/index.js";
import { Input, Button } from "../../components/index.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // validation config
  const validationConfig = {
    fullname: [
      { required: true, message: "Full Name is required" },
      {
        minLength: 5,
        message: "Full name should be at least 5 characters long",
      },
    ],
    username: [
      { required: true, message: "Username is required" },
      {
        minLength: 3,
        message: "Username should be at least 3 characters long",
      },
    ],
    email: [
      { required: true, message: "Email is required" },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email is not valid" },
    ],
    password: [
      { required: true, message: "Password is required" },
      {
        minLength: 6,
        message: "Password should be at least 6 characters long",
      },
    ],
  };

  // function to validate input fields
  const validateData = (formData) => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errors[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errors[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errors);
    return errors;
  };

  const onChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setPending(true);

    const errorsData = validateData(userData);
    if (Object.keys(errorsData).length !== 0) {
      setPending(false);
      return;
    }

    axios
      .post(`${URL}/api/v1/users/signup`, userData)
      .then((response) => {
        setPending(false);
        toast.success(response.data.message);

        setUserData({
          fullname: "",
          username: "",
          email: "",
          password: "",
        });

        navigate("/login");
      })
      .catch((error) => {
        setPending(false);
        toast.error(error.response.data.message);
      })
      .finally(() => setPending(false));
  };

  const ShowPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className="flex flex-col justify-center bg-blue-800 lg:bg-white lg:flex-row min-h-svh">
      <div className="gradient-color hidden lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <img src={TextingImage} alt="" className="h-[400px]" />
        <h1 className="text-white text-3xl tracking-wide text-center mt-3 font-semibold">
          Welcome to Talkify
        </h1>
        <p className="text-center text-md text-white h-fit w-[440px] mt-4">
          Get started in a few clicks and message your friends and family.
        </p>
      </div>
      <div className="px-2 lg:px-0 lg:w-1/2 flex flex-col lg:justify-center lg:items-center">
        <div className="bg-white rounded-md px-3 py-7 lg:px-5 lg:py-0 lg:w-[500px]">
          <div className="flex gap-2 items-center">
            <img src={Logo} alt="Logo" className="w-7 lg:w-5" />
            <h2 className="text-xl lg:text-md font-semibold">Talkify</h2>
          </div>
          <h1 className="text-2xl font-bold mt-8 lg:mt-5">
            Create your Account
          </h1>
          <form className="mt-7" onSubmit={onSubmitHandle}>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              value={userData.fullname}
              className="border border-t-0 border-x-0 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
              error={errors.fullname}
            />
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userData.username}
              className="border border-t-0 border-x-0 mt-7 lg:mt-5 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
              error={errors.username}
            />
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={userData.email}
              className="border border-t-0 border-x-0 mt-7 lg:mt-5 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
              error={errors.email}
            />
            <div className="relative">
              <i
                className={`fa-regular ${
                  isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                } absolute top-12 lg:top-8 right-0 z-50 cursor-pointer`}
                onClick={ShowPassword}
              ></i>
              <Input
                type={`${isPasswordVisible ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Password"
                value={userData.password}
                className="border border-t-0 border-x-0 mt-7 lg:mt-5 pr-6 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
                onChange={onChange}
                error={errors.password}
              />
            </div>
            <Button
              type="submit"
              label="REGISTER"
              pending={pending}
              className="w-full h-12 lg:h-10 mt-8 text-white gradient-color hover:opacity-80 transition-all ease-in-out duration-300 font-semibold tracking-wide rounded-md"
            />
            <p className="mt-7 text-center">
              Already have an account?
              <Link to="/login" className="ml-1 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
