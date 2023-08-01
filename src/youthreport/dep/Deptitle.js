/*eslint-disable*/
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

function Deptitle(props) {

  const [cookies] = useCookies(['login']);
  const navigate = useNavigate();
  const dep_year = props.dep_year  

  return (
    <div className='dep_main_buttonbox'>
      <div className='dep_main_buttonleft'>
        {dep_year.map((a, i) => (
          <button
            key={i}
            className={classnames('dep_agebutton', { buttoncolor: props.buttonColor === `${i + 1}` })}
            onClick={() => {
              props.setButtonColor(`${i + 1}`);
              props.select_data(i)
              props.set_year_num(i+1)
            }}
          >
            {dep_year[i]}
          </button>
        ))}
      </div>
      <div className='dep_main_buttonright'>
        <button className='dep_homebutton' onClick={() => {
          if (!cookies.login) {
            navigate('/login')  
          } else if (cookies.login === 'gsjkldjklajsdfk') {
            alert('로그인이 되어있습니다.')
          };
        }}>
          로그인
        </button>
        <button className='dep_homebutton' onClick={() => navigate('/youthreport/main')}>
          Home
        </button>
      </div> 
    </div>
  );
}

export default Deptitle;
