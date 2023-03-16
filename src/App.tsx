import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import Login from "./pages/login";
import Profile from "./pages/profile";
const Register = lazy(() => import("./pages/register"));
const Edit = lazy(() => import("./pages/edit"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/edit_profile"
          element={
            <Suspense fallback={<Loading />}>
              <Edit />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
