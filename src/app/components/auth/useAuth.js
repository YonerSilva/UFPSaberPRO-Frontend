import { useContext } from "react";
import AuthContext from "./AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("No hay contexto.");
    }
    return context;
}

export default useAuth;