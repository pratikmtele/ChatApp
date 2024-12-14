import React, { useState } from "react";
import { TextingImage, Logo } from "../../assets/index.js";
import { Input, Button, CheckBox } from "../../components/index.js";

function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onChange = () => {};

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
          <form className="mt-7">
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              className="border border-t-0 border-x-0 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
            />
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="border border-t-0 border-x-0 mt-7 lg:mt-5 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
            />
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border border-t-0 border-x-0 mt-7 lg:mt-5 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
              onChange={onChange}
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
                name="Password"
                id="password"
                placeholder="Password"
                className="border border-t-0 border-x-0 mt-7 lg:mt-5 pr-6 border-gray-400 group-focus:static outline-none h-12 lg:h-[40px]"
                onChange={onChange}
              />
            </div>
            <Button
              type="submit"
              label="REGISTER"
              className="w-full h-12 lg:h-10 mt-8 text-white gradient-color hover:opacity-80 transition-all ease-in-out duration-300 font-semibold tracking-wide rounded-md"
            />
            <p className="mt-7 text-center">
              Already have an account?
              <a href="#" className="ml-1 font-semibold">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
