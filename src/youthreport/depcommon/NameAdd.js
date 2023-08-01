/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import classnames from 'classnames';
import './NameAdd.css';
import MainURL from '../MainURL';

function NameAdd() {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  const dep = state.부서info
  const [show, setshow] = useState(false)
  const [dep_data, setDep_data] = useState('')

  const [addDep, setAddDep] = useState('')
  const [addYear, setAddYear] = useState('')
  const [addGroup, setAddGroup] = useState('')
  const [addName, setAddName] = useState('')

  const [depNum, setDepNum] = useState('')
  const [yearNum, setYearNum] = useState('')
  const [groupNum, setGroupNum] = useState('')

  const dep_year_copy = dep_data.length > 0 ? dep_data.map((e) => e.an_ko) : '';
  const dep_year = [...new Set(dep_year_copy)];
  const [dep_Group, set_dep_Group] = useState([]);

  async function fetchData (depNum) {
    try {
      let result = await axios.get(`${MainURL}/depmain/${depNum}`)
      console.log('fetchData', result.data);
      setDep_data(result.data);
    } catch (error) {
      console.log('Error fetch:', error);
    }
    return
  };

  const select_group_filter = (year) => {
    let yearfilter = dep_data.filter((e) => e.an_ko === `${year}`);
    let group = yearfilter.map((e) => e.dgn_ko);
    return group
  };

  const addNum_filter = () => {
    if(dep_data) {
      let copy = dep_data.filter((e) => e.an_ko === `${addYear}` && e.dgn_ko === `${addGroup}`)
      let addNum = copy[0].dgn;
      let split = addNum.split('-');
      let yearNum = split[1];
      let groupNum = split[2];
      setYearNum(yearNum);
      setGroupNum(groupNum);
    }
  };

  const handle_Dn_Change = (e) => {
    let copy = e.target.value;
    if (copy === '부서') {
      return
    } else {
      setAddDep(copy);
      let num = e.target.selectedIndex;
      fetchData(num);
      setDepNum(num);
    }
  };

  const handle_Dan_Change = (e) => {
    let copy = e.target.value;
    setAddYear(copy);
    let copy2 = select_group_filter(copy);
    set_dep_Group(copy2);
  };

  const handle_Dgn_Change = (e) => {
    let copy = e.target.value;
    setAddGroup(copy);
  };

  const set_button = () => {
    addNum_filter();
    setshow(true);
  };

  const reset_button = () => {
    setAddDep('')
    setAddYear('')
    setAddGroup('')
    setAddName('')
    setshow(true);
  };

  const nameAdd_button = (e) => {
    axios.post(`${MainURL}/nameadd`, {
      d_num : depNum, a_num : yearNum, g_num : groupNum, 
      g_ko : addGroup, new_n : addName
    }).then((res)=>{
      alert(res.data);
    }).catch((err)=>{'nameAdd_button_err', console.log(err)})
  };
  
  const nameDelete_button = (e) => {
    axios.post(`${MainURL}/namedelete`, {
      d_num : depNum, a_num : yearNum,
      g_ko : addGroup, delete_n : addName
    }).then((res)=>{alert(res.data);
    }).catch((err)=>{'nameDelete_button_err', console.log(err)})
  };

  return (
    <div className='nameadd'>
      <div className='nameadd_main_wrapper'>
        {/* 상단 선택 박스 */}
        <div className='nameadd_select_wrapper'>
          {/* 각부서 선택 */}
            <div className='nameadd_select_box1'>
              <div className='nameadd_content'></div>
              <div className='nameadd_content choice'>선택</div>
            </div>

            <div className='nameadd_select_box2'>
              <div className='nameadd_content'>추가부서</div>
              <div className='nameadd_content'>
                <select className='nameadd_select_dep' onChange={handle_Dn_Change}>
                  <option>부서</option>
                  {dep.map((a,i)=>{
                    return (<option key={i}>{dep[i].dep}</option>)
                  })}  
                </select>
              </div>
            </div>
          {/* 각부서 나이&학년 선택 박스 */}
            <div className='nameadd_select_box3'>
              <div className='nameadd_content'>학년/나이</div>
              <div className='nameadd_content'>
                <select className='nameadd_select_dep' onChange={handle_Dan_Change}>
                  <option>선택</option>
                  {dep_year.map((a,i)=>{
                    return (<option key={i}>{a}</option>)
                  })}
                </select>
              </div>
            </div>
            {/* 각부서 소그룹 선택 박스 */}
            <div className='nameadd_select_box4'>
              <div className='nameadd_content'>소그룹/반</div>
              <div className='nameadd_content'>
                <select className='nameadd_select_dep' onChange={handle_Dgn_Change}>
                  <option>선택</option>
                  {dep_Group.map((a,i)=>{
                    return (<option key={i}>{a}</option>)
                  })}
                </select>
              </div>
            </div>  
            <div className='nameadd_select_box5'>
              <div className='nameadd_content'>이름</div>
              <div className='nameadd_content'>
                <input type="text" className="nameadd_select_dep" onChange={(e)=>{setAddName(e.target.value)}}/>
              </div>
            </div>  
        </div>

        {/* 자료 입력 대기 버튼 */}
        <button className='set_button' onClick={set_button}>확인</button>
        <button className='reset_button' onClick={reset_button}>다시하기</button>

        {/* 명단 추가 박스 */}
        <div className='nameadd_input'>
          <div className='nameadd_inputbox'>
            <div className='text'>부서</div> 
            <div className="selectbox">{show ? addDep : ''}</div>
          </div>
          <div className='nameadd_inputbox'>
            <div className='text'>학년/나이</div> 
            <div className="selectbox">{show ? addYear : ''}</div>
          </div>
          <div className='nameadd_inputbox'>
            <div className='text'>소그룹/반</div> 
            <div className="selectbox">{show ? addGroup : ''}</div>
          </div>
          <div className='nameadd_inputbox'>
            <div className='text'>이름</div> 
            <div className="selectbox">{show ? addName : ''}</div>
          </div>   
        </div>

        <div className='nameadd_button_box'>
          <button className='nameadd_button' onClick={nameAdd_button}>입력하기</button>
          <button className='button_home' onClick={()=>{ navigate('/youthreport/main') }} >Home</button> 
          <button className='namedelete_button' onClick={nameDelete_button}>삭제하기</button>
          <button className='groupadd_button' onClick={()=>{ navigate('/youthreport/groupadd') }} >소그룹관리</button>
        </div>          

      </div>    
    </div>
  );
}

export default NameAdd;