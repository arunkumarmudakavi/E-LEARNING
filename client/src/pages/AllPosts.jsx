import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import {httpGetVideos} from "../hooks/userRequest.js"

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        httpGetVideos([])
        .then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }, [])
    
    // console.log(posts?.data?.data);
  return (
    <div>
        <Container>
            {posts?.data?.data?.map((post) => (
                <div key={post._id}>
                    <PostCard {...post}/>
                </div>
            ))}
        </Container>
    </div>
  )
}

export default AllPosts