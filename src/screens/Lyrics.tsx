import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Lyrics.scss'
import company from "../../images/notice/company.jpg"
import axios from 'axios'
import MainURL from "../../src/MainURL";
import Select from 'react-select';



export default function Lyrics (props:any) {


  interface postList {
    id : number,
    word: string,
    meaning : string
  }

  const [postList, setPostList] = useState<postList[]>([]);
  const [songName, setSongName] = useState('');
  const [operaName, setOperaName] = useState('');
  const [author, setAuthor] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [songInfo, setSongInfo] = useState('');
  const [sort, setSort] = useState('');
  const [nation, setNation] = useState('');
  const [refresh, setRefresh] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    // const res = await axios.get(`https://www.studentsclassic.com/study/getworddataadmin/${nation}`)
    const res = await axios.get(`${MainURL}/lyricssave/getworddataadmin2/${nation}`)
    if (res) {
      let copy: any = [...res.data];
      setPostList(copy);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [nation, refresh]);  

  
  // 종류 선택 ----------------------------------------------
  const sortOptions = [
    { value: '선택', label: '선택' },
    { value: 'Song', label: 'Song' },
    { value: 'Aria', label: 'Aria' },
  ];

  const nationOptions = [
    { value: '선택', label: '선택' },
    { value: 'Itary', label: 'Itary' },
    { value: 'German', label: 'German' },
  ];


  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const handleSelectSortChange = ( event : any) => {
   setSelectedSortOption(event);
   setSort(event.label);
  }


  const [selectedNationOption, setSelectedNationOption] = useState(nationOptions[0]);
  const handleSelectNationChange = ( event : any) => {
   setSelectedNationOption(event);
   setNation(event.label);
  }



  // careerTextArea 높이 조절  ----------------------------------------------
  const onChangeInputWord = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const copy = e.target.value;
    setInputWord(copy);
  };
  const onChangeSongInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const copy = e.target.value;
    setSongInfo(copy);
  };

 

  const registerPost = async () => {
    if (sort && nation) {
      try {
        const replace = inputWord.replaceAll('\n', ' ').replaceAll(',', ' ').replaceAll('.', ' ').replaceAll('!', ' ').replaceAll("'", "\' ")
                        .replaceAll('.', ' .').replaceAll('´', '´ ').replaceAll('’', '’ ').replaceAll('?', ' ?');
        const copy = replace.split(' ');
        const copy2 = copy.filter((e:any)=> e !== '' && e !== '?' && e !== ',' && e !== '.' && e !== '!' && e !== ''
                                && e !== ':' && e !== ';' && e !== '´' && e !== '’');
        const result = copy2.filter((item, index, array) => array.indexOf(item) === index);
        const resultWithoutDuplicates = await result.filter((item) => !postList.some((postItem) => postItem.word.toLowerCase() === item.toLowerCase()));
        const wordNum = resultWithoutDuplicates.length;

        console.log('result', result.length);
        console.log('resultWithoutDuplicates', resultWithoutDuplicates.length);
  
        const requestSong = axios.post(`https://www.studentsclassic.com/study/savesong`, {
            sort : sort,
            nation : nation,
            songName : songName,
            operaName : operaName,
            author : author,
            lyrics : inputWord
        });
    
        let responsesSong = await requestSong;
        if (responsesSong.data) {
          for (let index = 0; index < resultWithoutDuplicates.length; index++) {
            const item = resultWithoutDuplicates[index];
            try {
              const response = await axios.post(`${MainURL}/lyricssave/postmeaning`, {
                nation : nation, word : item, wordNum : index+1 < 10 ? `0${index+1}/${wordNum}` : `${index+1}/${wordNum}`
              });
              setRefresh(!refresh);
              console.log(response.data);
            } catch (error) {
              console.error(`에러 발생 - 단어: ${item}`, error);
            }
          }
          alert('완료되었습니다.');
        } else {
          alert('이미 저장된 곡입니다.');  
        }
            
    
      } catch (error) {
        console.error('에러 발생:', error);
      }
    } else {
      alert('형식과 언어를 선택해주세요')
    }
    
  };
 

  return  (
    <div className="apply">

     <div className="inner">

        <div className="inputbox">
          <div className='name'>
            <p>형식</p>
          </div>
          <Select
            className='input'
            value={selectedSortOption}
            onChange={handleSelectSortChange}
            options={sortOptions}
          />
        </div>
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
        <div className="inputbox">
          <div className='name'>
            <p>제목</p>
          </div>
          <input type="text" onChange={(e)=>{setSongName(e.target.value)}} value={songName} />
        </div>
        {
          sort === 'Aria' &&
          <div className="inputbox">
            <div className='name'>
              <p>오페라</p>
            </div>
            <input type="text" onChange={(e)=>{setOperaName(e.target.value)}} value={operaName} />
          </div>
        }
        <div className="inputbox">
          <div className='name'>
            <p>작곡가</p>
          </div>
          <input type="text" onChange={(e)=>{setAuthor(e.target.value)}} value={author} />
        </div>
        <div className="inputbox">
          <div className='name'>
            <p>가사</p>
          </div>
          <textarea 
            placeholder=''
            value={inputWord}
            onChange={(e)=>{onChangeInputWord(e)}}
          />
        </div>
        <div className="buttonbox">
          <div className="button" onClick={registerPost}>
            <p>작성 완료</p>
          </div>
        </div>
      </div>
      
    

    </div>
  );
}
