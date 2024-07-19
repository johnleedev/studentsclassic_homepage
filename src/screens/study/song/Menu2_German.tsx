import React, { useEffect, useState } from 'react';
import '../Study.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Songs from './Songs';


export default function Menu2_German(props:any) {

  let navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(2);
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
              className="subpage__menu__item"
            >
              오페라
            </div>
            <div
              onClick={()=>{navigate('/study/song');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              가곡
            </div>
            <div className="subpage__menu__list__sub">
              <SelectMenu title='이태리' tabNum={1} url={'/song'}/>
              <SelectMenu title='독일' tabNum={2} url={'/song/german'} />
              <SelectMenu title='프랑스' tabNum={3} url={'/song/french'} />
              <SelectMenu title='영미' tabNum={4} url={'/song/english'} />
              <SelectMenu title='러시아' tabNum={5} url={'/song/russian'} />
              <SelectMenu title='한국' tabNum={6} url={'/song/korea'} />
              
            </div>
            <div
              style={{borderTop:"1px solid #cbcbcb"}}
              onClick={()=>{navigate('/study/requestlist');}}
              className="subpage__menu__item"
            >
              곡등록요청
            </div>
          </div>    
        </div>

        <Songs language='German' title='독일'/>
        
      </div>
      <Footer/>
    </div>
  )
}



