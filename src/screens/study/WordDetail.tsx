import React, { useEffect, useState } from 'react';
import './Study.scss';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import Loading from '../../components/Loading';
import { FaArrowLeft } from "react-icons/fa";


export default function WordDetail() {
  
  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state;
  
  interface WordsProps {
    id: number;
    word : string;
    meaning: string;
  }
  interface MeaningProps {
    num : number;
    genter : string;
    meaning: string[];
  }
  const [word, setWord] = useState<WordsProps>();
  const [meaning, setMeaning] = useState<MeaningProps[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getworddata/${propsData.nation}/${propsData.setword}`)
    .then((res) => {
      if(res.data) {
        setIsResdataFalse(false);
        let copy = res.data[0];
        setWord(copy);
        let copy2 = res.data[0];
        const meaning = copy2.meaning ? JSON.parse(copy2.meaning) : [];
        setMeaning(meaning);
      } else {
        setIsResdataFalse(true);
      }
    })
    .catch((err:any)=>{
      console.log(err)
    })
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (

    <div className='study'>

      <div className="inner">

  
        <div className="subpage__menu">

          <div className="detail__Menu">

            <div className="back-btn-row">
              <div className="back-btn"
                onClick={()=>{
                  navigate(-1);
                }}
              ><FaArrowLeft size={14}/></div>
            </div>

            <h3>{propsData.setword}</h3>

          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__content">
            <h3 style={{fontSize:'24px'}}>{propsData.setword}</h3>
            <div className="detailBox">
              <p className='detailTitle'>
                {propsData.nation === 'Italian' && '한국외국어대학교 지식출판원 이태리어-한국어사전'}
                {propsData.nation === 'German' && '민중서림 엣센스 독한사전'}
              </p>              
              {
                isResdataFalse
                ?
                <div className='emptyWord'>
                  <p >사전에 없는 단어입니다.</p>
                  <p >어미(단어끝)가 변형된 단어이거나,</p>
                  <p >지명,인명일수 있습니다.</p>
                </div>
                :
                <>
                  { meaning.length > 0 
                    ?
                    meaning.map((item:any, index:any)=>{

                      return (
                        <div key={index} className='word'>
                          <div className='word-title'>
                            <p>{item.num} </p>
                            <p color='#8B8B8B' >{item.gender} </p>
                          </div>
                          <p className='word-meaning' style={{marginTop:'5px'}}>{item.meaning}</p>
                          {
                            item.addMeaning &&
                            <div className='addMeaning-cover'>
                              {
                                item.addMeaning.length > 0 &&
                                item.addMeaning.map((addMeaning:any, addMeaningIdx:any)=>{
                                  return(
                                    <div key={addMeaningIdx} className='addMeaning' style={{marginTop:'10px'}}>
                                      <p>{addMeaning.addNum}</p>
                                      <p color='#8B8B8B'>{addMeaning.addGender}</p>
                                      <p >{addMeaning.addMeaning}</p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          }
                          {
                            item.relationWord &&
                            <div className='resembleword' style={{marginTop:'15px'}}>
                              <p >유의어/반의어: </p>
                              <p >{item.relationWord}</p>
                            </div>
                          }
                        </div>
                      )
                    })
                    :
                    <div className='emptyWord'>
                      <p >사전에 없는 단어입니다.</p>
                      <p >어미(단어끝)가 변형된 단어이거나,</p>
                      <p >지명,인명일수 있습니다.</p>
                    </div>
                  }
                </>
              }
              
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

