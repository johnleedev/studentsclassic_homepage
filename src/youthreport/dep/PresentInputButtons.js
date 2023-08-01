/*eslint-disable*/
import React, { useState } from 'react';
import './Dep.css';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import MainURL from '../MainURL';
import { useCookies } from 'react-cookie';

function PresentInputButtons(props) {

  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  
  let navigate = useNavigate();

  const day = props.addDate;
  const dep = props.dep_num;
  const year = props.year_num;
  const person = props.addPerson;

  const handleInput = () => {
    if (!cookies.login) {
      alert('로그인이 필요합니다.')
      navigate('/youthreport/login');
    } else if (cookies.login === 'gsjkldjklajsdfk') {
      axios
      .post(`${MainURL}/dateinput`, {
        day: day,
        dep: dep,
        year: year,
        person: person,
      })
      .then((결과) => {
        if (결과.data === '입력 성공!') {
          alert(person + '  입력되었습니다.');
          props.setRefresh(!props.refresh)
          props.setButtonColor('1')
        } else {
          alert(결과.data);
        }
      })
      .catch(() => {
        console.log('실패함');
      });
    }
  };

  const handleReset = () => {
    props.setAddPerson(['']);
  };

  const handleHome = () => {
    navigate('/youthreport/main');
  };

  const handleDelete = () => {
    axios
      .post(`${MainURL}/datedelete`, {
        day: day,
        dep: dep,
        year: year,
        person: person,
      })
      .then((결과) => {
        if (결과.data === '입력 성공!') {
          alert(person + '  삭제되었습니다.');
          props.setRefresh(!props.refresh)
          props.setButtonColor('1')
        } else {
          alert(결과.data);
        }
      })
      .catch(() => {
        console.log('실패함');
      });
  };

  return (
    <div className='dateinput_content_button_box'>
      {/* 입력대기버튼 */}
      <div className='dateinput_content_button'>
        <button className='dateinput_inputbutton' onClick={props.handleInputWait}>
          입력대기
        </button>
      </div>

      {/* 입력하기버튼 */}
      <div className='dateinput_content_button'>
        <button className='dateinput_uplordbutton' onClick={handleInput}>
          입력하기
        </button>
      </div>

      {/* 다시하기버튼 */}
      <div className='dateinput_content_button'>
        <button className='dateinput_refreshbutton' onClick={handleReset}>
          다시하기
        </button>
      </div>

      {/* HOME버튼 */}
      <div className='dateinput_content_button'>
        <button className='dateinput_homebutton' onClick={handleHome}>
          Home
        </button>
      </div>

      {/* 삭제버튼 */}
      <div className='dateinput_content_button'>
        <button className='dateinput_deletebutton' onClick={handleDelete}>
          출석삭제
        </button>
      </div>
    </div>
  );
}

export default PresentInputButtons;
