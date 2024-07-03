import React, { useEffect, useState } from 'react';
import '../Study.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Arias from './Arias';

export default function Menu1_Arias(props:any) {

  let navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(1);
  interface SelectMenuProps {
    tabNum : number;
    title: string;
    url : string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title, url}) => {
    return (
      <div onClick={()=>{
        setCurrentTab(tabNum);
        navigate(`/study${url}`)
      }}
        className={currentTab === tabNum ? "subpage__menu__item__sub subpage__menu__item--on__sub" : "subpage__menu__item__sub"}>
        {title}
      </div>
    )    
  };
 
  return (
    <div className="study">

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">스터디</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/study');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              오페라
            </div>
            <div className="subpage__menu__list__sub">
              <SelectMenu title='Arias' tabNum={1} url={'/'}/>
              <SelectMenu title='Duets' tabNum={2} url={'/duets'}/>
              <SelectMenu title='Others' tabNum={3} url={'/others'}/>
              <SelectMenu title='Operas' tabNum={4} url={'/operas'}/>
              <SelectMenu title='Synopsis' tabNum={5} url={'/synopsis'}/>
              <SelectMenu title='Libretto' tabNum={6} url={'/libretto'}/>
              <SelectMenu title='Roles' tabNum={7} url={'/roles'}/>
              <SelectMenu title='Composers' tabNum={8} url={'/composers'}/>
            </div>
            <div
              style={{borderTop:"1px solid #cbcbcb"}}
              onClick={()=>{navigate('/study/song');}}
              className="subpage__menu__item"
            >
              가곡
            </div>
            <div
              onClick={()=>{navigate('/study/requestlist');}}
              className="subpage__menu__item"
            >
              곡등록요청
            </div>
          </div>    
        </div>

        <Arias sort='aria' title='Arias'/>

      </div>
      <Footer/>
    </div>
  )
}



