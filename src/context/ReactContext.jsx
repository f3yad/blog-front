import { createContext, useEffect, useState } from "react";
import * as api from "../util/api";
export const ReactContext = createContext();

export default function ReactContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function loadUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }


  const value = {
    user,
    saveUser,
    loadUser,
    logout,
    api,
  }
  
  return (
    <ReactContext.Provider value={value}>
      { children }
    </ReactContext.Provider>
  );
}