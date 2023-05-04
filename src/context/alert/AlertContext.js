import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set alert
  const setAlert = (msg, type) => {
    dispatch({ type: "SET_ALERT", payload: { msg, type } });
  };
  //clear alert
  setTimeout(() => {
    dispatch({ type: "CLEAR_ALERT" });
  }, 3000);
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
