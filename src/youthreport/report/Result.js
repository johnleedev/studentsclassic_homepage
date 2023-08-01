import React from 'react';
import html2canvas from 'html2canvas';
import './Result.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import MainURL from '../MainURL';

function Result(props) {

  let navigate = useNavigate();

  let 출석 = [1,2,3,4,5,6,7,8,9,10,11]
  let arr = {
    부서: props.부서, 년: props.년, 월 : props.월, 일 : props.일, 째주 : props.째주, date_num : props.date_num,
    예배기도자 : props.예배기도자, 설교본문 : props.설교본문, 설교자: props.설교자, 설교제목: props.설교제목,
    헌금 : props.헌금,  헌금합계 : props.헌금합계,
    반 : props.반, 학년 : props.학년, 재적 : props.재적, 총계 : props.총계,
    출석 : props.출석, 출석합계 : props.출석합계, 새친구 : props.새친구,
    결석자 : props.결석자, 사유 : props.사유,
    결석자명단 : props.결석자명단
  }
  sessionStorage.setItem("arr", JSON.stringify(arr));
  let storage = JSON.parse(sessionStorage.getItem('arr'))

  const captureAndUpload = () => {
    html2canvas(document.querySelector('#result'))
      .then(canvas => {
        drawImg(canvas.toDataURL('image/png'));
        saveAs(canvas.toDataURL(), `${props.년}년${props.월}월${props.일}일 ${props.부서}.png`);
      })
      .catch(err => {console.log(err);});
    axios
      .post(`${MainURL}/uplord`, {
        date_num: storage.date_num,
        dep: storage.부서,
        num: storage.총계
      })
      .then(결과 => {alert(결과.data);})
      .catch(() => {console.log('실패함');});
  };

  return (
    <div className='result_wrapper' id='result'>

      <div className='result' >
        
         <span className="result부서">{storage.부서}</span>
        <span className="result날짜 년">{storage.년}</span>
        <span className="result날짜 월">{storage.월}</span>
        <span className="result날짜 일">{storage.일}</span>
        <span className="result날짜 째주"></span>
      
        <span className="result예배 예배기도자">{storage.예배기도자}</span>
        <span className="result예배 설교본문">{storage.설교본문}</span>
        <span className="result예배 설교자" >{storage.설교자}</span>
        <span className="result예배 설교제목">{storage.설교제목}</span>
        {
          [1,2,3,4].map((a)=>{
            return (
              <span className={"result헌금 헌금" + a}>{storage.헌금[a]}</span>      
            )
          })
        }
        <span className="result헌금 합계">{storage.헌금합계}</span>

       {
          출석.map((a,i)=>{
            return (
              <span className={"result출석-반 출석-반" + a}>{storage.반[a-1]}</span>      
            )
          })
        }
        
        {
          [1,2,3].map((a)=>{
            return (
              <span className={"result학년 세_" + a}>{storage.학년[a-1]}</span>      
            )
          })
        }
        
        { storage.출석[0] ?
          storage.출석[0].map((a, i)=>{
            return (
              <span className={"result출석1 출석1-" + `${i+1}`}>{storage.출석[0][i].num}</span>      
            )
          }) : ''
        }
        <span className="result출석1 출석1-12">{storage.출석합계['num1']}</span>

        { storage.출석[1] ?
          storage.출석[1].map((a, i)=>{
            return (
              <span className={"result출석2 출석2-" + `${i+1}`}>{storage.출석[1][i].num}</span>      
            )
          }) : ''
        }
        <span className="result출석2 출석2-12">{storage.출석합계['num2']}</span>

        { storage.출석[2] ?
          storage.출석[2].map((a, i)=>{
            return (
              <span className={"result출석3 출석3-" + `${i+1}`}>{storage.출석[2][i].num}</span> 
            )
          }) : ''
        }
        <span className="result출석3 출석3-12">{storage.출석합계['num3']}</span>

        <span className="result출석총원-재적">{storage.재적}</span>
        <span className="result출석총원-계">{storage.총계}</span>
        <span className="result출석총원-새친구">{storage.새친구}</span>
      </div>
      
       
      <div className='result결석자박스'>
        {
          storage.결석자명단.map((a, i)=>{
            return (
              <div className='result결석자박스리스트'>
                <span type="text" className="result소그룹">{storage.결석자명단[i].da_ko} {storage.결석자명단[i].dag_ko}</span>
                <span type="text" className="result결석자">{storage.결석자명단[i].n}</span>
                <span type="text" className="result사유">{storage.사유[i+1]}</span>
              </div>
            )
          })
        }
        </div>

      <div className='result_buttons2'>

        <button class="button3 captureButton" id='button' onClick={captureAndUpload}>업로드&<br></br>
                  캡처하기</button>

        <button class="button3 uplordButton2" id='button' onClick={()=>{
                navigate('/youthreport/lastreport/lastresult')
                }}>출석통계</button>

        <button class="button3 modifyButton" id='button' onClick={()=>{
              navigate('/youthreport/lastreport')
              }}>수정하기</button>

        <button class="button3 newButton" id='button' onClick={()=>{
                navigate('/youthreport/main')
              }}>Home</button>
    
      </div> 
    
    </div>
  )
}


function drawImg(imgData) {
  return new Promise(function reslove() { //내가 결과 값을 그릴 canvas 부분 설정
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //canvas의 뿌려진 부분 초기화
    var imageObj = new Image();
    imageObj.onload = function () {
    ctx.drawImage(imageObj, 10, 10); //canvas img를 그리겠다.
    };
    imageObj.src = imgData; //그릴 image데이터를 넣어준다.
  }, function reject() {});
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
  link.href = uri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  } else {
  window.open(uri);
  }
}


export default Result;