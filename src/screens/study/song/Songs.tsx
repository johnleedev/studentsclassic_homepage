import React, { useEffect, useState } from 'react';
import '../Study.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { useRecoilValue } from 'recoil';
import { recoilLoginState } from '../../../RecoilStore';

export default function Songs(props:any) {
  
  let navigate = useNavigate();
  const isLogin = useRecoilValue(recoilLoginState);

  interface ListProps {
    id : number,
    song_title: string;
    composer: string;
    language: string;
    lyrics: string;
    trans: string;
  }
  
  const [list, setList] = useState<ListProps[]>([]);
  const [word, setWord] = useState('');
  const [listAllLength, setListAllLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/study/getdatasongs/${props.language}/${currentPage}`)
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
  }, [currentPage]);  

  // 필터 ------------------------------------------------------------------------

  // 글자 검색 ------------------------------------------------------
	const handleWordSearching = async () => {
    setList([]);
    if (word.length < 3) {
      alert('3글자이상 입력해주세요')
    } else {
      axios.get(`${MainURL}/study/getdatasongsearch/${props.language}/${word}`).then((res) => {
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
            value={word} onChange={(e)=>{setWord(e.target.value)}} placeholder='아리아명, 작곡가명 검색'
            
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
              <li className="th_num" style={{width:'10%'}}>번호</li>
              <li className="th_songname" style={{width:'50%'}}>곡명</li>
              <li className="th_operaauthor" style={{width:'40%'}}>작곡가</li>
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
                { list.length > 0
                  ?
                  list.map((item:any, index:any)=>{
                    return(
                      <ul className="textRow" key={index}
                        onClick={()=>{
                          isLogin 
                          ? navigate('/study/songsdetail', {state : {data:item, language:props.language}})
                          : alert('권한이 없습니다. 로그인이 필요합니다.')
                        }}
                      >
                        <li className="td_num" style={{width:'10%'}}>{item.id}</li>
                        <li className="td_songname" style={{width:'50%'}}>{renderPreview(item.song_title)}</li>
                        <li className="td_operaauthor" style={{width:'40%'}}>{item.composer}</li>
                      </ul>
                    )
                  })
                  :
                  <ul className="textRow">
                    <li className="td_num"></li>
                    <li className="td_songname"><p>검색된 내역이 없습니다.</p></li>
                  </ul>
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

