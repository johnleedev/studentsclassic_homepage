import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Lyrics.scss'
import company from "../.../images/notice/company.jpg"
import axios from 'axios'
import MainURL from "../MainURL";
import Select from 'react-select';


export default function Words (props:any) {

  
  interface postList {
    id : number,
    word: string,
    meaning : string
  }

  const [nation, setNation] = useState('Itary');
  const [postList, setPostList] = useState<postList[]>([]);
  const [wordID, setWordID] = useState('');
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [refresh, setRefreash]  = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`https://www.studentsnursing.com/study/getworddataadmin/${nation}`)
    // const res = await axios.get(`${MainURL}/lyricssave/getworddataadmin2`)
    if (res) {
      let copy: any = [...res.data];
      setPostList(copy);
      console.log(copy.length);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [nation]);  
  

  const nationOptions = [
    { value: '선택', label: '선택' },
    { value: 'Itary', label: 'Itary' },
    { value: 'German', label: 'German' },
  ];
  

  const [selectedNationOption, setSelectedNationOption] = useState(nationOptions[0]);
  const handleSelectNationChange = ( event : any) => {
   setSelectedNationOption(event);
   setNation(event.label);
  }


  const renderPreview = (content : string) => {
    if (content?.length > 100) {
      return content.substring(0, 100) + '...';
    }
    return content;
  };

  const handleRevise = (item : any) => {
    setMeaning(item.meaning);
    setWordID(item.id);
    setWord(item.word);
  };

  const onChangeInputWord = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const copy = e.target.value;
    setMeaning(copy);
  };

  const registerRevise = async () => {
    try {
        
      const requestReviese = axios.post(`https://www.studentsnursing.com/study/wordrevise`, {
        nation : nation,
        wordID : wordID,
        meaning : meaning
      });
  
      let responsesReviese = await requestReviese;
      if (responsesReviese.data) {
        setRefreash(!refresh);
        alert('수정되었습니다.');
      } else {
        alert('수정되지 않았습니다. 다시 시도하세요');  
      }
  
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const registerDelete = async (ID:any) => {
    try {
      const requestDelete = axios.post(`https://www.studentsnursing.com/study/worddelete`, {
        nation : nation,
        wordID : ID,
      });
  
      let responsestDelete = await requestDelete;
      if (responsestDelete.data) {
        setRefreash(!refresh);
        alert('삭제되었습니다.');
      } else {
        alert('삭제되지 않았습니다. 다시 시도하세요');  
      }
  
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const reArrangeWord = async () => {
    const sortedPostList = [...postList].sort((a, b) => a.word.toLowerCase() > b.word.toLowerCase() ? 1 : -1);
    setPostList(sortedPostList);
  };
  const reArrangeMeaning = async () => {
    const sortedPostList = [...postList].sort((a, b) => a.meaning.toLowerCase() > b.meaning.toLowerCase() ? 1 : -1);
    setPostList(sortedPostList);
  };

 
  

  return  (
    <div className="apply">

      <div className="inner">

        <div className="inputbox">
          <div className='name'>
            <p>언어</p>
          </div>
          <Select
            className='input'
            value={selectedNationOption}
            onChange={handleSelectNationChange}
            options={nationOptions}
          />
        </div>

        <div className="inputbox ">
          <div className='name'>
            <div style={{flexDirection:'column'}}>
              <div style={{flexDirection:'column', marginBottom:10}}>
                <p>{wordID}</p>
                <p>{word}</p>
              </div>
              <p>의미</p>
            </div>
          </div>
          <textarea 
            value={meaning}
            onChange={(e)=>{onChangeInputWord(e)}}
          />
        </div>

        <div className="buttonbox">
          <div className="button" onClick={registerRevise}>
            <p>수정하기</p>
          </div>
        </div>

        <div className="buttonbox">
          <div className="button" onClick={reArrangeWord}>
            <p>단어순 정렬</p>
          </div>
          <div className="button" onClick={reArrangeMeaning}>
            <p>의미순 정렬</p>
          </div>
        </div>

        <div className='words'>
          <div className='rows rowtitle'>
            <div className='word-id'>ID</div>
            <div className='word-word'>단어</div>
            <div className='word-meaning'>의미</div>
            <div className='word-revise'>수정</div>
            <div className='word-delete'>삭제</div>
          </div>
          {
            postList.map((item:any, index:any)=>{
              return (
                <div className='rows' key={index}>
                  <div className='word-id'>{item.id}</div>
                  <div className='word-word'>{item.word}</div>
                  <div className='word-meaning'>{renderPreview(item.meaning)}</div>
                  <div className='word-revise'>
                    <div className='word-revise-btn'
                      onClick={()=>{
                        handleRevise(item);
                      }}
                    >
                      수정
                    </div>
                  </div>
                  <div className='word-delete'>
                    <div className='word-delete-btn'
                      onClick={()=>{
                        registerDelete(item.id);
                      }}
                    >
                      삭제
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        
      </div>
      
    

    </div>
  );
}
