import React, { useEffect, useState } from 'react';
import './Community.scss';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import ListTemplate from './ListTemplate';
import { useRecoilValue } from 'recoil';
import { recoilLoginState } from '../../RecoilStore';
import axios from 'axios';
import MainURL from '../../MainURL';
import DateFormmating from '../../components/DateFormmating';


export default function BoardGradeRequest() {

  let navigate = useNavigate();
  const isLogin = useRecoilValue(recoilLoginState);

  const [currentMenu, setCurrentMenu] = useState(5);
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



  const [page, setPage] = useState(1);

  interface ListProps {
    id : number;
    title : string;
    content : string;
    userAccount : string;
    userName : string;
    userSchool: string;
    userSchNum: string;
    userPart : string;
    date : string;
    views : string;
  }
  
  let [list, setList] = useState<ListProps[]>([]);
  const fetchDatas = async () => {
    const res = await axios.get(`${MainURL}/board/getgraderequest/${page}`);
    if (res.data) {
      const copy = res.data;
      copy.reverse();
      setList(copy);
    }
  }

  useEffect(()=>{
    fetchDatas();
  }, []);

  // State 변수 추가
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // 한 페이지당 표시될 게시글 수
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // 리스트를 현재 페이지에 해당하는 부분만 필터링
  const displayedList = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
  };

  // 글자수 제한
  const renderPreview = (content : string) => {
    if (content?.length > 40) {
      return content.substring(0, 40) + '...';
    }
    return content;
  };

  // 조회수 증가시킨 후에, 디테일 페이지로 넘어가기 
  const openPostDetails = async (post: any) => {
    axios.post(`${MainURL}/board/posts/${post.id}/views`)
      .then(()=>{
        navigate('/community/detail', {state : {data:post, sort:'graderequest', menuNum:5}});
      }).catch((error)=>{
        console.error(error);
      })
  };

  // 글쓰기 함수
  const openPostPage = async () => {
    if (!isLogin) {
      alert('권한이 없습니다. 로그인이 필요합니다.')
    } else {
      navigate('/community/post', {state : {sort:'graderequest', menuNum:5}});  
    }
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

        <div className="subpage__main">
      <div className="subpage__main__title">
        <div className="subpage__main__title">
          <h3>등업신청</h3>
        </div>
        <div className='postBtnbox'
          onClick={openPostPage}
        >
          <p>글쓰기</p>
        </div>
      </div>


      <div className="subpage__main__content">
        <div className="warningBox">
          <p style={{marginBottom:'20px'}}>등업제도의 취지는 허위가입자 및 악성 광고 게시물 작성자를 근본적으로 차단하기 위해 도입된 제도입니다.</p>
          <p style={{marginBottom:'20px'}}># 등업신청 방법</p>
          <p style={{marginBottom:'20px'}}>택1. 커뮤니티 탭 내 게시글 1개 이상 작성 (등업신청 제외)</p>
          <p style={{marginBottom:'20px'}}>택2. 1명이상의 친구나 지인의 회원 가입 (가입시 추천인에 본인 정보를 입력)</p>
          <p>위 1번과 2번 중, 하나를 선택하여 완료하신 후에, 등업 게시판에 등업 신청하시면 됩니다.</p>
        </div>
        
        <div className="tbl_wrap">
          <div className="tbl_head01">
            <ul className='titleRow'>
              <li className="th_num">번호</li>
              <li className="th_title">제목</li>
              <li className="th_name">글쓴이</li>
              <li className="th_date">등록일</li>
              <li className="th_views">조회수</li>
            </ul>
            {
              displayedList.length > 0 
              ?
              displayedList.map((item:any, index:any)=>{

                return(
                  <ul className="textRow" key={index}
                    onClick={()=>{
                      isLogin 
                      ? openPostDetails(item)
                      : alert('권한이 없습니다. 로그인이 필요합니다.')
                    }}
                  >
                    <li className="td_num">{item.id}</li>
                    <li className="td_title">{renderPreview(item.title)}</li>
                    <li className="td_name">{item.userName}</li>
                    <li className="td_date">{DateFormmating(item.date)}</li>
                    <li className="td_views">{item.views}</li>
                  </ul>
                )
              })
              :
              <ul className="textRow">
                <li className="td_num"></li>
                <li className="td_title"><p>작성된 글이 없습니다.</p></li>
                <li className="td_name"></li>
                <li className="td_date"></li>
                <li className="td_views"></li>
              </ul>
            }
          </div>
        </div>

        <div className='btn-row'>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <div
              key={page}
              onClick={() => changePage(page)}
              className='btn'
              style={{backgroundColor : currentPage === page ?  "#2c3d54" : "#EAEAEA"}}
            >
              <p style={{color : currentPage === page ? "#fff" : "#333"}}>{page}</p>
            </div>
          ))}
        </div>
        
      </div>
    
    </div>
       
      </div>

      <Footer />
    </div>
  )
}



