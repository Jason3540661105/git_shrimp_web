//
import React, { useEffect, useState } from "react";
import Axios from "axios";

//外加conpoments

//外加UI模組
import { Button,Input,Popconfirm,Table,} from "antd";

//Css

//API路由用url代替
//var url = 'http://192.168.1.106:8801'; //租屋處
//var url = 'http://192.168.0.112:8801'; //學校處
var url = 'http://localhost:8801';


const Add_data = () => {

    const [add_data, setAdd_data] = useState({
        id: null,
        name: "",
        time: "",
        counts: null,
      });
      
    const addChange = (e) => {
        //（...）意思叫擴展運算符號，並把input裡面的資料存為...prev的陣列裡面
        setAdd_data((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(add_data);
      };
      
    const handle_add = async (e) => {
        e.preventDefault();
        try {
          //透過Axios設定，連接至server「傳送資料的API」的功能
          //並傳送資料到Mysql
          await Axios.post(url+"/api/create", add_data);
          console.log(add_data);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
        
    };
    
    
  return (
    <div>
        <div className="addData">
          <h4>請輸入想新增的資料</h4>
          
          <input
            type="text"
            placeholder="Time"
            onChange={addChange}
            name="time"
          />
          <input
            type="number"
            placeholder="Counts"
            onChange={addChange}
            name="counts"
          />
          <Button appearance={"ghost"} onClick={handle_add}>
              新增資料
          </Button>
        </div>
    </div>
  )
}

export default Add_data

//<input type="text" placeholder="ID" onChange={addChange} name="id" />