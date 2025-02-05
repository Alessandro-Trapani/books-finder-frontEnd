import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");

  const saveJwt = (token) => {
    setJwt(token);
    localStorage.setItem("jwt", JSON.stringify(token));
  };

  const clearJwt = () => {
    setJwt("");
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider value={{ jwt, saveJwt, clearJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
