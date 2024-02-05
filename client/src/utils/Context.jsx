import { createContext } from "react";

const Context = createContext();

const AppContext = ({ children }) => {
    return <Context.Provider>{children}</Context.Provider>
}

export {
    Context,
    AppContext,
}