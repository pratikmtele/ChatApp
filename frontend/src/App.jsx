import { ToastContainer } from "react-toastify";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
