import { createContext, useContext, useMemo, useReducer } from "react";
import { ACCION } from "../actions/Acciones";
import { initialState, storeReducer } from "../reducers/storeReducer";

const StoreContext = createContext();

const StoreProvider = ({children}) => {

     const [store, dispatch] = useReducer(storeReducer, initialState);

     return (
          <StoreContext.Provider value={[store, dispatch]}>
               {children}
          </StoreContext.Provider>
     )
}

const useStore = () => useContext(StoreContext)[0];
const useDispatch = () => useContext(StoreContext)[1];

export {StoreContext, useStore,useDispatch};
export default StoreProvider;