//
import React, { useEffect, useState } from "react";
import Axios from "axios";

//外加conpoments
import Header from "../components/header/Header.js";
import Add_data from "../components/add_data/Add_data.js";

//外加UI模組
import { Button,Input,Popconfirm,Table,} from "antd";
import {
  DeleteOutlined,
} from "@ant-design/icons"; //antd的插圖

//Css
import "../Css/show_record_page.css";

//API路由用url代替
//var url = 'http://192.168.1.106:8801'; //租屋處
//var url = 'http://192.168.0.112:8801'; //學校處
var url = 'http://localhost:8801';

const Show_record_page = () => {
  const [recordData, setRecordData] = useState([]); //存放shrimp_table所有的資料的數據
  const [sum, setSum] = useState([]); //存放蝦苗的總數
  const [search, setSearch] = useState(""); //存放想要搜尋資料的參數
  const [add_data, setAdd_data] = useState({
    id: null,
    name: "",
    time: "",
    counts: null,
  });
  var initial_sum = 0; //定義蝦苗數量為0

  

  useEffect(() => {
    const fetchAlldata = async () => {
      try {
        const response = await Axios.get(
          url+"/api/record_table"
        );
        //這邊用respone.data是為了下方record_table2.map((data, key)使用
        setRecordData(response.data); //存放mysql端蝦苗計數的資料
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlldata();
  }, []);


  //透過useffect函數不斷向mysql獲取counts欄位的蝦苗總和:
  useEffect(() => {
    const fetchAlldata = async () => {
      try {
        const response = await Axios.get(url+"/api/sum");
        setSum(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlldata();
  }, []);

  //透過更新資料按鈕刷新改變後的資料
  const resetData = () => {
    //get就是接收mysql: shrimp_database中record_table的資料
    Axios.get(url+"/api/record_table").then((response) => {
      setRecordData(response.data);
      console.log("response");
      console.log(recordData);
    });
  };
  //透過delete按鈕刪除record_table一項表格的紀錄
  const Del_data = async (id) => {
    try {
      await Axios.delete(url+"/api/record_table/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //默認表格個欄位的屬性
  const defaultColumns = [
    {
      title: "編號",
      dataIndex: "id",
      width: "30%",
      //editable: true,
    },
    {
      title: "日期",
      dataIndex: "time",
    },
    {
      title: "數量",
      dataIndex: "counts",
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) =>
        recordData.length >= 1 ? (
          <Popconfirm
            title="確定要刪除?"
            //將該欄位的key帶入handleDelete
            onConfirm={() => Del_data(record.id)}
          >
            <Button type="primary" danger style={{ marginBottom: 16 }}>
              <DeleteOutlined />
              刪除
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const columns = defaultColumns.map((col) => {
    /**map函數用於創建一個新的陣列 (col) */
    if (!col.editable) {
      /**if(![]) 代表if裡的式子為[true]，則結果為false*/
      return col;
    }
    return {
      ...col,
      // => ({})用大括號將內容括起來，返回一個物件字面值表示法：
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="show_sum">
        {sum.map((sum_data) => (
          <div className="sum_data" key={sum_data.total_sum}>
            <h3>蝦苗總數為 : {sum_data.total_sum + initial_sum}</h3>
          </div>
        ))}
      </div>
      <div className="search_reset">
        <Input
          placeholder="輸入想查詢的日期"
          allowClear        //搜尋欄清除按鈕
          size="large"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="resetData">
          <Button className="reset" size="large" onClick={resetData}>
            更新資料
          </Button>
        </div>
      </div>
      <br />

      <div className="antdTable">
        <Add_data /><br/>
        <br />
        <Table
          rowClassName={() => "editable-row"}
          bordered /*表格的邊框 */
          dataSource={recordData.filter((Data,index) => {
            return search.toLowerCase() === ""
              ? Data
              : Data.time.toLowerCase().includes(search);
          })}
          columns={columns} /*匯入表格默認欄位的格式*/
        />
      </div>
    </div>
  );
};

export default Show_record_page;


/*
          dataSource={recordData.filter((Data) => {
            //這邊的filter是負責搜尋日期並顯示相對應的檔案
            return search.toLowerCase() === ""
              ? 
              //search為空字串時(True)，會顯示原本的data資料
              //否則(False)顯示跟search字串和[Data.time]有關的資料
              Data
              : Data.time.toLowerCase().includes(search);
          })} //將mysql的帶入表格中
 */

//增加一筆資料
/* 網頁顯示元件
        <div className="addData">
          <h4>請輸入想新增的資料</h4>
          <input type="text" placeholder="ID" onChange={addChange} name="id" />
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
 */
/* 元件內部的判斷式
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
 */
//增加一筆資料[結束]