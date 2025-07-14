// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Post } from "../Components/Post";

export const Profile = () => {
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`http://localhost:4000/user/${user?.id}`)
      .then((res) => {
        console.log(res.data);
        setLikedPosts(res.data.likedPosts || []);
        setCommentedPosts(res.data.commentedPosts || []);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [user]);

  if (!user)
    return <div className="text-center mt-10">Giriş yapmalısınız.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Beğenilen Gönderiler</h2>
      {likedPosts.length > 0 ? (
        likedPosts.map((post) => (
          <Post key={post._id} post={post} />
          // <div key={post._id} className="mb-4 p-4 border rounded shadow">
          //   <h3 className="font-semibold">{post.title}</h3>
          //   <p>{post.content.slice(0, 100)}...</p>
          // </div>
        ))
      ) : (
        <p>Henüz beğenilen gönderi yok.</p>
      )}

      <h2 className="text-xl font-bold my-4">Yorum Yapılan Gönderiler</h2>
      {commentedPosts.length > 0 ? (
        commentedPosts.map((post) => (
          <div key={post._id} className="mb-4 p-4 border rounded shadow">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
          </div>
        ))
      ) : (
        <p>Henüz yorum yapılan gönderi yok.</p>
      )}
    </div>
  );
};
