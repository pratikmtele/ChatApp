import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  OTP,
  Register,
  ResetPassword,
  Home,
} from "./pages/index.js";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./context/SocketContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OTP />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ChatProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={routes}>
              <App />
            </RouterProvider>
          </PersistGate>
        </ChatProvider>
      </SocketProvider>
    </Provider>
  </StrictMode>
);
