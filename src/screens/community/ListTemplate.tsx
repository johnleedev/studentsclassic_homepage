import React, { useEffect, useState } from 'react';
import './Community.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import DateFormmating from '../../components/DateFormmating';
import { useRecoilValue } from 'recoil';
import { recoilLoginState } from '../../RecoilStore';

export default function ListTemplate(props:any) {

  let navigate = useNavigate();

  const isLogin = useRecoilValue(recoilLoginState);
  const [page, setPage] = useState(1);
  
  interface ListProps {
    id : number;
    sort : string;
    title : string;
    content : string;
    userAccount : string;
    userName : string;
    userSchool: string;
    userSchNum: string;
    userPart : string;
    isLiked : string;
    date : string;
    views : string;
    images : [string]
  }
  
  let [list, setList] = useState<ListProps[]>([]);
  const fetchDatas = async () => {
    const res = await axios.get(`${MainURL}/board/getposts/${props.sort}/${page}`);
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
        navigate('/community/detail', {state : {data:post, sort:props.sort, menuNum:props.num}});
      }).catch((error)=>{
        console.error(error);
      })
  };

  // 글쓰기 함수
  const openPostPage = async () => {
    if (!isLogin) {
      alert('권한이 없습니다. 로그인이 필요합니다.')
    } else {
      navigate('/community/post', {state : {sort:props.sort, menuNum:props.num}});  
    }
  };

  return (
    <div className="subpage__main">
      <div className="subpage__main__title">
        <div className="subpage__main__title">
          <h3>{props.title}</h3>
        </div>
        {
          props.sort !== 'notice' &&
          <div className='postBtnbox'
            onClick={openPostPage}
          >
            <p>글쓰기</p>
          </div>
        }
      </div>


      <div className="subpage__main__content">
        {
          props.sort === 'graderequest' && 
          <div className="warningBox">
            <p style={{marginBottom:'20px'}}>등업제도의 취지는 허위가입자 및 악성 광고 게시물 작성자를 근본적으로 차단하기 위해 도입된 제도입니다.</p>
            <p style={{marginBottom:'20px'}}># 등업신청 방법</p>
            <p style={{marginBottom:'20px'}}>택1. 커뮤니티 탭 내 게시글 1개 이상 작성 (등업신청 제외)</p>
            <p style={{marginBottom:'20px'}}>택2. 1명이상의 친구나 지인의 회원 가입 (가입시 추천인에 본인 정보를 입력)</p>
            <p>위 1번과 2번 중, 하나를 선택하여 완료하신 후에, 등업 게시판에 등업 신청하시면 됩니다.</p>
          </div>
        }
        
        
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
  )
}



