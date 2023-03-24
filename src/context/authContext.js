/*import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8801/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8801/api/auth/logout");
    setCurrentUser(null);
    

  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
*/

//記得要去網頁的index檔案加上 <AuthContexProvider>      </React.StrictMode>
/**
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContexProvider>   <=====
      <App />
    </AuthContexProvider>  <=====
  </React.StrictMode>
);
 */