import "./Header.scss";

import {useEffect, useState} from "react"
import {useNavigate, NavLink} from "react-router-dom"

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
    return (
        <>
            <header className={`main-header ${scrolled ? 'sticky-header': ''}`}>
                <section className="header-content">
                    <section className="left">
                        ELEARN
                    </section>
                    <ul className="right">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/channels")}>Channels</li>
                        <li onClick={() => navigate("/profile")}>Profile</li>
                        <li onClick={() => navigate("/signin")}>Sign In</li>
                        <li onClick={() => navigate("/channel-register")}>Create a channel</li>
                    </ul>
                </section>
            </header>
        </>
    )
}

export {Header}