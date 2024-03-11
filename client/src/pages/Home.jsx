import React, { useEffect, useState } from "react";
import { httpGetVideos } from "../hooks/userRequest.js";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    httpGetVideos().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  if (authStatus != true) {
    return (
      <div>
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

  return (
    <div>
      <Container>
        {posts?.data?.data?.map((post) => (
          <div key={post?._id}>
            {/* <PostCard post ={post}/> or below 
                        console.log(post)*/}
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Home;
