import React from "react";
// import { httpGetVideos } from '../hooks/userRequest'
import { Link } from "react-router-dom";

const PostCard = ({ _id, title, thumbnail }) => {
  // const respose = httpGetVideos()
  // console.log(_id);
  return (
    <Link to={`/videos/${_id}`}  >
          <img className="max-w-full" src={thumbnail} alt={title} />
        <h2 className="text-white font-extrabold text-3xl">{title}</h2>
    </Link>
  );
};

export default PostCard;
