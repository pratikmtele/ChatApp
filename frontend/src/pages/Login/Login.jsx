import React from "react";
import { TextingImage, Logo } from "../../assets/index.js";
import { Input, Button, CheckBox } from "../../components/index.js";

function Login() {
  const onChange = () => {};

  return (
    <div className="flex h-[742px]">
      <div className="gradient-color w-1/2 flex flex-col items-center justify-center">
        <img src={TextingImage} alt="" className="h-[400px]" />
        <h1 className="text-white text-3xl tracking-wide text-center mt-3 font-semibold">
          Welcome Back!
        </h1>
        <p className="text-center text-md text-white h-fit w-[440px] mt-4">
          Connect and message your friends and family privately and securely
          with Talkify.
        </p>
      </div>
      <div className=" w-1/2 flex flex-col justify-center items-center">
        <div className="bg-white rounded-md p-5 w-[500px]">
          <div className="flex gap-2">
            <img src={Logo} alt="Logo" className="w-5" />
            <h2 className="text-md font-semibold">Talkify</h2>
          </div>
          <h1 className="text-2xl font-bold mt-5">Log into your Account</h1>
          <form className="mt-7">
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="border border-t-0 border-x-0 border-gray-400 group-focus:static outline-none h-[40px]"
              onChange={onChange}
            />
            <Input
              type="password"
              name="Password"
              id="password"
              placeholder="Password"
              className="border border-t-0 border-x-0 mt-3 border-gray-400 group-focus:static outline-none h-[40px]"
              onChange={onChange}
            />
            <div className="flex items-center justify-between mt-5">
              <CheckBox />
              <a href="#">Forgot your password?</a>
            </div>
            <Button
              type="submit"
              label="Login"
              className="w-full gradient-color h-10 mt-5 text-white font-semibold tracking-wide"
            />
            <p className="mt-5 text-center">
              Don't have an account?{" "}
              <a href="#" className="">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
