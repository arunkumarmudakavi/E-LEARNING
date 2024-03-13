

import {useEffect, useState} from "react"
import { useSelector } from "react-redux";
import {useNavigate, Link} from "react-router-dom"
import {LogoutBtn, Container} from "../../index.js";


const Header = () => {
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        // console.log(offset);
        if(offset > 100) {
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    },[])

    const authStatus = useSelector((state) => state.auth.status)
    const channelAuthStatus = useSelector((state) => state.channelAuth.status)
    // console.log(authStatus);
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true && !channelAuthStatus
        },
        {
            name: 'Home',
            slug: "/channel-home",
            active: channelAuthStatus
        },
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus && !channelAuthStatus
        },
        {
            name: 'Register',
            slug: "/register",
            active: !authStatus && !channelAuthStatus
        },
        {
            name: 'Profile',
            slug: "/profile",
            active: authStatus
        },
        {
            name: 'Channel Register',
            slug: "/registerChannel",
            active: !authStatus && !channelAuthStatus
        },
        {
            name: 'Channel Login',
            slug: "/login-channel",
            active: !channelAuthStatus && !authStatus
        },
        {
            name: 'Profile',
            slug: "/channelProfile",
            active: channelAuthStatus
        },
        {
            name: 'Upload Video',
            slug: "/uploadVideo",
            active: channelAuthStatus
        },
    ]
    return (
            <header className={` ${scrolled ? 'sticky': ''}`}>
                <Container>
                    <nav className="bg-gray-700 text-white flex justify-between p-4 items-center">
                        <div className="caret-violet-50 text-3xl italic">
                            <Link to='/'>E-Lerning</Link>
                        </div>
                        <ul className="flex">
                            {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name} className="mr-6 text-lg">
                                    <button onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                            )}
                            { authStatus && (
                                <li>
                                    <LogoutBtn/>
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>
    )
}

export {Header}