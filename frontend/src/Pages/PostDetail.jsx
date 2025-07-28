import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleCommentEvent = (e) => {
    console.log("user is ", user.id);

    e.preventDefault();
    let userComment = e.target.comment;
    if (!userComment.value) return;
    console.log("userComment", userComment.value);
    try {
      axios
        .post(`http://localhost:4000/post/comment/${id}`, {
          userId: user.id,
          comment: userComment.value,
        })
        .then((res) => {
          console.log("res: ", res);
          setPost((prevPost) => ({
            ...prevPost,
            comments: res.data.comments,
          }));
        })
        .catch((err) => {
          console.log("error:", err);
        });
    } catch (error) {
      console.log(
        "istek atarken bir sorun olsutu belki network belki de baska bir sey",
        error
      );
    }
    userComment.value = "";
  };

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
      {/* kullanıcı giris yapmıs mı?  */}
      {user ? (
        <form className="mt-6" onSubmit={handleCommentEvent}>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Yorumunuzu yazın..."
            name="comment"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 mt-2 rounded"
          >
            Gönder
          </button>
        </form>
      ) : (
        <div>
          <span>Yorum yapmak için </span>
          <a
            href="/login"
            className="text-blue-900 underline underline-offset-6"
          >
            giriş
          </a>
          <span> yapınız</span>
        </div>
      )}
    </div>
  );
};
