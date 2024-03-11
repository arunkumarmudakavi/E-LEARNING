import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpGetVideo } from '../hooks/userRequest.js'

const SingleVideo = () => {
    const [post, setPosts] = useState()
    // while using useParams the name should be same as name mationed in the route
    const {id} =useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(id) {
            httpGetVideo(id)
            .then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [id, navigate])

  return post ? (
    <div>
        <video width="750" height="500" controls >
      <source src={post?.data?.data?.videoFile} type="video/mp4"/>
     </video>
    </div>
  ) : null
}

export default SingleVideo