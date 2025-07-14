import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const PostDetail = () => {
  const { id } = useParams(); // ✅ URL'den id'yi alıyoruz
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("Post detay alınamadı:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!post) return <p>Post bulunamadı.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="my-4">{post.content}</p>

      <h2 className="text-xl mt-6 mb-2">Yorumlar</h2>
      {post.comments.length === 0 ? (
        <p>Henüz yorum yok.</p>
      ) : (
        post.comments.map((c, i) => (
          <div key={i} className="border p-2 rounded mb-2">
            <p className="font-semibold">{c.username}</p>
            <p>{c.content}</p>
          </div>
        ))
      )}

      {/* Yorum Ekleme Alanı */}
      <form className="mt-6">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Yorumunuzu yazın..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 mt-2 rounded"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};
