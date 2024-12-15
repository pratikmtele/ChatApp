import { ToastContainer } from "react-toastify";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    console.log(accessToken);
  }, []);
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
