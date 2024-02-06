// import.meta.env.

const httpSubmitUserRegister = async (data) => {
  try {
    return await fetch(`${import.meta.env.API_URL}/register`, {
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

const httpUserLogIn = async (data) => {
  try {
    return await fetch(`${import.meta.env.API_URL}/login`, {
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

const httpUserLogout = async (data) => {
  try {
    return await fetch(`${import.meta.env.API_URL}/logout`, {
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
  const response = await fetch(`${import.meta.env.API_URL}/profile`);
  const fetchedUser = await response.json();
  return fetchedUser;
};

const httpChangeUserPassword = async (data) => {
  try {
    return await fetch(`${import.meta.env.API_URL}/changePassword`, {
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

export {
  httpSubmitUserRegister,
  httpUserLogIn,
  httpUserLogout,
  httpGetUserProfile,
  httpChangeUserPassword,
};
