import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        usuario: "",
        token: ""
    });
    const [active, setActive] = useState(false);

    return (
        <AuthContext.Provider value={{auth, setAuth , active, setActive}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;