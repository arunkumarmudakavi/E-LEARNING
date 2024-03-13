import { useSelector } from "react-redux";

const Profile = () => {
    
    const currentUser = useSelector((state) => state.auth.userData.data)
    // console.log(currentUser);
    return (
        <>
        <section>
            <h1>{currentUser.data.firstName}</h1>
            <h1>{currentUser.data.lastName}</h1>
            <h1>{currentUser.data.username}</h1>
            <h1>{currentUser.data.email}</h1>
            <h1>{currentUser.data.mobileNumber}</h1>
        </section>
        </>
    )
}

export {Profile}