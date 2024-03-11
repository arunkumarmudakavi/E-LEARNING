import React from "react";
// import { httpGetVideos } from '../hooks/userRequest'
import { Link } from "react-router-dom";

const PostCard = ({ _id, title, thumbnail }) => {
  // const respose = httpGetVideos()
  return (
    <Link to={`/videos/${_id}`}>
      <div>
        <div>
          <img style={{ width: 400 }} src={thumbnail} alt={title} />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
