//應用模組
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//CSS


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8801/api/auth/register", inputs);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  

  return (
    <div className="auth">
    <h1>註冊</h1>
    <form>
      <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
      <input required type="email" placeholder="email" name="email" onChange={handleChange} />
      <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
      <button onClick={handleSubmit}>Register</button>
      {err && <p>{err}</p>}
      <span>已經有帳號了<Link to="/">登入</Link></span>
    </form>
  </div>
);
}
export default Register

/*
        <input required type="text" placeholder='Username' name = "username" onChange={handleChange}/>
        <input required ype="email" placeholder='Email' name = "email" onChange={handleChange}/>
        <input required type="password" placeholder='Password' name = "password" onChange={handleChange}/>
 */


/**
 * 
const handleChange = (e) => {
    setUserReg((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:3001/api/register", userReg)
      //const res = await axios.post("http://localhost:3001/api/auth/register", inputs);
      navigate("/");
      console.log(res);
    }catch(err){
      setErr(err.response.data); //顯示server(api)裡auth中的錯誤訊息
      console.log(err);
    }
  }

<button onClick={handleSubmit}>註冊</button>
{err && <p>{err}</p>}
<span>已經有帳號了<Link to="/">登入</Link></span>
 */

/*
  //const [userReg, setUserReg] = useState("");
  const [usernameReg , setUsernameReg] = useState();
  const [passwordReg , setPasswordReg] = useState();
  const [emailReg , setEmailReg] = useState();
  const [RegisterStatus , setRegisterStatus] = useState();


    <input type="text" placeholder='Username'  
      onChange={(e) => {setUsernameReg(e.target.value);}}/>
    <input type="text" placeholder='Email' 
      onChange={(e) => {setEmailReg(e.target.value);}}/>
    <input type="password" placeholder='Password' 
      onChange={(e) => {setPasswordReg(e.target.value);}}/>
 */