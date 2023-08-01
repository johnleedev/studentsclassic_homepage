import { React, useMemo, useState } from 'react';
import './FindDup.css';
import * as XLSX from 'xlsx'
import Basic from './Basic';
import BasicName from './BasicName';
import $ from "jquery";

function FindDup() {

  let [storage1, setstorage1] = useState(Basic)
  let [storage2, setstorage2] = useState(Basic)

  let [대학부본예배, set대학부본예배] = useState(Basic)
  let [대학부4부예배, set대학부4부예배] = useState(Basic)
  let [대학부중복이름, set대학부중복이름] = useState(BasicName)

  let [청년부본예배, set청년부본예배] = useState(Basic)
  let [청년부4부예배, set청년부4부예배] = useState(Basic)
  let [청년부중복이름, set청년부중복이름] = useState(BasicName)



  const readUploadFile1 = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            // console.log(json);
            sessionStorage.setItem("arr1", JSON.stringify(json));
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  
  } 

  const readUploadFile2 = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            sessionStorage.setItem("arr2", JSON.stringify(json));
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }

  } 


  const 대청구분하기_본예배 = (부서) => {
    var copy = storage1.filter(e => e.장년1 === `${부서}`)
    return copy
  } 

  const 대청구분하기_4부예배 = (부서) => {
    var copy = storage2.filter(e => e.장년1 === `${부서}`)
    return copy
  } 

  
const 중복이름찾기 = (a, b) => {
  var copy = ''
  var add = []
	for(let i = 0; i < a.length; i++) {
  	for(let j = 0; j < b.length; j++) {

      if(a[i].이름 == b[j].이름){
      	var copy = a[i].이름
        add.push(copy)
      }

    }
  }
  return add
}



  

  return (
    <div className="find_dup">
      
      <div className='find_dup_title'>대학&청년부 출석 파악</div>

      <div className='find_dup_input'>
        <form className='find_dup_inputbox'>
          <label htmlFor="upload" >1~3부 출석</label>
          <input type="file" name="upload" id="upload" onChange={readUploadFile1}/>
        </form>

        <form className='find_dup_inputbox'>
          <label htmlFor="upload">4부 출석</label>
          <input type="file" name="upload" id="upload" onChange={readUploadFile2}/>
        </form>
      </div>

      <div className='find_dup_notice'> 사용순서</div>
      <div className='find_dup_notice'> 1. 파일업로드  / 2. 데이터가져오기  / 3. 데이터분류하기  / 4. 중복찾기</div>

      <button className='find_dup_btn' onClick={()=>{
        setstorage1(JSON.parse(sessionStorage.getItem('arr1')))      
        setstorage2(JSON.parse(sessionStorage.getItem('arr2')))  

        alert('완료되었습니다')    
     
      }}>데이터가져오기</button>


      <button className='find_dup_btn' onClick={()=>{
        var copy1 = 대청구분하기_본예배('대학부');
        var copy2 = 대청구분하기_본예배('청년부');
        var copy3 = 대청구분하기_4부예배('대학부')
        var copy4 = 대청구분하기_4부예배('청년부')

        set대학부본예배(copy1)
        set청년부본예배(copy2)
        set대학부4부예배(copy3)
        set청년부4부예배(copy4)
        
      }}>데이터분류하기</button>

      <button className='find_dup_btn' onClick={()=>{
    
        var copy5 = 중복이름찾기(대학부본예배, 대학부4부예배);
        var copy6 = 중복이름찾기(청년부본예배, 청년부4부예배);
        
        console.log (copy5)
        console.log (copy6)

        set대학부중복이름(copy5)
        set청년부중복이름(copy6)

      }}>중복찾기</button>

      <button className='find_dup_btn' onClick={()=>{
          sessionStorage.removeItem('arr1');
          sessionStorage.removeItem('arr2');

          set대학부본예배(Basic);
          set대학부4부예배(Basic);
          set대학부중복이름(BasicName);
        
          set청년부본예배(Basic);
          set청년부4부예배(Basic);
          set청년부중복이름(BasicName);
          
        }}>새로고침</button>

      <div className='find_dup_cover'> 
        
        <div className='find_dup_cover_box'> 
          <div className='find_dup_dep'>대학부</div>
          
          <div className='find_dup_statsbox'>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>번호</div>
              {
                대학부본예배.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{i+1}</div>      
                  )
                })
              }
            </div>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>1~3부 출석</div>
              {
                대학부본예배.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{대학부본예배[i].이름}</div>      
                  )
                })
              }
            </div>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>4부 출석</div>
              {
                대학부4부예배.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{대학부4부예배[i].이름}</div>      
                  )
                })
              }
            </div>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>중복 명단</div>
              {
                대학부중복이름.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{대학부중복이름[i]}</div>      
                  )
                })
              }
            </div>

          </div>
        </div>

        <div className='find_dup_cover_box'> 
          <div className='find_dup_dep'>청년부</div>
          
          <div className='find_dup_statsbox'>
            
            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>번호</div>
              {
                청년부본예배.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{i+1}</div>      
                  )
                })
              }
            </div>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>1~3부 출석</div>
              {
                청년부본예배.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{청년부본예배[i].이름}</div>      
                  )
                })
              }
            </div>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>4부 출석</div>
              {
                청년부4부예배.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{청년부4부예배[i].이름}</div>      
                  )
                })
              }
            </div>

            <div className='find_dup_list'> 
              <div className='find_dup_list_name'>중복 명단</div>
              {
                청년부중복이름.map((a, i)=>{
                  return (
                    <div className='find_dup_list_content'>{청년부중복이름[i]}</div>      
                  )
                })
              }
            </div>
                    
          </div>
        </div>

      </div>  

    </div>
  );
}

export default FindDup;


