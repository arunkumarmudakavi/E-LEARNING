import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.userData.data);
  // console.log(currentUser);
  return (
    <div className="flex justify-center ">
        
      <section className="bg-gray-600 text-white flex flex-col mt-12 max-w-fit p-16 rounded-lg text-xl ">
      <center className="text-4xl font-bold">Profile</center>
        <div className="flex flex-col m-2 w-96">
          First Name: <input className="rounded-md p-2" type="text" disabled value={currentUser.data.firstName} />
        </div>
        <div className="flex flex-col m-2">
          Last Name: <input className="rounded-md p-2" type="text" disabled value={currentUser.data.lastName} />
        </div>
        <div className="flex flex-col m-2">
          User Name: <input className="rounded-md p-2" type="text" disabled value={currentUser.data.username} />
        </div>
        <div className="flex flex-col m-2">
          Email: <input className="rounded-md p-2" type="text" disabled value={currentUser.data.email} />
        </div>
        <div className="flex flex-col m-2">
          Mobile Number:
          <input className="rounded-md p-2" type="text" disabled value={currentUser.data.mobileNumber} />
        </div>
      </section>
    </div>
  );
};

export { Profile };
