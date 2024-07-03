import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Lyrics.scss'
import company from "../.../images/notice/company.jpg"
import axios from 'axios'
import MainURL from "../MainURL";
import Select from 'react-select';
import { DropdownBox } from '../components/DropdownBox';


export default function Trans (props:any) {

  
  interface postList {
    id : number,
    song_title: string,
    trans: string;
    lyrics : string
  }

  interface wordList {
    id : number,
    word: string,
    meaning : string
  }


  const [sort, setSort] = useState('Aria');
  const [nation, setNation] = useState('German');
  const [postListOrigin, setPostListOrigin] = useState<postList[]>([]);
  const [postList, setPostList] = useState<postList[]>([]);
  const [postListLength, setPostListLength] = useState(0);
  const [postId, setPostId] = useState('');
  const [aria_title, setAria_title] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [trans, setTrans] = useState('');
  const [restNum, setRestNum] = useState('');
  const [selectPart, setSelectPart] = useState('');
  const [refresh, setRefresh]  = useState<boolean>(false);
  const [wordList, setWordList] = useState<wordList[]>([]);
  

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/studyhome/getdataarias/aria`)
    if (res) {
      let copy22: any = [...res.data];
      // const copy = copy22.filter((e:any)=> e.trans !== null );
      const copy = copy22.filter((e:any)=> e.lyrics !== '' && (e.trans === null || e.trans === '') && e.language === 'German');
      setPostList(copy);
      setPostListOrigin(copy);
      setPostListLength(copy.length);
      setRestNum(copy.length);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);  
  

  const handleRevise = (item : any) => {
    window.scrollTo(0, 200);
    setPostId(item.id);
    setAria_title(item.aria_title);
    setLyrics(item.lyrics);
    setTrans(item.trans);
  };

  const onChangeInputLyrics = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const copy = e.target.value;
    setLyrics(copy);
  };
  const onChangeInputTrans = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const copy = e.target.value;
    setTrans(copy);
  };

  const registerRevise = async () => {
    try {
      const requestReviese = axios.post(`${MainURL}/studyhome/dataariastrans`, {
        postId : postId,
        lyrics: lyrics,
        trans : trans
      });
      let responsesReviese = await requestReviese;
      if (responsesReviese.data) {
        setRefresh(!refresh);
        alert('수정되었습니다.');
        setLyrics('')
        setTrans('');
      } else {
        alert('수정되지 않았습니다. 다시 시도하세요');  
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const registerDelete = async (ID:any) => {
    try {
      const requestDelete = axios.post(`${MainURL}/studyhome/dataariasdelete`, {
        postId : postId
      });
  
      let responsestDelete = await requestDelete;
      if (responsestDelete.data) {
        setRefresh(!refresh);
        alert('삭제되었습니다.');
      } else {
        alert('삭제되지 않았습니다. 다시 시도하세요');  
      }
  
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

 
  const renderPreview = (content : string) => {
    if (content?.length > 70) {
      return content.substring(0, 70) + '...';
    }
    return content;
  };

  const renderPreviewko = (content : string) => {
    if (content?.length > 50) {
      return content.substring(0, 50) + '...';
    }
    return content;
  };

  // 파트 변경
  const changePart = (text:string) => {
    setSelectPart(text);
    const copy = [...postListOrigin];
    const result = copy.filter((e:any)=> e.language.includes(text))
    setPostListLength(result.length);
    setPostList(result);
  };

  // 게시글 가져오기
  const fetchPosts22 = async () => {
    // const res = await axios.get(`https://www.studentsclassic.com/study/getworddataadmin/${nation}`)
    const res = await axios.get(`${MainURL}/lyricssave/getwordall222/${nation}`)
    if (res) {
      let copy: any = [...res.data];
      setWordList(copy);
    }
  };

  useEffect(() => {
    fetchPosts22();
  }, [nation]);  

  const registerPost = async () => {
    if (sort && nation) {
      try {
        const replace = lyrics.replaceAll('\n', ' ').replaceAll(',', ' ').replaceAll('.', ' ').replaceAll('!', ' ').replaceAll("'", "\' ")
                        .replaceAll('.', ' .').replaceAll('´', '´ ').replaceAll('’', '’ ').replaceAll('?', ' ?').replaceAll('---', ' ');
        const copy = replace.split(' ');
        const copy2 = copy.filter((e:any)=> e !== '' && e !== '?' && e !== ',' && e !== '.' && e !== '!' && e !== ''
                                && e !== ':' && e !== ';' && e !== '´' && e !== '’');
        const result = copy2.filter((item, index, array) => array.indexOf(item) === index);
        const resultWithoutDuplicates = await result.filter((item) => !wordList.some((postItem:any) => postItem.word.toLowerCase() === item.toLowerCase()));
        const wordNum = resultWithoutDuplicates.length;

        console.log('result', result.length);
        console.log('resultWithoutDuplicates', resultWithoutDuplicates.length);
  
   
        for (let index = 0; index < resultWithoutDuplicates.length; index++) {
          const item = resultWithoutDuplicates[index];
          try {
            const response = await axios.post(`${MainURL}/lyricssave/insertword`, {
              word : item, wordNum : index+1 < 10 ? `0${index+1}/${wordNum}` : `${index+1}/${wordNum}`
            });
            setRefresh(!refresh);
            console.log(response.data);
          } catch (error) {
            console.error(`에러 발생 - 단어: ${item}`, error);
          }
        }
        alert('완료되었습니다.');
  
    
      } catch (error) {
        console.error('에러 발생:', error);
      }
    } else {
      alert('형식과 언어를 선택해주세요')
    }
    
  };
  

  // const registerPost = async () => {
  //   if (sort && nation) {
  //     try {
  //       const replace = lyrics.replaceAll('\n', ' ').replaceAll(',', ' ').replaceAll('.', ' ').replaceAll('!', ' ').replaceAll("'", "\' ")
  //                       .replaceAll('.', ' .').replaceAll('´', '´ ').replaceAll('’', '’ ').replaceAll('?', ' ?');
  //       const copy = replace.split(' ');
  //       const copy2 = copy.filter((e:any)=> e !== '' && e !== '?' && e !== ',' && e !== '.' && e !== '!' && e !== ''
  //                               && e !== ':' && e !== ';' && e !== '´' && e !== '’');
  //       const result = copy2.filter((item, index, array) => array.indexOf(item) === index);
  //       const resultWithoutDuplicates = await result.filter((item) => !wordList.some((postItem:any) => postItem.word.toLowerCase() === item.toLowerCase()));
  //       const wordNum = resultWithoutDuplicates.length;

  //       console.log('result', result.length);
  //       console.log('resultWithoutDuplicates', resultWithoutDuplicates.length);
  
   
  //       for (let index = 0; index < resultWithoutDuplicates.length; index++) {
  //         const item = resultWithoutDuplicates[index];
  //         try {
  //           const response = await axios.post(`${MainURL}/lyricssave/postmeaning`, {
  //             nation : nation, word : item, wordNum : index+1 < 10 ? `0${index+1}/${wordNum}` : `${index+1}/${wordNum}`
  //           });
  //           setRefresh(!refresh);
  //           console.log(response.data);
  //         } catch (error) {
  //           console.error(`에러 발생 - 단어: ${item}`, error);
  //         }
  //       }
  //       alert('완료되었습니다.');
  
    
  //     } catch (error) {
  //       console.error('에러 발생:', error);
  //     }
  //   } else {
  //     alert('형식과 언어를 선택해주세요')
  //   }
    
  // };


  return  (
    <div className="apply">

      <div className="inner">

        {/* <div className="inputbox">
          <div className='name'>
            <p>언어</p>
          </div>
          <Select
            className='input'
            value={selectedNationOption}
            onChange={handleSelectNationChange}
            options={nationOptions}
          />
        </div> */}

        <div className="inputbox">
          <div className='trans'>
            <p>{aria_title}</p>
            <textarea 
              value={lyrics}
              onChange={(e)=>{onChangeInputLyrics(e)}}
            />
            <textarea 
              value={trans}
              onChange={(e)=>{onChangeInputTrans(e)}}
            />
          </div>
          <p>남은수:{restNum}</p>
        </div>

        <div className="buttonbox">
          <div className="button" 
            onClick={()=>{
              registerRevise();
              registerPost();
            }}>
            <p>수정하기</p>
          </div>
        </div>

        {/* <div className="buttonbox">
          <div className="button" onClick={reArrangeWord}>
            <p>단어순 정렬</p>
          </div>
          <div className="button" onClick={reArrangeMeaning}>
            <p>의미순 정렬</p>
          </div>
        </div> */}

        <DropdownBox
          widthmain='100px'
          height='35px'
          selectedValue={selectPart}
          options={[
            {value: "all", label:'전체'},
            {value: "Italian", label:'이태리'},
            {value: "German", label:'독일'},
            {value: "French", label:'프랑스'},
            {value: "English", label:'영미'},
            {value: "Russian", label:'러시아'},
            {value: "Spanish", label:'스페인'},
            {value: "Czech", label:'체코'},
            {value: "Latin", label:'라틴'},
            {value: "etc", label:'기타'},
          ]}
          handleChange={(e:any)=>{changePart(e.target.value)}}
        />

        <p>{postListLength}개</p>

        <div className='words'>
          <div className='rows rowtitle'>
            <div className='word-id'>ID</div>
            <div className='word-word'>곡목</div>
            <div className='word-meaning'>가사</div>
            <div className='word-meaning'>번역</div>
            <div className='word-revise'>수정</div>
            <div className='word-delete'>삭제</div>
          </div>
          {
            postList.map((item:any, index:any)=>{
              return (
                <div className='rows' key={index}>
                  <div className='word-id'>{item.id}</div>
                  <div className='word-word'>{item.song_title}</div>
                  <div className='word-word'>{item.opera_title}</div>
                  <div className='word-meaning'>{renderPreview(item.lyrics)}</div>
                  <div className='word-meaning'>{renderPreviewko(item.trans)}</div>
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
