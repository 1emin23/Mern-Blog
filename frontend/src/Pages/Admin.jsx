import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user)
    return (
      <div>
        Uzgunum boyle bir sayfamız yok
        <Link className="text-blue-900 underline" to="/">
          Anasayfa
        </Link>
      </div>
    );
  return <div>You are Admin</div>;
};
