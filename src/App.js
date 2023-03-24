//應用模組
import React from "react";
import { Button, IconButton, ButtonGroup, ButtonToolbar } from "rsuite";
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

//組件的匯入檔案
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload_page from "./pages/Upload_page.js";
import Show_record_page from "./pages/Show_record_page.js";
import Add_mysql from "./pages/add_mysql.js";
import Testpage from "./pages/Testpage";

//CSS
import "./style.scss";
import "./Css/rsuite_styles.css";
import { Upload } from "antd";
//import './components/css/app_styles.css';

const router = createBrowserRouter([
  //登入頁面
  {
    
    path: "/",
    element: <Login />,
  },
  //為註冊頁面
  { 
    path: "/register",
    element: <Register />,
  },
  //上傳圖片頁面
  {
    path: "/upload_page",
    element: <Upload_page/>,
  },
  //新增、顯示計數資料頁面
  {
    path: "/show_page",
    element: <Show_record_page/>,
  },
  //新增資料頁面
  {
    //{local.host../add} : 增加[顯示表格、日期、時間、數量]紀錄
    path: "/add",
    element: <Add_mysql />,
  },
  //測試組件頁面
  {
    path: "/test",
    element: <Testpage/>,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
export default App;
