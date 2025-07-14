import axios from "axios";
import { Post } from "./Post";
import { useState } from "react";
import { useEffect } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/post/getAllPost");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex-grow w-full sm:w-[75%] m-auto">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
