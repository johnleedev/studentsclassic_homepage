/*eslint-disable*/
import { React, useMemo, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios'
import './Report.css';
import sundaylist from "../dep/sundaylist";
import Result from './Result';
import LastResult from './LastResult';
import MainURL from '../MainURL';
import { useCookies } from 'react-cookie';

function Report() {

  const [cookies] = useCookies(['login']);
  
  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  const alarm = () => {
    if (!cookies.login) {
      alert('로그인을 하셔야 입력이 됩니다') 
    } else if (cookies.login === 'gsjkldjklajsdfk') {
      return
    };
   };

  useMemo(()=>{ 
    alarm();
    axios.get(`${MainURL}/info`).then((res)=>{ 
      let copy = [...res.data]
      setinfo(copy)
    });
  }, [])

  const date = new Date();
  const year = date.getFullYear();

  let [date_month, setdate_month] = useState('')
  let [date_day, setdate_day] = useState('')
  let [date_num, setdate_num] = useState('')

  let [info, setinfo] = useState('')
  let [부서data, set부서data] = useState([])

  const dep_year_copy = 부서data.map((e) => e.da_ko);
  const dep_year = [...new Set(dep_year_copy)];
  const group_copy = 부서data.map((e) => e.dag_ko);
  const group_name = [...new Set(group_copy)];

  let [부서, 부서변경] = useState('')
  let [재적, 재적변경] = useState('')

  let [예배기도자, 예배기도자변경] = useState('')
  let [설교본문, 설교본문변경] = useState('')
  let [설교자, 설교자변경] = useState('')
  let [설교제목, 설교제목변경] = useState('')

  // 헌금 
  let [헌금, 헌금변경] = useState({ 1: '', 2: '', 3: '', 4: '' });
  let [헌금합계, 헌금합계변경] = useState('');
  
  const calculateTotal = () => {
    const 합계 =
      parseInt(헌금[1].replace(/[^0-9]/g, '') || 0) +
      parseInt(헌금[2].replace(/[^0-9]/g, '') || 0) +
      parseInt(헌금[3].replace(/[^0-9]/g, '') || 0) +
      parseInt(헌금[4].replace(/[^0-9]/g, '') || 0);
    return 합계;
  };
  const handleChange헌금 = (key, value) => {
    헌금변경(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    const 합계 = calculateTotal();
    헌금합계변경(합계);
  }, [헌금]);


  // 출석입력
  let 박스 = [1,2,3,4,5,6,7,8,9,10,11]
  let [출석, 출석변경] = useState([],[],[]);
  let [출석합계, 출석합계변경] = useState({});
  let [새친구, 새친구변경] = useState('');
  let [총계, 총계변경] = useState('')

  var 부서출석 = () => {
    let present = [[], [], []];
    let sum = {}
    for (let y = 0; y < dep_year.length; y++) {
      let yeardata = 부서data.filter(e => e.da_ko === `${dep_year[y]}`); // 학년별 데이터
      
      for (let a = 0; a < group_name.length; a++) {
        let copy = yeardata.filter(e => e.da_ko === `${dep_year[y]}` && e.dag_ko === `${group_name[a]}`)
        let groupnum = copy.filter(e => eval("e.day"+(`${date_num}`)) === '1').length
        present[y][a] = { year : dep_year[y], group : group_name[a], num : groupnum }
      }
      sum[`num${y+1}`] = present[y].reduce((acc, cur) => parseInt(acc || 0) + parseInt(cur.num || 0), 0);
    }
    출석변경(present);
    출석합계변경(sum);
    let result = parseInt(sum['num1'] || 0)+parseInt(sum['num2'] || 0)+parseInt(sum['num3'] || 0)
    총계변경(result);
  }
  
  const presentInput = (sectionIndex) => {
    if (출석[sectionIndex]) {
      return 출석[sectionIndex].map((attendance, i) => (
        <input
          key={i}
          type="text"
          className={`출석${sectionIndex + 1} 출석${sectionIndex + 1}-${i + 1}${sectionIndex === 1 ? ' green' : ''}`}
          value={attendance.num}
          onInput={(e) => {
            const inputNum = e.target.value;
            const copy = { ...attendance, num: parseInt(inputNum) };
            const updatedAttendance = [...출석];
            updatedAttendance[sectionIndex][i] = copy;
            출석변경(updatedAttendance);
          }}
        />
      ));
    }
    return null;
  };

  // 결석
  let [결석자, 결석자변경] = useState([]);
  let [사유, 사유변경] = useState([]);
  let absent = 부서data.filter(e => eval("e.day"+(`${date_num}`)) !== '1');

 
   return (
    <div className='LastReport'>

    <Routes>
      <Route path="/" element={

      <div className='mainwrapper'>
        <div className='main_notice'>주일학교 보고서는 <br></br>PC에서 작성바랍니다</div>
        <div className='main'>
          {/* 부서 초기화 버튼 */}
          <div className='buttons'>
            {
              state.부서info.map((a, i)=>{
                return (
                  <button key={i} className='button1' onClick={()=>{
                    axios.get(`${MainURL}/dep/${i+1}`).then((res)=>{ 
                      let copy = [...res.data]
                      set부서data(copy)
                    })
                    부서변경(state.부서info[i].dep);
                    설교자변경(info[i].ministry);
                    재적변경(info[i].all_num);
                  }}>{state.부서info[i].dep}</button>
                )
              })
            }
            <button className="button2 resultButton" onClick={()=>{
              navigate('/youthreport/lastreport/lastresult')
            }}>전체통계</button>
            <button className="button2 homeButton1" onClick={()=>{
              navigate('/youthreport/main')
            }}>Home</button>
            <button className="button2 statsButton" onClick={()=>{
              if (date_month === '' || date_day === '') {alert('날짜를 선택하세요')} 
              else if (부서 === '') {alert('부서를 선택하세요')} 
              else {부서출석();}
            }}>출석현황<br></br>불러오기</button>
          </div>

          {/* 날짜선택 */}
          <div className='report_dateselect_wrapper'>
            <div className='report_dateselect_text1'>날짜선택</div>
            <select className='report_dateselect_box'
              onChange={(e)=>{
                    let copy = e.target.value; 
                    let index = e.target.selectedIndex; 
                    setdate_month(sundaylist[index-1].month);
                    setdate_day(sundaylist[index-1].day);
                    setdate_num(index)
                  }}>
              <option>선택</option>
              {  sundaylist.map((a,i)=>{return (<option key={i}>{sundaylist[i].month}월{sundaylist[i].day}일</option>)})}  
            </select>
          </div>
          <div className='report_dateselect_text2'>↓ 날짜를 선택하세요</div>

          <div className='inputs'>
            <input type="text" className="부서" defaultValue={부서} />
            
            <input type="text" className="날짜 년" defaultValue={year}/>
            <input type="text" className="날짜 월" defaultValue={date_month} onChange={(e)=>{월변경(e.target.value)}}/>
            <input type="text" className="날짜 일" defaultValue={date_day} onChange={(e)=>{일변경(e.target.value)}}/>
            <input type="text" className="날짜 째주" onChange={(e)=>{째주변경(e.target.value)}}/>

            <input type="text" className="예배 예배기도자" onChange={(e)=>{예배기도자변경(e.target.value)}}/>
            <input type="text" className="예배 설교본문" onChange={(e)=>{설교본문변경(e.target.value)}}/>
            <input type="text" className="예배 설교자" defaultValue={설교자} onChange={(e)=>{설교자변경(e.target.value)}}/>
            <input type="text" className="예배 설교제목" onChange={(e)=>{설교제목변경(e.target.value)}}/>

            {/* 헌금 input */}
            {[1, 2, 3, 4].map((a, i) => (
              <input
                key={i} type="text" className={"헌금 헌금" + a} value={formatCurrency(헌금[a])}
                onChange={(e) => {
                  let copy = { ...헌금 };
                  copy[a] = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
                  handleChange헌금(a, copy[a]);
                }}
              />
            ))}
            <input type="text" className="헌금 합계" defaultValue={formatCurrency(헌금합계)} />

            {/* 출석현황 줄 - 반 */}
            {박스.map((a, i)=>{
              return (<input key={i} type="text" className={"출석-반 출석-반" + a} defaultValue={group_name[i]}/>)
            })}

            <input type="text" className="학년_세-1" defaultValue={dep_year[0]} />
            <input type="text" className="학년_세-2 green" defaultValue={dep_year[1]}/>
            <input type="text" className="학년_세-3" defaultValue={dep_year[2]}/>

           {/* 출석1 */}
            {presentInput(0)}
            <input type="text" className="출석1 출석1-12" defaultValue={출석합계['num1']} />

            {/* 출석2 */}
            {presentInput(1)}
            <input type="text" className="출석2 출석2-12" defaultValue={출석합계['num2']} />

            {/* 출석3 */}
            {presentInput(2)}
            <input type="text" className="출석3 출석3-12" defaultValue={출석합계['num3']} />

            <input type="text" className="출석총원-재적" defaultValue={재적} />
            <input type="text" className="출석총원-계" defaultValue={총계}/>
            <input type="text" className="출석총원-새친구" defaultValue={새친구} 
              onChange={(e) => {let copy = e.target.value; 새친구변경(copy); }}/>
          </div>
        </div>  
          
        {/* 결석 박스*/}
        <div className='결석자박스'>
        {
          absent.map((a, i)=>{
            return (
              <div key={i} className='결석자박스리스트'>
                <input type="text" className="소그룹"
                defaultValue={`${absent[i].da_ko}`+`${absent[i].dag_ko}`}
                onInput={(e)=>{let copy = {...소그룹}; copy[i+1] = e.target.value; 소그룹변경(copy)}}
                ></input>
                <input type="text" className="결석자"
                defaultValue={absent[i].n}
                onInput={(e)=>{let copy = {...결석자}; copy[i+1] = e.target.value; 결석자변경(copy)}}
                ></input>
                <input type="text" className="사유"
                onInput={(e)=>{let copy = {...사유}; copy[i+1] = e.target.value; 사유변경(copy)}}
                ></input>
              </div>
            )
          })
        }
        </div>
            
          
        <div className='report_footer'>
          <button className="button2 savebutton" onClick={()=>{
            if (date_month === '' || date_day === '') {
              alert('날짜를 선택하세요')
            } else {
              if (!cookies.login) {
                alert('로그인이 필요합니다.')
                navigate('/youthreport/login');
              } else if (cookies.login === 'gsjkldjklajsdfk') {
                navigate(`/youthreport/lastreport/result`)

              }
            }
          }}>저장하기</button>

          <button className="button2 homebutton2" onClick={()=>{
              navigate(`/youthreport/main`)
          }}>home</button> 
        </div>
        
      </div>
      }/>

        <Route path="/result" element={
          <Result 
            부서={부서} 년={year} 월={date_month} 일={date_day} date_num={date_num}
            예배기도자={예배기도자} 설교본문={설교본문} 설교자={설교자} 설교제목={설교제목}
            헌금={헌금} 헌금합계={헌금합계}
            학년={dep_year} 반={group_name} 재적={재적} 총계={총계}
            출석={출석} 출석합계={출석합계} 새친구={새친구}
            결석자명단={absent} 결석자={결석자} 사유={사유}
          ></Result>
        }/>

        <Route path="/lastresult" element={<LastResult></LastResult>}/>  

       </Routes>
    </div>
  );
}

export default Report;