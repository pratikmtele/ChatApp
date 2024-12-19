import React, { useEffect, useRef, useState } from "react";
import { OTPImage, Logo } from "../../assets/index.js";
import { Input, Button } from "../../components/index.js";
import { URL } from "../../assets/index.js";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function OTP() {
  const [userOTP, setUserOTP] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [pending, setPending] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const navigate = useNavigate();
  const routerLocation = useLocation();
  const email = routerLocation.state || "";

  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
    if (!email) navigate("/login");
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    const index = parseInt(name, 10) - 1;

    setUserOTP((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (value) {
      if (index < 5) {
        inputs[index + 1].ref.current.focus();
      }
    } else {
      if (index > 0) {
        inputs[index - 1].ref.current.focus();
      }
    }
  };

  const inputs = [
    {
      type: "number",
      name: "1",
      id: "1",
      onChange: onChange,
      value: userOTP[1],
      error: "",
      ref: ref1,
    },
    {
      type: "number",
      name: "2",
      id: "",
      onChange: onChange,
      value: userOTP[2],
      error: "",
      ref: ref2,
    },
    {
      type: "number",
      name: "3",
      id: "3",
      onChange: onChange,
      value: userOTP[3],
      error: "",
      ref: ref3,
    },
    {
      type: "number",
      name: "4",
      id: "4",
      onChange: onChange,
      value: userOTP[4],
      error: "",
      ref: ref4,
    },
    {
      type: "number",
      name: "5",
      id: "5",
      onChange: onChange,
      value: userOTP[5],
      error: "",
      ref: ref5,
    },
    {
      type: "number",
      name: "6",
      id: "6",
      onChange: onChange,
      value: userOTP[6],
      error: "",
      ref: ref6,
    },
  ];

  const OTPValidation = (userOTP) => {
    if (
      userOTP[1] === "" ||
      userOTP[2] === "" ||
      userOTP[3] === "" ||
      userOTP[4] === "" ||
      userOTP[5] === "" ||
      userOTP[6] === ""
    )
      return "Please enter all 6 digits of the OTP.";

    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    const error = OTPValidation(userOTP);
    if (error !== "") {
      toast.error(error);
      setPending(false);
      return;
    }

    const otp = parseInt(
      userOTP[1] +
        userOTP[2] +
        userOTP[3] +
        userOTP[4] +
        userOTP[5] +
        userOTP[6]
    );

    axios
      .post(`${URL}/api/v1/users/verify-otp`, { otp, email: email })
      .then((response) => {
        toast.success(response.data.message);
        setPending(false);
        navigate("/reset-password", { state: email });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setPending(false);
      })
      .finally(() => setPending(false));
  };

  const onOTPResend = (e) => {
    if (!email) {
      toast.error(
        "Something went wrong Please to go back forget Password page and try again"
      );
      return;
    }
    axios
      .post(`${URL}/api/v1/users/send-otp`, { email: email })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex flex-col justify-center bg-blue-800 lg:bg-white lg:flex-row min-h-svh">
      <div className="gradient-color hidden lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <img src={OTPImage} alt="" className="h-[400px]" />
        <h1 className="text-white text-3xl tracking-wide text-center mt-3 font-semibold">
          OTP Verification
        </h1>
        <p className="text-center text-md text-white h-fit w-[440px] mt-4">
          Connect and message your friends and family privately and securely
          with Talkify.
        </p>
      </div>
      <div className="px-2 lg:px-0 lg:w-1/2 flex flex-col lg:justify-center lg:items-center">
        <div className="bg-white rounded-md px-3 py-7 lg:px-5 lg:py-0 lg:w-[500px]">
          <div className="flex gap-2 items-center">
            <img src={Logo} alt="Logo" className="w-7 lg:w-5" />
            <h2 className="text-xl lg:text-md font-semibold">Talkify</h2>
          </div>
          <h1 className="text-2xl font-bold mt-8 lg:mt-5">Enter OTP Code</h1>
          <p className="text-sm">
            Enter 6-digit OTP here we just sent at your email
          </p>
          <form className="mt-7" onSubmit={onSubmit}>
            <div className="flex gap-4 w-full justify-center">
              {inputs.map((inputField) => (
                <Input
                  key={inputField.id}
                  type={inputField.type}
                  placeholder=""
                  id={inputField.id}
                  name={inputField.name}
                  error={inputField.error}
                  min="0"
                  max="9"
                  step="1"
                  value={inputField.value}
                  onChange={inputField.onChange}
                  ref={inputField.ref}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 1))}
                  className="border border-gray-400 mt-4 h-8 w-9 rounded-md no-spinner text-center outline-none hover:border-blue-600"
                />
              ))}
            </div>
            <Button
              type="submit"
              label="CONTINUE"
              pending={pending}
              className="w-full h-12 lg:h-10 mt-5 text-white gradient-color hover:opacity-80 transition-all ease-in-out duration-300 font-semibold tracking-wide rounded-md"
            />
            <p className="mt-7 text-center">
              Didn't receive the code?
              <span
                className="ml-1 font-semibold cursor-pointer"
                onClick={onOTPResend}
              >
                Resend
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTP;
