import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGetVideo } from "../hooks/userRequest.js";

const SingleVideo = () => {
  const [post, setPosts] = useState();
  // while using useParams the name should be same as name mationed in the route
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      httpGetVideo(id).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  return post ? (
    <div className="flex justify-center flex-col mt-5 items-center">
        <div className=" ">
      <video className=" max-w-5xl rounded-lg" controls>
        <source src={post?.data?.data?.videoFile} type="video/mp4" />
      </video>
      
    <section className="font-extrabold mt-2">
    <div className="text-3xl">{post?.data?.data?.title}</div>
    <div className="text-2xl text-ellipsis text-zinc-600">Description: {post?.data?.data?.description}</div>
    </section>
    </div>
    </div>
  ) : null;
};

export default SingleVideo;
