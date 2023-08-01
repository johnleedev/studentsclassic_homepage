/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './LastResult.css';
import MainURL from '../MainURL';
import sundaylist from "../dep/sundaylist";

function LastResult () {
  
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`${MainURL}/lastresult`).then((결과)=>{
      console.log(결과.data)
      let copy = [...결과.data]
      setresult_data(copy)
    })
  ) }, [])

  let [result_data, setresult_data] = useState([])

  let result = result_data.filter( e=> 
    e.영유아2부 !== null || e.영유아3부 !== null ||
    e.유치2부 !== null || e.유치2부 !== null ||
    e.유년2부 !== null || e.유년3부 !== null ||
    e.초등2부 !== null || e.초등3부 !== null ||
    e.고등부 !== null || e.중등부 !== null )

  var result_sum_ft = (i) => {
    let sum = 
    parseInt(result[i].영유아2부 || 0) + parseInt(result[i].영유아3부 || 0)+
    parseInt(result[i].유치2부 || 0) + parseInt(result[i].유치3부 || 0)+
    parseInt(result[i].유년2부 || 0) + parseInt(result[i].유년3부 || 0)+
    parseInt(result[i].초등2부 || 0) + parseInt(result[i].초등3부 || 0)+
    parseInt(result[i].중등부 || 0) + parseInt(result[i].고등부 || 0)
    return sum
  }

  return (
    <div  className='lastresult_wrapper'>
      <div className='lastresult'>

        <div className='title'>
          <div className='title_text'>반야월교회 주일학교</div>
          <div className='title_text'>출석 전체통계</div>
        </div>

        <div className='depnamebox'>
          <div className='box'>날짜</div>
          <div className='boxline'></div>
          <div className='box'>영유아2부</div>
          <div className='boxline'></div>
          <div className='box'>영유아3부</div>
          <div className='boxline'></div>
          <div className='box'>유치2부</div>
          <div className='boxline'></div>
          <div className='box'>유치3부</div>
          <div className='boxline'></div>
          <div className='box'>유년2부</div>
          <div className='boxline'></div>
          <div className='box'>유년3부</div>
          <div className='boxline'></div>
          <div className='box'>초등2부</div>
          <div className='boxline'></div>
          <div className='box'>초등3부</div>
          <div className='boxline'></div>
          <div className='box'>중등부</div>
          <div className='boxline'></div>
          <div className='box'>고등부</div>
          <div className='boxline'></div>
          <div className='box'>합계</div>
        </div>
            
        <div className='statsbox'>
          {
            result.map((a, i)=>{
              return (
                <div className='tablebox' key={i}>
                  <div className='box'>
                    <div className='date'>{sundaylist[i].month}월</div>
                    <div className='date'>{sundaylist[i].day}일</div>
                  </div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].영유아2부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].영유아3부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].유치2부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].유치3부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].유년2부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].유년3부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].초등2부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].초등3부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].중등부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result[i].고등부}</div>
                  <div className='boxline'></div>
                  <div className='box'>{result_sum_ft(i)}</div>
                </div>
              )
            })
          } 
        </div>  

          <button className="button5 homeButton" onClick={()=>{
            navigate('/youthreport/main')
          }}>처음으로</button>

      </div>
    </div>
  )
}

export default LastResult;
