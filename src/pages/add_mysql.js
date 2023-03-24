import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";

import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { List } from 'rsuite';
import Axios from "axios";
import Contral from '../components/contral'; //匯入contral檔案
import '../components/rsuite_styles.css';


function Add_mysql() {

    const [shrimp_data , setShrimp_data] = useState({
        id : null,
        name : "",
        time : "",
        counts : null,
    });
    //將輸入的資料寫成
    const handleChange = (e) =>{
        //（...）意思叫擴展運算符號，並把input裡面的資料存為...prev的陣列裡面
        setShrimp_data((prev) => ({...prev, [e.target.name] : e.target.value}));
        console.log(shrimp_data);
    };
    
    //這邊的useNavigate是控制導向，用來控制頁面改變URL
    const navigate = useNavigate();
    
    /*輸入資料並使用[異步執行]。
    運行到await時流程是:當await後面的程式執行後才會向下執行*/
    const handle_add = async (e) =>{
        e.preventDefault()
        try{
            //透過Axios設定，連接至server「傳送資料的API」的功能
            //並傳送資料到Mysql
            await Axios.post("http://localhost:8801/api/create", shrimp_data)
            console.log(shrimp_data);
            navigate("/show");
        }catch(err){
            console.log(err);
        }
    };


  return (
    <div>
        <div className='from'>
            <h2>Add New Data</h2><br/>
            <input type="text" placeholder='ID' onChange={handleChange} name='id'/>
            <input type="text" placeholder='Name' onChange={handleChange} name='name'/>
            <input type="text" placeholder='Time' onChange={handleChange} name='time'/>
            <input type="number" placeholder='Counts' onChange={handleChange} name='counts'/>
            <Button  appearance={'ghost'} onClick = {handle_add}> Add Data </Button>
        </div>
        <br/><br/>
        <Contral/> 
        <br/><br/>  
        <div className='go_btn'>
            <Button appearance={'ghost'} className='go_home'>
                <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
                    登出
                </Link>
            </Button>
            <Button appearance={'ghost'} className='go_show'>
                <Link to="/show" style={{color: "inherit", textDecoration: "none"}}>
                    顯示紀錄
                </Link>
            </Button>
        </div>
    </div>
  )
}export default Add_mysql;
