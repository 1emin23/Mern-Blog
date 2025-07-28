// src/pages/Settings.jsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const Settings = () => {
  const { user, setUser, loading } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    try {
      const res = await axios.put("http://localhost:4000/api/update", {
        userId: user?.id,
        username,
        password,
      });
      console.log("res from ", res);

      setUser(res.data.updatedUser); // Yeni bilgileri context'e yaz
      setSuccess("Bilgiler başarıyla güncellendi.");
      setPassword(""); // Şifre alanını temizle
    } catch (err) {
      console.error(err);
      setSuccess("Güncelleme başarısız.");
    }
  };
  if (loading) return <div>Yukleniyor .... {loading} </div>;

  if (!user)
    return <div className="text-center mt-10">Giriş yapmalısınız.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl shadow-md dark:bg-gray-900 bg-white dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Ayarlar</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Kullanıcı Adı</label>
          <input
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Yeni Şifre (opsiyonel)</label>
          <input
            type="password"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Değiştirmek istemiyorsanız boş bırakın"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Kaydet
        </button>

        {success && <p className="text-center mt-3">{success}</p>}
      </form>
    </div>
  );
};
