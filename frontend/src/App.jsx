import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { NotFound } from "./Pages/NotFound";
import { Admin } from "./Pages/Admin";
import { Profile } from "./Pages/Profile";
import { Settings } from "./Pages/Settings";
import { PostDetail } from "./Pages/PostDetail";

export const App = () => {
  // Component yeniden render oldugunda eski oturumun acık kalması için app.js'te authContext ile user bilgisini localstorage'tan cekip set ediyoruz
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5] dark:bg-slate-900 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<PostDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};
