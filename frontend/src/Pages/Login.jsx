import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // yeni hook
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const Login = () => {
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const { setUser } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        email: email.value,
        password: password.value,
      });

      console.log("backend'ten gelen message bilgisi", res);
      if (res.status === 200) {
        window.localStorage.setItem("access token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log("ne oldu la oyle", error.response);
      console.log("error message", error.response.data.error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setEmailVal("");
      setPasswordVal("");
    }

    console.log("form submitted", {
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50 dark:bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1e1e2f] p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Giriş Yap
        </h2>

        <label className="block mb-4 text-gray-700 dark:text-gray-300">
          E-posta
          <input
            autoComplete="off"
            type="text"
            value={emailVal}
            onChange={(e) => {
              setEmailVal(e.target.value);
            }}
            name="email"
            required
            className="w-full px-4 py-2 mt-1 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        <label className="block mb-6 text-gray-700 dark:text-gray-300">
          Şifre
          <input
            autoComplete="off"
            type="password"
            value={passwordVal}
            onChange={(e) => {
              setPasswordVal(e.target.value);
            }}
            name="password"
            required
            className="w-full px-4 py-2 mt-1 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
        >
          Giriş Yap
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Do not have an account?{" "}
          <Link className="text-blue-700 underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
