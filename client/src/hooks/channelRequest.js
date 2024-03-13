import axios from "axios"
// I think error occurs here
const httpChannelRegister = async (data) => {
  try {
    // return await fetch(`${import.meta.env.CHANNEL_API_URL}/registerChannel`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "auto",
    //   },
    //   body: JSON.stringify(data),
    // });
    // console.log(data);
    return await axios.post(`${import.meta.env.VITE_CHANNEL_API_URL}/registerChannel`, data)
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChannelLogin = async (data) => {
  try {
    // console.log(data);
    // return await fetch(`${import.meta.env.VITE_CHANNEL_API_URL}/login-channel`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    return await axios.post(`${import.meta.env.VITE_CHANNEL_API_URL}/login-channel`, data)
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChannelLogout = async (data) => {
  try {
    return await fetch(`${import.meta.env.CHANNEL_API_URL}/logout-channel`, {
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

const httpGetChannelProfile = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_CHANNEL_API_URL}/channelProfile`)
    // const response = await fetch(`${import.meta.env.VITE_CHANNEL_API_URL}/channelProfile`);
    // return await response.json();
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChangeChannelPassword = async (data) => {
  try {
    return await fetch(`${import.meta.env.CHANNEL_API_URL}/changePassword`, {
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

// I think error occurs here
const httpUpdateAvatar = async (data) => {
  try {
    return await fetch(`${import.meta.env.CHANNEL_API_URL}/avatar`, {
      method: "post",
      headers: {
        "Content-Type": "auto",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
};

// I think error occurs here
const httpUploadVideo = async (data) => {
  try {
    return await fetch(`${import.meta.env.CHANNEL_API_URL}/uploadVideo`, {
      method: "post",
      headers: {
        "Content-Type": "auto",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export {
  httpChannelRegister,
  httpChannelLogin,
  httpChannelLogout,
  httpGetChannelProfile,
  httpChangeChannelPassword,
  httpUpdateAvatar,
  httpUploadVideo,
};
