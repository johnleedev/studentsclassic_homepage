/*eslint-disable*/
import './Dep.css';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Deptitle from './Deptitle';
import DateBox from './DateBox';
import Present from './Present';
import PresentInput from './PresentInput';
import Loading from '../Loading';
import MainURL from '../MainURL';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

function Dep(props) {
  
  const [cookies] = useCookies(['login']);
  const state = useSelector((state) => state);

  const [refresh, setRefresh] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const dep_num = urlParams.get('dep');
  const [year_num, set_year_num] = useState('');
  const [buttonColor, setButtonColor] = useState('1');

  const [isLoading, setIsLoading] = useState(true);
  
  const [dep_data, setdep_data] = useState([]);
  const dep_name = dep_data.length > 0 ? dep_data[0].da_ko : '';
  const dep_year_copy = dep_data.map((e) => e.da_ko);
  const dep_year = [...new Set(dep_year_copy)];
  const first_year_data = dep_data.filter((e) => e.da_ko === dep_year[0]);
  const second_year_data = dep_data.filter((e) => e.da_ko === dep_year[1]);
  const third_year_data = dep_data.filter((e) => e.da_ko === dep_year[2]);

  const [transfer_data, set_transfer_data] = useState([]);
    
  const select_data = (button_num) => {
    if (button_num === 0) {
      set_transfer_data(first_year_data);
    }
    if (button_num === 1) {
      set_transfer_data(second_year_data);
    }
    if (button_num === 2) {
      set_transfer_data(third_year_data);
    }
    return button_num
  };

  async function fetchData () {
    try {
      const result = await axios.get(`${MainURL}/dep/${dep_num}`)
      console.log('1.axios_result.data', result.data);
      setdep_data(result.data);
    } catch (error) {
      console.log('Error fetch:', error);
    }
    return
  };

  const alarm = () => {
    if (!cookies.login) {
      alert('로그인을 하셔야 입력이 됩니다') 
    } else if (cookies.login === 'gsjkldjklajsdfk') {
      return
    };
  } 

  useMemo(()=>{
    fetchData();
    alarm();
  }, [refresh]);


  useEffect(()=>{
    select_data(0);
    set_year_num(1);
    setTimeout(() => {
      setIsLoading(false);  
    }, 500);
  }, [dep_data]);  

  return isLoading ? 
  <Loading></Loading>
  : (
    <div className="dep_main">
      <div className="dep_main_inner">
        <div className="dep_main_presentCondition">
          <div className='dep_main_text'>
            {state.부서info[dep_num - 1].dep}
          </div>
          <Deptitle 
            dep_num={dep_num} 
            dep_year={dep_year} 
            select_data={select_data} 
            set_year_num={set_year_num}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
          />
          <div className="dep_main_presentlist">
            <div className="dep_main_present_date">
              <DateBox />
              <Present 
              transfer_data={transfer_data}
            />
            </div>
          </div>
        </div>
        <Deptitle 
            dep_num={dep_num} 
            dep_year={dep_year} 
            select_data={select_data} 
            set_year_num={set_year_num}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
          />
        <PresentInput
          transfer_data={transfer_data}
          dep_num={dep_num}
          year_num={year_num}
          dep_year={dep_year}
          refresh={refresh}
          setRefresh={setRefresh}
          setButtonColor={setButtonColor}
        />
      </div>
    </div>
  );
}

export default Dep;
