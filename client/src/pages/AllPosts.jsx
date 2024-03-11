import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import {httpGetVideos} from "../hooks/userRequest.js"

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    httpGetVideos([])
    .then((posts) => {
        if (posts) {
            setPosts(posts)
        }
    })
  return (
    <div>
        <Container>
            {posts.map((post) => (
                <div key={post._id}>
                    <PostCard post={post}/>
                </div>
            ))}
        </Container>
    </div>
  )
}

export default AllPosts