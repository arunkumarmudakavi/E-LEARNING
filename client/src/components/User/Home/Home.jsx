import "./Home.scss"
import { useDispatch, useSelector } from "react-redux"


import { Videos } from "../../Channel/Videos/Videos"
import { httpGetVideos } from "../../../hooks/userRequest.js"
import { useEffect, useState } from "react"

import { getVideo } from "../../../features/handleSlice.js"

const Home = () => {
    
    // const {videos, setVideos} = useContext(Context);
    const [videos, setVideos] = useState({});

    useEffect(() => {
        getVideos();
    }, [])
    
    const dispatch = useDispatch()

    const getVideos = async (e) => {
         const response = await httpGetVideos()
         .then((res) => {
            //  console.log(res.data);
             setVideos(res.data)
             dispatch(getVideo(res.data))
            })
            .catch((err) => console.log(err))
            // console.log(response)
    }
    // console.log(videos);
    
    

    // const curState = useSelector((state) => state?.loggedUserData[0])
    
    const vid = useSelector((state) => state?.videos)
    // console.log(vid);
    
    // const loggedUserEmail = curState.text.email;
    // console.log(loggedUserEmail);
    return (
        <>
            <section className="main-container">
                Home 
            </section>
            <section className="vid">
                {/* <Videos videos={vid}/> */}
            </section>
        </>
    )
}

export {Home}