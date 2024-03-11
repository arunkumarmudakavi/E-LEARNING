import "./Header.scss";

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
        if(offset > 200) {
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    },[])

    const authStatus = useSelector((state) => state.auth.status)
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: "/signup",
            active: !authStatus
        },
        {
            name: 'All Videos',
            slug: "/videos",
            active: authStatus
        }
    ]
    return (
            <header className={`main-header ${scrolled ? 'sticky-header': ''}`}>
                <Container>
                    <nav>
                        <div>
                            <Link to='/'>Logo</Link>
                        </div>
                        <ul>
                            {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
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
                {/* <section className="header-content">
                    <section className="left">
                        ELEARN
                    </section>
                    <ul className="right">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/channels")}>Channels</li>
                        <li onClick={() => navigate("/profile")}>Profile</li>
                        <li onClick={() => navigate("/signin")}>Sign In</li>
                        <li onClick={() => navigate("/register")}>Sign Up</li>
                        <li onClick={() => navigate("/logout")}>Logout</li>
                        <li onClick={() => navigate("/channel-register")}>Create a channel</li>
                    </ul>
                </section> */}
            </header>
    )
}

export {Header}