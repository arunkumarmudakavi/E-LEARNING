import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../../index.js";
import { useSelector } from "react-redux";
import { httpGetVideos } from "../../../hooks/userRequest.js";

const channelHome = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.channelAuth.status);
  // console.log(authStatus);
  useEffect(() => {
    httpGetVideos()
    .then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  if (authStatus != true) {
    return (
      <div className="text-2xl font-bold font-serif h-32 flex items-center justify-center">
        <Container>Login to Get Videos</Container>
      </div>
    );
  }
  // if (posts.length === 0) {
  //     return (
  //         <div>
  //             <Container>
  //                 Login to Get Videos
  //             </Container>
  //         </div>
  //     )
  // }
  // const style = {
  //   display: grid;
  //   : repeat(3, 1fr);
  // }

  return (
    <div>
      <Container>
        {posts?.data?.data?.map((post) => (
          <div key={post?._id}  className="max-w-screen-sm p-4 mt-3 mb-6 rounded-md m-auto flex justify-center bg-slate-400">
            {/* <PostCard post ={post}/> or below 
                        console.log(post)*/}
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default channelHome;
