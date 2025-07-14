import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";

export const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const profileRef = useRef(null);

  const location = useLocation();
  // Sayfa ana sayfa mı kontrolü
  const isMainPage = location.pathname === "/";
  const { user, setUser } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setToggleProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleToggleProfile = () => {
    console.log("hereeee");
    setToggleProfile(!toggleProfile);
  };

  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("you hav pressed logout button");
    window.localStorage.removeItem("access token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="dark:bg-[#210F37] flex justify-between items-center px-6 py-4 drop-shadow-sm bg-white text-gray-900 dark:text-white">
      <Link to="/" className="text-xl font-bold">
        MyBlog
      </Link>

      {/* Mobil Menü Butonu */}
      <button onClick={toggleMenu} className="sm:hidden cursor-pointer">
        {user ? (
          <p className="bg-blue-800 w-6 h-6 rounded-full text-white cursor-pointer">
            {user?.username?.slice(0, 1).toUpperCase()}
          </p>
        ) : isMenuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

      <div className="items-center hidden sm:flex">
        {!isMainPage && (
          <Link
            to="/"
            className="hover:border-white px-3 py-1 border-2 rounded border-transparent "
          >
            Anasayfa
          </Link>
        )}
        {user ? (
          <div className="relative">
            <p
              className="bg-blue-800 w-6 h-6 rounded-full text-white cursor-pointer text-center"
              onClick={handleToggleProfile}
            >
              {user?.username?.slice(0, 1).toUpperCase()}
            </p>
            {toggleProfile && (
              <div
                className="flex flex-col justify-center items-center absolute right-0 top-11 border w-30 text-center"
                ref={profileRef}
              >
                <Link
                  to="/profile"
                  onClick={() => setToggleProfile(false)}
                  className="border w-full bg-slate-500 px-2 py-1"
                >
                  Profilim
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setToggleProfile(false)}
                  className="border w-full bg-slate-500 px-2 py-1"
                >
                  Ayarlar
                </Link>
                <button
                  onClick={handleLogOut}
                  className="border w-full bg-slate-500 px-2 py-1"
                >
                  Cıkış Yap
                </button>
                <button
                  onClick={toggleTheme}
                  className=" w-full px-3 border rounded dark:bg-white dark:text-black cursor-pointer bg-black text-white"
                >
                  {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="hover:border-white px-3 py-1 border-2 rounded border-transparent "
            >
              Giriş Yap
            </Link>
            <Link
              to="/register"
              className="hover:border-white px-3 py-1 border-2 rounded border-transparent "
            >
              Register
            </Link>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 border rounded dark:bg-white dark:text-black cursor-pointer bg-black text-white"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        )}
      </div>

      {/* Mobil Menü */}
      <div
        className={`${
          isMenuOpen ? "grid" : "hidden"
        } sm:hidden absolute top-16  bg-white dark:bg-[#210F37] shadow-sm  w-1/2 border right-0 rounded text-center`}
      >
        {!isMainPage && (
          <Link
            to="/"
            className="hover:bg-amber-100 dark:hover:bg-cyan-950 px-3 py-1 border-2 rounded border-transparent "
          >
            Anasayfa
          </Link>
        )}

        <Link
          to="/login"
          className="hover:bg-amber-100 dark:hover:bg-cyan-950 px-3 py-1 border-2 rounded border-transparent "
        >
          Giriş Yap
        </Link>
        <Link
          to="/register"
          className="hover:bg-amber-100 dark:hover:bg-cyan-950 px-3 py-1 border-2 rounded border-transparent "
        >
          Register
        </Link>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 border rounded dark:bg-white dark:text-black cursor-pointer bg-black text-white"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};
