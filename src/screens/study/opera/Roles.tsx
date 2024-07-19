import React, { useEffect, useState } from 'react';
import '../Study.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import Divider from '../../../components/Divider';
import { DropdownBox } from '../../../components/DropdownBox';
import Loading from '../../../components/Loading';

export default function Roles(props:any) {
  
  let navigate = useNavigate();

  interface ListProps {
    id : number,
    composer: string;
    opera_title: string;
    synopsis: string;
  }

  
  const [list, setList] = useState<ListProps[]>([]);
  const [selectLanguage, setSelectLanguage] = useState('all');
  const [word, setWord] = useState('');
  const [listAllLength, setListAllLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/study/getdataopera/${props.sort}/${selectLanguage}/${currentPage}`)
    if (res.data) {
      setIsResdataFalse(false);
      let copy: any = [...res.data.resultData];
      setList(copy);
      setListAllLength(res.data.totalCount);
    } else {
      setIsResdataFalse(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectLanguage, currentPage]);  

 
  // 글자 검색 ------------------------------------------------------
	const handleWordSearching = async () => {
    setList([]);
    if (word.length < 3) {
      alert('3글자이상 입력해주세요')
    } else {
      axios.get(`${MainURL}/study/getdatarolesearch/${word}`).then((res) => {
        if (res.data) {
          setIsResdataFalse(false);
          let copy: any = [...res.data.resultData];
          setList(copy);
          setListAllLength(res.data.totalCount);
        } else {
          setIsResdataFalse(true);
        }
      });
    }
	};



  // 페이지 전환 -------------------------------------------------------------------
  const itemsPerPage = 30; // 한 페이지당 표시될 게시글 수
  const totalPages = Math.ceil(listAllLength / itemsPerPage);

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  
  // 페이지네이션 범위 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage - half < 1) {
      end = Math.min(totalPages, end + (half - currentPage + 1));
    }

    if (currentPage + half > totalPages) {
      start = Math.max(1, start - (currentPage + half - totalPages));
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // 글자수 제한
  const renderPreview = (content : string) => {
    if (content?.length > 50) {
      return content.substring(0, 50) + '...';
    }
    return content;
  };


  return (

    <div className="subpage__main">
      <div className="subpage__main__title">
        <h3>{props.title}</h3>
      </div>
      
      <div className="subpage__main__search">
        <div className="subpage__main__search__box">
          <p style={{marginRight:'10px'}}>검색:</p>
          <input className="inputdefault" type="text" style={{width:'50%', textAlign:'left'}} 
            value={word} onChange={(e)=>{setWord(e.target.value)}} placeholder='오페라명, 작곡가 검색'
            />
          <div className="buttons" style={{margin:'20px 0'}}>
            <div className="btn" 
            onClick={handleWordSearching}>
              <p>검색</p>
            </div>
          </div>
          <div className="buttons" style={{margin:'20px 0'}}>
            <div className="btn" 
            onClick={()=>{
              setWord('');
              setCurrentPage(1);
              fetchPosts();
            }}>
              <p>초기화</p>
            </div>
          </div>
        </div>
      </div>

      <div className="subpage__main__content">
        <div className="listLength">
          {
            listAllLength !== 0 && <p>* 현재 총 {listAllLength}개가 있습니다.</p>
          }
        </div>
        <div className="tbl_wrap">
          <div className="tbl_head01">
            <ul className='titleRow'>
              <li className="th_num" style={{width:'5%'}}>번호</li>
              <li className="th_songname" style={{width:'25%'}}>오페라명</li>
              <li className="th_operaauthor" style={{width:'30%'}}>작곡가</li>
              <li className="th_operaauthor" style={{width:'20%'}}>역할</li>
              <li className="th_operaauthor" style={{width:'20%'}}>파트</li>
            </ul>
            {
              isResdataFalse
              ?
              <ul className="textRow">
                <li className="td_num"></li>
                <li className="td_songname"><p>검색된 내역이 없습니다.</p></li>
              </ul>
              :
              <>
                { list.length === 0
                  ?
                  <div className='study'>
                     <div style={{height:'90vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Loading />
                     </div>
                  </div>
                  :
                  list.map((item:any, index:any)=>{
                    return(
                      <ul className="textRow2" key={index}>
                        <li className="td_num" style={{width:'5%'}}>{item.id}</li>
                        <li className="td_songname" style={{width:'25%'}}>{renderPreview(item.opera_title)}</li>
                        <li className="td_operaauthor" style={{width:'30%'}}>{item.composer}</li>
                        <li className="td_operaauthor" style={{width:'20%', padding:'0 10px'}}>{item.role}</li>
                        <li className="td_operaauthor" style={{width:'20%', padding:'0 10px'}}>{item.voice}</li>
                      </ul>
                    )
                  })
                }
              </>
            }
          </div>
        </div>

        <div className='btn-row'>
          <div
            onClick={() => changePage(1)}
            className='btn'
            style={{ backgroundColor: currentPage === 1 ? "#EAEAEA" : "#2c3d54" }}
          >
            <p style={{ color: currentPage === 1 ? "#ccc" : "#fff" }}>{"<<"}</p>
          </div>
          <div
            onClick={() => changePage(currentPage - 1)}
            className='btn'
            style={{ backgroundColor: currentPage === 1 ? "#EAEAEA" : "#2c3d54" }}
          >
            <p style={{ color: currentPage === 1 ? "#ccc" : "#fff" }}>{"<"}</p>
          </div>
          {getPageNumbers().map((page) => (
            <div
              key={page}
              onClick={() => changePage(page)}
              className='btn'
              style={{ backgroundColor: currentPage === page ? "#2c3d54" : "#EAEAEA" }}
            >
              <p style={{ color: currentPage === page ? "#fff" : "#333" }}>{page}</p>
            </div>
          ))}
          <div
            onClick={() => changePage(currentPage + 1)}
            className='btn'
            style={{ backgroundColor: currentPage === totalPages ? "#EAEAEA" : "#2c3d54" }}
          >
            <p style={{ color: currentPage === totalPages ? "#ccc" : "#fff" }}>{">"}</p>
          </div>
          <div
            onClick={() => changePage(totalPages)}
            className='btn'
            style={{ backgroundColor: currentPage === totalPages ? "#EAEAEA" : "#2c3d54" }}
          >
            <p style={{ color: currentPage === totalPages ? "#ccc" : "#fff" }}>{">>"}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

