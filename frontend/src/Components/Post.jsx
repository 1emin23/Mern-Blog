import { Calendar, Heart, MessageSquareMore } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Post = ({ post }) => {
  const { user } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  let [likeCount, setLikeCount] = useState(post?.likes.length || 0);
  const [isLiked, setIsLiked] = useState(post?.likes.includes(user?.id));

  const navigate = useNavigate();

  const content = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(content.current);

  useEffect(() => {
    console.log("content.current.clientHeight:", content.current.clientHeight);
    console.log(content.current.scrollHeight > content.current.clientHeight);
    if (content.current.scrollHeight > content.current.clientHeight) {
      content.current = "hidden";
      setIsOverflowing(true);
    } else {
      content.current = "visible";
      setIsOverflowing(false);
    }
    console.log("content.current:", content.current);
  });

  console.log("content.current:", content.current);

  console.log("likeCount", likeCount);

  const handleLikeEvent = () => {
    // check if user is logged in
    if (!user) {
      console.log("içine girdik user bilgisi yok ama begenmeye calısıyor göt");
      return toast.error("Giriş Yapmalısınız!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
    if (isLiked) {
      console.log(`${user.username} adli kullanıcı ${user.id} bunu beğenmedi`);
      axios
        .delete(`http://localhost:4000/user/delete/${post._id}`, {
          data: { user_id: user.id },
        })
        .then((res) => {
          console.log("kullanıcı begenmedi ve endpointten gelen data", res);
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
        })
        .catch((err) => {
          console.log("begnemeyi kaldırırken bir hata olustu", err);
          setIsLiked(true);
        });
    } else {
      console.log(`${user.username} adli kullanıcı bunu beğendi`);
      axios
        .post(`http://localhost:4000/user/like/${post._id}`, {
          user_id: user.id,
        })
        .then((res) => {
          console.log("kullanıcı begendi ve endpointten gelen data", res);
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
        })
        .catch((err) => {
          console.log("begenirken bir hata olustu", err);
          setIsLiked(false);
        });
    }
  };

  const handleCommentEvent = (e) => {
    // check user is logged in
    navigate(`/detail/${post?._id}`);
    if (!user)
      return toast.error("Giriş Yapmalısınız!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });

    console.log(
      `Kullanıcı ad: ${user.username} \nKullanıcı id: ${user.id} \nPost id: ${post?._id}`
    );
  };

  return (
    <div
      key={post?.id}
      className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 dark:text-white m-5"
    >
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

      <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>

      <p ref={content} className="max-h-48 overflow-y-hidden">
        {isOverflowing}
        {content.current === "hidden" ? "hidden content" : "visible content"}
        <br />

        {post?.content}
        <br />
      </p>
      {content.current === "hidden" ? (
        <a href="" className="text-blue-900 underline underline-offset-4">
          devamını goster
        </a>
      ) : (
        "tamamı bu"
      )}

      <div className="sm:flex-row sm:items-center flex flex-col items-start justify-between gap-2 mt-2 text-gray-600 dark:text-gray-400 text-sm">
        <p className="flex gap-1 items-center">
          <Calendar className="" size="1rem" />
          <span>Created At: {post?.createdAt}</span>
        </p>
        {post?.lastUpdatedAt &&
          post?.lastUpdatedAt.trim() !== post?.createdAt.trim() && (
            <p className="flex gap-1 items-center">
              <Calendar className="" size="1rem" />
              Last Updated: {post?.lastUpdatedAt}
            </p>
          )}
      </div>

      <div className="flex gap-3">
        <p className="flex flex-row items-center mt-2">
          <Heart
            onClick={handleLikeEvent}
            color={isLiked ? "red" : "#000000"}
            className="cursor-pointer"
            size={15}
            fill={isLiked ? "red" : "none"}
            strokeWidth={1.5}
          />
          <span className="ms-1">{likeCount}</span>
        </p>

        <p className="flex flex-row items-center mt-2">
          <MessageSquareMore
            className="cursor-pointer"
            size={15}
            onClick={handleCommentEvent}
          />
          <span className="ms-1">{post?.comments.length}</span>
        </p>
      </div>
    </div>
  );
};
