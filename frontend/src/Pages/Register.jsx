import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import axios from "axios";

export const Register = () => {
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [usernameVal, setUsernameVal] = useState("");
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  console.log("component yeniden render edildi");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordVal(value);
    value?.length >= 8 ? setHasMinLength(true) : setHasMinLength(false);
    /[A-Z]/.test(value) ? setHasUppercase(true) : setHasUppercase(false);
    /[a-z]/.test(value) ? setHasLowercase(true) : setHasLowercase(false);
    /[!@#$%^&*(),.?":{}|<>]/.test(value)
      ? setHasSpecialChar(true)
      : setHasSpecialChar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const plainPassword = e.target.elements.password.value;
    const email = e.target.elements.email.value;
    console.log("data:", { username, plainPassword, email });
    try {
      const res = await axios.post("http://localhost:4000/api/register", {
        username,
        password: plainPassword,
        email,
      });
      console.log(res, "resf from backend api");
      if (res.status === 200) {
        window.localStorage.setItem("access token", res.data.token);
        toast.success("Kayıt başarılı!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
        window.location.href = "/";
      } else {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.log("error in axios", error);
      toast.error("error in network", {
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
      setUsernameVal("");
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1e1e2f] p-5 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Kayıt Ol
        </h2>

        <label
          htmlFor="username"
          className="block mb-4 text-gray-700 dark:text-gray-300"
        >
          Username
          <input
            autoComplete="off"
            value={usernameVal}
            onChange={(e) => {
              setUsernameVal(e.target.value);
              console.log("usernameVal", e.target.value);
            }}
            type="text"
            name="username"
            required
            className="w-full px-4 py-2 mt-1 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        <label
          htmlFor="email"
          className="block mb-4 text-gray-700 dark:text-gray-300"
        >
          E-posta
          <input
            autoComplete="off"
            value={emailVal}
            onChange={(e) => {
              setEmailVal(e.target.value);
              console.log("emailVal", e.target.value);
            }}
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 mt-1 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        <label
          htmlFor="password"
          className="block text-gray-700 dark:text-gray-300 relative"
        >
          Password
          <input
            autoComplete="off"
            value={passwordVal}
            onChange={handlePasswordChange}
            type={`${isPasswordVisible ? "text" : "password"}`}
            name="password"
            required
            className="w-full px-4 py-2 mt-1 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
          {isPasswordVisible ? (
            <Eye
              onClick={handleTogglePasswordVisibility}
              size="1.35rem"
              className="cursor-pointer absolute top-[40px] right-1"
            />
          ) : (
            <EyeOff
              onClick={handleTogglePasswordVisibility}
              size="1.30rem"
              className="cursor-pointer absolute top-[40px] right-1"
            />
          )}
        </label>

        <p className="flex flex-col gap-2 mb-6 mt-1">
          <small
            className={`text-gray-500 dark:text-gray-400 ${
              hasMinLength
                ? "text-green-500 dark:text-green-900"
                : "text-red-500"
            }`}
          >
            {hasMinLength && <Check className="inline-block" size="1.2rem" />}{" "}
            Şifreniz en az 8 karakter uzunluğunda olmalıdir.
          </small>
          <small
            className={`text-gray-500 dark:text-gray-400 ${
              hasUppercase
                ? "text-green-500 dark:text-green-900"
                : "text-red-500"
            }`}
          >
            {hasUppercase && <Check className="inline-block" size="1.2rem" />}{" "}
            Şifreniz bir büyük harf içermelidir.
          </small>
          <small
            className={`text-gray-500 dark:text-gray-400 ${
              hasLowercase
                ? "text-green-500 dark:text-green-900"
                : "text-red-500"
            }`}
          >
            {hasLowercase && <Check className="inline-block" size="1.2rem" />}{" "}
            Şifreniz bir küçük harf içermelidir.
          </small>
          <small
            className={`text-gray-500 dark:text-gray-400 ${
              hasSpecialChar
                ? "text-green-500 dark:text-green-900"
                : "text-red-500"
            }`}
          >
            {hasSpecialChar && <Check className="inline-block" size="1.2rem" />}{" "}
            Şifreniz bir ozel karakter içermelidir.
          </small>
        </p>

        <button
          type="submit"
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition ${
            hasMinLength &&
            hasUppercase &&
            hasLowercase &&
            hasSpecialChar &&
            emailVal &&
            usernameVal
              ? "cursor-pointer"
              : "disabled cursor-not-allowed opacity-50"
          }`}
        >
          Kayıt Ol
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </p>
      </form>

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
    </div>
  );
};
