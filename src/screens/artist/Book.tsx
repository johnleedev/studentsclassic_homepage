import React, { useEffect, useRef, useState } from 'react';
import company from "../.../images/notice/company.jpg"
import './Book.scss'
import MainURL from "../../MainURL";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";



export default function Book(props:any) {


  const [bookSelectPage, setBookSelectPage] = useState(0);
  const [pulsNum, setPlusNum] = useState(window.innerWidth > 1000 ? 2 : 1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setPlusNum(2);
      } else {
        setPlusNum(1);
      }
    };
    window.addEventListener('resize', handleResize);
  }, []);  
  
  return (
    <div className='bookview'>

      { bookSelectPage >= 2 && bookSelectPage < props.portfolio.length + 2 &&
        <div className="bookcover">
        {
          props.portfolio.slice(bookSelectPage-2, bookSelectPage-2+pulsNum).map((item:any, index:any)=>{ 
            return (
              <div className="bookpage">
                <img className='image' key={index}
                  src={`${MainURL}/images/portfolio/anmaran/${item.art_img}`}
                  onClick={()=>{
                  }}    
                />
                <p>{item.art_name}</p>
              </div>
            )
          })
        }  
        </div>
      }         

      { bookSelectPage < 2 &&
        <>
        {
          pulsNum === 1
          ?
          <div className="bookcover">
            {
              bookSelectPage === 0 &&
              <div className="bookpage">
                <div className="profile">
                  <section>
                    <h1>{props.profile_name} {props.profile_name_en}</h1>
                  </section>
                  <section>
                    <img className='image'
                        src={`${MainURL}/images/portfolio/anmaran/profile_anmaran.jpg`}/>
                  </section>
                </div>
              </div>
            }
            {
              bookSelectPage === 1 &&
              <div className="bookpage">
                <div className="note">
                  <section>
                    <img className='image'
                        src={`${MainURL}/images/portfolio/anmaran/artistnote.png`}
                    />
                  </section>
                  <section>
                    {
                      props.artistNote.map((item:any, index:any)=>{
                        return (
                          <div className="notebox" key={index}>
                            <p>{item}</p>
                          </div>
                        )
                      })
                    }
                  </section>
                </div>
              </div>
            }
          </div>
          :
          <div className="bookcover">
            <div className="bookpage">
              <div className="profile">
                <section>
                  <h1>{props.profile_name} {props.profile_name_en}</h1>
                </section>
                <section>
                  <img className='image'
                      src={`${MainURL}/images/portfolio/anmaran/profile_anmaran.jpg`}/>
                </section>
              </div>
            </div>
            <div className="bookpage">
              <div className="note">
                <section>
                  <img className='image'
                      src={`${MainURL}/images/portfolio/anmaran/artistnote.png`}
                  />
                </section>
                <section>
                  {
                    props.artistNote.map((item:any, index:any)=>{
                      return (
                        <div className="notebox" key={index}>
                          <p>{item}</p>
                        </div>
                      )
                    })
                  }
                </section>
              </div>
            </div>
          </div>
        }
        
        </>
      }

      { bookSelectPage >= props.portfolio.length + 2 &&
        <>
          {
            pulsNum === 1
            ?
            <div className="bookcover">
              {
                bookSelectPage === props.portfolio.length - pulsNum + 3 && 
                <div className="bookpage">
                  <div className="profile2">
                    <section>
                      <h3>학력</h3>
                      {
                        props.profile_school.map((item:any, index:any)=>{
                          return (
                            <p>{item}</p>
                          )
                        })  
                      }
                    </section>
                    <section>
                      <h3>역임</h3>
                      <div className="rowbox">
                        <p>{props.profile_duty}</p>
                      </div>
                    </section>
                    <section>
                      <h3>작품소장</h3>
                      <div className="rowbox">
                        <p>{props.profile_collection}</p>
                      </div>
                    </section>
                    <section>
                      <h3>연락처</h3>
                      <p>{props.contact.phone === "" ? "없음" : props.contact.phone}</p>
                      <div style={{height:'10px'}}></div>
                      <h3>E-Mail</h3>
                      <p>{props.contact.email === "" ? "없음" : props.contact.email}</p>
                    </section>
                  </div>
                </div>
              }
              {
                bookSelectPage === props.portfolio.length - pulsNum + 4 && 
                <div className="bookpage">
                  <section style={{}}>
                    <div className="career-cover">
                    <h3>작품활동</h3>
                    {
                      props.profile_career.map((item:any, index:any)=> {
                        return (
                          <div key={index} className='career-box'>
                            <h4>{item.title}</h4>
                            {
                              item.content.map((subItem: any, subIndex: any)=>{
                                return (
                                  <div key={subIndex} className='subbox'>
                                    <h5>{subItem.date}</h5>
                                    {
                                      subItem.name.map((sub2Item: any, sub2Index: any) => {
                                        return (
                                          <p key={sub2Index}>{sub2Item}</p>
                                        )
                                      })
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      })
                      
                    }
                    </div>
                  </section>
                </div>
              }
            </div>
            :
            <div className="bookcover">
              <div className="bookpage">
                <div className="profile2">
                  <section>
                    <h3>학력</h3>
                    {
                      props.profile_school.map((item:any, index:any)=>{
                        return (
                          <p>{item}</p>
                        )
                      })  
                    }
                  </section>
                  <section>
                    <h3>역임</h3>
                    <div className="rowbox">
                      <p>{props.profile_duty}</p>
                    </div>
                  </section>
                  <section>
                    <h3>작품소장</h3>
                    <div className="rowbox">
                      <p>{props.profile_collection}</p>
                    </div>
                  </section>
                  <section>
                    <h3>연락처</h3>
                    <p>{props.contact.phone === "" ? "없음" : props.contact.phone}</p>
                    <div style={{height:'10px'}}></div>
                    <h3>E-Mail</h3>
                    <p>{props.contact.email === "" ? "없음" : props.contact.email}</p>
                  </section>
                </div>

              </div>
              <div className="bookpage">
                <section>
                  <div className="career-cover">
                  <h3>작품활동</h3>
                  {
                    props.profile_career.map((item:any, index:any)=> {
                      return (
                        <div key={index} className='career-box'>
                          <h4>{item.title}</h4>
                          {
                            item.content.map((subItem: any, subIndex: any)=>{
                              return (
                                <div key={subIndex} className='subbox'>
                                  <h5>{subItem.date}</h5>
                                  {
                                    subItem.name.map((sub2Item: any, sub2Index: any) => {
                                      return (
                                        <p key={sub2Index}>{sub2Item}</p>
                                      )
                                    })
                                  }
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                    
                  }
                  </div>
                </section>
              </div>
            </div>
          }
        </>
      }

      <div className="bookbtnbox">
        <div className='bookbtn'
            onClick={()=>{
            setBookSelectPage(0);
          }}
        >
          <FaAngleDoubleLeft size={20}/>
        </div>
        <div className='bookbtn'
          onClick={()=>{
            if (bookSelectPage > 0) {
              setBookSelectPage(bookSelectPage-pulsNum);
            } else {
              alert('첫 페이지 입니다.')
            }
          }}
        >
          <FaAngleLeft  size={20}/>
        </div>
        <div className='bookpage'>
          <p>{bookSelectPage+1}</p>
          {
            pulsNum === 2 &&
            <>
              <p>-</p>
              <p>{bookSelectPage+2}</p>
            </>
          }
        </div>
        <div className='bookbtn'
          onClick={()=>{
            if (bookSelectPage < props.portfolio.length - pulsNum + 4) {
              setBookSelectPage(bookSelectPage+pulsNum);
            } else {
              alert('마지막 페이지 입니다.')
            }
          }}
        >
          <FaAngleRight size={20} />
        </div>
        <div className='bookbtn'
          onClick={()=>{
            setBookSelectPage(props.portfolio.length - pulsNum + 4);
          }}
        >
          <FaAngleDoubleRight  size={20}/>
        </div>
      </div>
    </div>
  )
}
