import React, { useEffect, useState } from "react";
import { ForgetPasswordImage, Logo } from "../../assets/index.js";
import { Input, Button } from "../../components/index.js";
import { Link } from "react-router-dom";
import { URL } from "../../assets/index.js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const [pending, setPending] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state || "";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const onChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // validation config
  const validationConfig = {
    password: [
      { required: true, message: "Password is required" },
      {
        minLength: 6,
        message: "Password should be at least 6 characters long",
      },
    ],
    confirmPassword: [
      { required: true, message: "Confirm password is required" },
      {
        match: "password",
        message: "Passwords do not match",
      },
    ],
  };

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

        if (rule.match && value !== formData[rule.match]) {
          errors[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errors);
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const errorData = validateData(passwords);

    if (Object.keys(errorData).length !== 0) {
      setPending(false);
      return;
    }

    try {
      const response = await axios.patch(`${URL}/api/v1/users/reset-password`, {
        token: token,
        password: passwords.password,
      });

      toast.success(response.data.message);
      setPending(false);
      navigate("/login");
    } catch (error) {
      setPending(false);
      toast.error(error.response.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center bg-blue-800 lg:bg-white lg:flex-row min-h-svh">
      <div className="gradient-color hidden lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <img src={ForgetPasswordImage} alt="" className="h-[400px]" />
        <h1 className="text-white text-3xl tracking-wide text-center mt-3 font-semibold">
          Reset Password
        </h1>
        <p className="text-center text-md text-white h-fit w-[440px] mt-4">
          Passwords protect your account. Update yours regularly for better
          security.
        </p>
      </div>
      <div className="px-2 lg:px-0 lg:w-1/2 flex flex-col lg:justify-center lg:items-center">
        <div className="bg-white rounded-md px-3 py-7 lg:px-5 lg:py-0 lg:w-[500px]">
          <div className="flex gap-2 items-center">
            <img src={Logo} alt="Logo" className="w-7 lg:w-5" />
            <h2 className="text-xl lg:text-md font-semibold">Talkify</h2>
          </div>
          <h1 className="text-2xl font-bold mt-8 lg:mt-5">
            Reset your password?
          </h1>
          <form className="mt-7" onSubmit={onSubmit}>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="New Password"
              value={passwords.password}
              className="border border-t-0 border-x-0 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
              error={errors.password}
            />
            <div className="relative mt-3">
              <i
                className={`fa-regular ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } absolute top-12 lg:top-4 right-0 z-50 cursor-pointer`}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
              <Input
                type={`${showPassword ? "text" : "password"}`}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                className="border border-t-0 border-x-0 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
                onChange={onChange}
                error={errors.confirmPassword}
              />
            </div>

            <Button
              type="submit"
              label="RESET PASSWORD"
              pending={pending}
              className="w-full h-12 lg:h-10 mt-5 text-white gradient-color hover:opacity-80 transition-all ease-in-out duration-300 font-semibold tracking-wide rounded-md"
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

export default ResetPassword;
