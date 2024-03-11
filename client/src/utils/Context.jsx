import { createContext, useState } from "react";

const Context = createContext();

const AppContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState();

  return (
    <Context.Provider value={{ user, setUser, videos, setVideos }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AppContext };
