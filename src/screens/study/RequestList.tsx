import React, { useEffect, useState } from 'react';
import './Study.scss';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import DateFormmating from '../../components/DateFormmating';
import { useRecoilValue } from 'recoil';
import { recoilLoginState } from '../../RecoilStore';

export default function RequestList(props:any) {

  let navigate = useNavigate();
  const isLogin = useRecoilValue(recoilLoginState);

  interface ListProps {
    id : number,
    author : string;
    date : string;
    nation : string;
    response : string;
    songName : string;
    sort : string;
    userAccount : string;
    userName : string;
  }
  
  const [list, setList] = useState<ListProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/study/getrequestall`)
    if (res.data) {
      setIsResdataFalse(false);
      let copy: any = [...res.data];
      copy.reverse();
      setList(copy);
    } else {
      setIsResdataFalse(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

  // 글쓰기 함수
  const openPostPage = async () => {
    if (!isLogin) {
      alert('권한이 없습니다. 로그인이 필요합니다.')
    } else {
      navigate('/study/requestpost');  
    }
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
              className="subpage__menu__item"
            >
              가곡
            </div>
            <div
              onClick={()=>{navigate('/study/requestlist');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              곡등록요청
            </div>
          </div>    
        </div>

        <div className="subpage__main">

          <div className="subpage__main__title">
            <h3>곡 등록요청 게시판</h3>
            <div className='postBtnbox'
              onClick={()=>{
                isLogin 
                ? openPostPage()
                : alert('권한이 없습니다. 로그인이 필요합니다.')
              }}
            >
              <p>요청하기</p>
            </div>
          </div>

          <div className="subpage__main__content">
            <div className="tbl_wrap">
              <div className="tbl_head01">
                <ul className='titleRow'>
                  <li className="th_num" style={{width:'10%'}}>번호</li>
                  <li className="th_songname" style={{width:'30%'}}>곡명</li>
                  <li className="th_operaauthor" style={{width:'30%'}}>작곡가</li>
                  <li className="th_operaauthor" style={{width:'15%'}}>구분</li>
                  <li className="th_operaauthor" style={{width:'15%'}}>상태</li>
                </ul>
                { list.length > 0
                  ?
                  list.map((item:any, index:any)=>{
                    return(
                      <ul className="textRow" key={index}>
                        <li className="td_num" style={{width:'10%'}}>{item.id}</li>
                        <li className="td_songname" style={{width:'30%'}}>{item.songName}</li>
                        <li className="td_operaauthor" style={{width:'30%'}}>{item.author}</li>
                        <li className="td_operaauthor" style={{width:'15%'}}>
                          <p>{item.nation}</p>
                          <p>{item.sort}</p>
                        </li>
                        <li className="td_operaauthor" style={{width:'15%'}}>
                          <p>{DateFormmating(item.date)}</p>
                          <p>{item.response}</p>
                        </li>
                      </ul>
                    )
                  })
                  :
                  <ul className="textRow">
                    <li className="td_num"></li>
                    <li className="td_songname"><p>검색된 내역이 없습니다.</p></li>
                  </ul>
                }
              </div>
            </div>

          </div>
        </div>
        
      </div>
      <Footer/>
    </div>
  )
}



