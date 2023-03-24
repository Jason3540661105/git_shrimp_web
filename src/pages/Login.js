//應用模組
import React, { useState , useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

var url = 'http://192.168.1.106:8801';
//var url = 'http://192.168.0.112:8801'; //學校處
//var url = 'http://localhost:8801';


const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);       //存取從api獲取錯誤訊息
  const navigate = useNavigate();               //路徑導航模組

  //將username、password整合成一個prev的陣列
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //將username、password傳送至後端api，並去驗證是否有使用者
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url+"/api/auth/login", inputs);
      navigate("/show_page");
    } catch (err) {
      setError(err.response.data);
    }
  };

return (
  <div className="auth">
      <h1>登入</h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          還沒註冊帳號嗎? <Link to="/register">註冊</Link>
        </span>
      </form>
    </div>
  );
};

export default Login


/*
//應用模組
import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

//CSS

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);       //從api獲取錯誤訊息
  const navigate = useNavigate();               //路徑導航模組
  const { login } = useContext(AuthContext);    //匯入自己寫的login函示庫

  //將username、password整合成一個prev的陣列
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //將username、password傳送至後端api，並去驗證是否有使用者
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await login(inputs)
      navigate("/show");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
<div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          還沒註冊帳號嗎? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login
 */