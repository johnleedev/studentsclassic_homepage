import React, { useState, useEffect } from 'react';
import './Header.scss';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { recoilLoginState, recoilUserData } from '../RecoilStore';

const Header: React.FC = () => {
  
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(recoilLoginState);
  const setUserData = useSetRecoilState(recoilUserData);
  
  const menus = [
    { title: "소개", url:"/company/application", links: [{title:"app", subUrl:"/company/application", sort:'main'}] },
    // { title: "성악가들", url:"/network", links: [{title:"Sop.", subUrl:"/network"}] },
    { title: "스터디", url:"/study", 
      links: [
        {title:"오페라", subUrl:"/study"}, 
        {title:"가곡", subUrl:"/study/song"},
        {title:"곡등록요청", subUrl:"/study/requestlist"},
      ]
    },
    { title: "커뮤니티", url:"/community", links: [{title:"자유게시판", subUrl:"/community", sort:'main'}] },
  ];

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<{ [key: number]: boolean }>({});

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  const toggleMobileMenu = (index: number) => {
      setMobileMenuOpen((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
      }));
  };
  const handleLogout = async () => {
    setIsLogin(false);
    setUserData({
      userAccount : '',
      userName : '',
      userSchool: '',
      userSchNum : '',
      userPart: ''
    })
    alert('로그아웃 되었습니다.')
    navigate('/');
    window.location.reload();
  };

  
  return (
    <div className="header">
      <div className="header-top">
        <div className="inner">
          <div className="container header-top-container">
            {
              isLogin 
              ?
              <div className="header-button_wrap">
                <div className="header-button"
                  onClick={handleLogout}
                >로그아웃</div>
                <div className="header-button"
                  onClick={()=>{navigate('/mypage');}}
                >마이페이지</div>
              </div>
              :
              <div className="header-button_wrap">
                <div className="header-button"
                  onClick={()=>{navigate('/login');}}
                >로그인</div>
                <div className="header-button" 
                  onClick={()=>{navigate('/logister');}}
                >회원가입</div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="header-content">
        <div className="inner">
          <div className="container header-content-container">
              <div className="header-logo" 
                onClick={()=>{navigate('/')}}
              >
                <h1>성악하는사람들</h1>
              </div>
              <div className="header-menu">
                {
                  menus.map((item:any, index:any) => (
                    <div className="menu-item" key={index}>
                        <div className="menu-face" onClick={()=>{navigate(item.url)}}>{item.title}</div>
                        <div className="menu-body">
                          { 
                            item.links.map((subItem:any, subIndex:any) => (
                              <div className="menu-part" key={subIndex}>
                                  <div onClick={()=>{navigate(subItem.subUrl)}}>{subItem.title}</div>
                              </div>
                            ))
                          }
                        </div>
                    </div>
                  ))
                }
              </div>
              <div className={`header-hamburger_menu ${menuOpen ? 'header-hamburger_menu--open' : ''}`}>
                  <div className="header-hamburger_icon" onClick={toggleMenu}></div>
                  <div className="header-mobile_menu">
                      <div className="mobile_menu-inner">
                          {
                            isLogin 
                            ?
                            <div className="mobile_menu-top">
                              <span className="mobile_menu-announce">{sessionStorage.getItem('userName')}님 환영합니다.</span>
                              <div className="mobile_menu-button_wrap">
                                  <div className="header-button" onClick={handleLogout}>로그아웃</div>
                                  <div className="header-button" onClick={()=>{navigate("/mypage"); toggleMenu();}}>마이페이지</div>
                              </div>
                            </div>
                            :
                            <div className="mobile_menu-top">
                              <span className="mobile_menu-announce">로그인해 주세요</span>
                              <div className="mobile_menu-button_wrap">
                                  <div className="header-button" onClick={()=>{navigate("/login"); toggleMenu();}}>로그인</div>
                                  <div className="header-button" onClick={()=>{navigate("/logister"); toggleMenu();}}>회원가입</div>
                              </div>
                            </div>
                          }
                          
                          <div className="mobile_menu-list">
                              {
                                menus.map((item:any, index:any) => (
                                  <div className={`mobile_menu-item ${mobileMenuOpen[index] ? 'mobile_menu-item--open' : ''}`} 
                                    key={index} onClick={() => toggleMobileMenu(index)}>
                                      <div className="mobile_menu-item_inner">
                                          <div className={`mobile_menu-face ${mobileMenuOpen[index] ? 'mobile_menu-face--open' : ''}`}>
                                              <div className="mobile_menu-face_text" onClick={()=>{navigate(item.url); toggleMenu();}}>{item.title}</div>
                                              <div className="mobile_menu-face_icon"></div>
                                          </div>
                                          <div className="mobile_menu-body">
                                              {
                                                item.links.map((subItem:any, subIndex:any) => (
                                                  <div className="mobile_menu-part"
                                                    onClick={()=>{navigate(subItem.subUrl); toggleMenu();}} key={subIndex}
                                                  >
                                                    {subItem.title}
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
