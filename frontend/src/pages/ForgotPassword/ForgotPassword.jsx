import React, { useState } from "react";
import { ForgetPasswordImage, Logo } from "../../assets/index.js";
import { Input, Button } from "../../components/index.js";
import { Link } from "react-router-dom";
import { URL } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ForgotPassword() {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setErrors] = useState("");

  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // function to validate input fields
  const validateData = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";
    if (!email) {
      error = "Email ID is required";
    } else if (!pattern.test(email)) {
      error = "Email ID is not valid";
    }
    setErrors(error);
    return error;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const error = validateData(email);

    if (error) {
      setPending(false);
      return;
    }

    axios
      .post(`${URL}/api/v1/users/send-otp`, { email: email })
      .then((response) => {
        toast.success(response.data.message);
        setPending(false);
        const token = response.data.data.token;
        navigate("/verify-otp", { state: token });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setPending(false);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="flex flex-col justify-center bg-blue-800 lg:bg-white lg:flex-row min-h-svh">
      <div className="gradient-color hidden lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <img src={ForgetPasswordImage} alt="" className="h-[400px]" />
        <h1 className="text-white text-3xl tracking-wide text-center mt-3 font-semibold">
          Forget Password
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
            Forget your password?
          </h1>
          <p className="mt-4 text-sm">Please enter your registered email ID.</p>
          <p className="mt-1 text-sm">
            We will send a verification code to your registered email ID.
          </p>
          <form className="mt-7" onSubmit={onSubmit}>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              className="border border-t-0 border-x-0 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onEmailChange}
              error={error}
            />
            <Button
              type="submit"
              label="FORGET PASSWORD"
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

export default ForgotPassword;
