import React, { useEffect } from "react";
import { httpGetVideos } from "../../../hooks/userRequest.js";

const Videos = ({ videos }) => {
  // useEffect(() => {
  //   httpGetVideos()
  // },[])
  // console.log(videos?.data?.data?.thumbnail);
  console.log(videos);
  return (
    <>
      {videos.map((el) => (
        <div className="video" key={el?.text?.data?._id}>
          <div className="video_top">
            <img className="thumb" src={el?.text?.data?.thumbnail} alt="thumbnail" />
            <span>10:44</span>
          </div>
          <div className="video_title">{el?.text?.data?.title}</div>
          <div className="video_description">{el?.text?.data?.description}</div>
        </div>
      ))}
    </>
  );
};

export { Videos };
