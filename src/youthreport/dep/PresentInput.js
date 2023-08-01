/*eslint-disable*/
import React, { useState } from 'react';
import './Dep.css';
import PresentInputButtons from './PresentInputButtons';
import sundaylist from "./sundaylist";
import $ from 'jquery';


function PresentInput(props) {
 
  const [date, setDate] = useState('선택');
  const transfer_data = props.transfer_data

  const group_copy = transfer_data.map((e) => e.dag_ko);
  const group_name = [...new Set(group_copy)];

  const [addPerson, setAddPerson] = useState(['']);
  const [addDate, setAddDate] = useState('');

  const dep_year = props.dep_year
  
  const per_man_name = (da_ko) => {
    const group_data = transfer_data.filter((e) => e.dag_ko === `${da_ko}`);
    const copy2 = group_data.map((e) => e.n);
    const result = [...new Set(copy2)];
    return result
  };
  
  const handleInputWait = () => {
    var add = [];
    $('input[type="checkbox"]:checked').each(function (i) {
      add.push($(this).val());
    });
    setAddPerson(add);
    $('input:checkbox[id="checkbox"]').prop('checked', false);
  };

  return (
    <div className='dep_main_presentInput'>
      <div className='dep_main_text' id='Aboutme'>
        출석입력하기
      </div>
      <div className='dep_main_dateselect_wrapper'>
        <div className='dep_main_dateselect_text1'>날짜선택</div>
        <select
          className='dep_main_dateselect_box'
          onChange={(e) => {
            const copy = e.target.value;
            setDate(copy);
            const copy2 = e.target.selectedIndex
            setAddDate(copy2)
          }}
        >
          <option>선택</option>
          {sundaylist.map((a, i) => (
            <option key={i}>{sundaylist[i].month}월{sundaylist[i].day}일</option>
          ))}
        </select>
        <div className='dep_main_dateselect_text2'>← 날짜를 선택하세요</div>
      </div>
      <div className='dep_main_noitce_textbox'>
        ↓ 학생 선택 후 '입력대기'를 눌러주세요. <strong>선택한 만큼 입력됩니다. (제한 없음)</strong>
      </div>
      <div className='dep_main_inputstate'>
        <div className='dep_main_inputstate_text1'>[ 날짜: {date} ]</div>
        <div className='dep_main_inputstate_text2'>입력대기현황</div>
      </div>
      <div className='dep_main_dateinput'>
        <div className='dep_main_input_wrapper'>
        {group_name.map((a, i) => (
          <div
            key={i}
            className='dep_main_dateinput_box'
            onChange={(e) => {
              if ( date === '선택') { 
                alert('날짜를 선택하세요'); e.target.checked = false;
              }
            }}
          >
            <div className='dep_main_dateinput_content1'>{group_name[i]}</div>
            <div className='dep_main_dateinput_content2'>
              {per_man_name(a).map((a2, i2) => (
                <div key={i2} className='dateinput_namebox'>
                  <label className='dateinput_name_label'>
                    <div className='dateinput_name_name'>{a2}</div>
                    <div>
                      <input
                        id='checkbox'
                        type='checkbox'
                        className='dateinput_name_input'
                        value={a2}
                      />
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
        {/* 출석적용현황 */}
        <div className='dateinput_content_stats'>
          <div className='dateinput_state_box'>
            <div className='dateinput_state_contentbox'>
              {addPerson.map((a, i) => (
                <div key={i} className='dateinput_state_content_name'>{addPerson[i]}</div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <PresentInputButtons
        handleInputWait={handleInputWait}
        setAddPerson={setAddPerson}
        date={date}
        addDate={addDate}
        dep_num={props.dep_num}
        year_num={props.year_num}
        addPerson={addPerson}
        refresh={props.refresh}
        setRefresh={props.setRefresh}
        setButtonColor={props.setButtonColor}
      />

      {/* 안내메시지 */}
      <div className='dep_main_noitce_text4'>- '입력대기' 클릭 후 '입력하기/출석삭제' 버튼을 클릭해야 자료가 입력/삭제됩니다. -</div>

    </div>
  );
}

export default PresentInput;
