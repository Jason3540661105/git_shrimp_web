import React, { useContext, useEffect, useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

//Css
import classes from "./Header.module.scss";

const Header = () => {
  //const history = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined, 
    height: undefined,
    //這部分讓長寬數值默認300
    //防止使用menu到下個頁面，視窗依舊 [size.width < 768] = false 導致卡住
    //width: 300,
    //height: 300,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  //為了彌補menu跳到下個頁面時，讀取不到width、height。
  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  },[])

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
    console.log("openMenu_"+menuOpen);
    console.log(size.width < 768);
    //setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className={classes.header}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                    蝦苗辨識系統
                </Link>
                
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""}`}
                >
                    <ul>
                        <li>
                            <Link to="/upload_page" onClick={menuToggleHandler}>
                                上傳檔案
                            </Link>
                        </li>
                        <li>
                            <Link to="/show_page" onClick={menuToggleHandler}>
                                辨識紀錄
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={menuToggleHandler}>
                                登出
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    </div>
  );
};

export default Header;
