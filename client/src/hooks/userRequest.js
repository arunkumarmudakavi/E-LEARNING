// import.meta.env.VITE_API_URL
import axios from "axios"

const httpSubmitUserRegister = async (data) => {
  try {
    // return await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // console.log({data});
    return await axios.post(`${import.meta.env.VITE_API_URL}/register`, data)
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpUserLogIn = async (data) => {
  try {
    // console.log(import.meta.env.VITE_API_URL);
    return await axios.post(`${import.meta.env.VITE_API_URL}/login`, data)
    // return await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // return JSON.stringify(data)
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpUserLogout = async (data) => {
  try {
    return await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetUserProfile = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/profile`)
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`);
  // const fetchedUser = await response.json();
  // return fetchedUser;
};

const httpChangeUserPassword = async (data) => {
  try {
    return await fetch(`${import.meta.env.VITE_API_URL}/changePassword`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetVideos = async () => {
  try {
    const videos = await axios.get(`${import.meta.env.VITE_API_URL}/videos`)

    // console.log(videos);
    return videos;
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetVideo = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/videos/:id`)
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export {
  httpSubmitUserRegister,
  httpUserLogIn,
  httpUserLogout,
  httpGetUserProfile,
  httpChangeUserPassword,
  httpGetVideos,
  httpGetVideo,
};
