import React, { useEffect, useState } from 'react';
import './Community.scss';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import ListTemplate from './ListTemplate';

export default function BoardRecruit() {

  let navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(3);
  interface SelectMenuProps {
    menuNum : number;
    title: string;
    url : string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ menuNum, title, url}) => {
    return (
      <div onClick={()=>{
        setCurrentMenu(menuNum);
        navigate(`/community${url}`)
      }}
        className={currentMenu === menuNum ? "subpage__menu__item subpage__menu__item--on" : "subpage__menu__item"}>
        {title}
      </div>
    )    
  };

  return (
    <div className='community'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">커뮤니티</div>
          <div className="subpage__menu__list">
            <SelectMenu title='공지사항' menuNum={1} url={'/'}/>
            <SelectMenu title='콩쿨정보' menuNum={2} url={'/concours'}/>
            <SelectMenu title='구인정보' menuNum={3} url={'/recruit'}/>
            <SelectMenu title='자유게시판' menuNum={4} url={'/free'}/>
            <SelectMenu title='등업신청' menuNum={5} url={'/graderequest'}/>
          </div>
        </div>

        <ListTemplate title='구인정보' sort='recruit' num={3}/>

      </div>

      <Footer />
    </div>
  )
}



