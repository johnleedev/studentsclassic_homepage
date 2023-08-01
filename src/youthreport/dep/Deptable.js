/*eslint-disable*/
import React from 'react';
import './css/Deptable.css';

function Deptable(props) {

  return (
    <div className='dep_wrapper'>
      <div className="dep_agenamebox">
        <div className="dep_empty"></div>
        <div className="dep_group">
          <div>
            {props.group[0].dag_ko}
          </div>
        </div>
        <div className="dep_name">
          {props.group.map((a, i) => (
            <div key={i} className="dep_namebox"><div>
              {props.group[i].n}
              </div></div>
          ))}
        </div>
      </div>

      <div className='dep_nametablebox'>
        {props.group.map((a, i) => (
          <div key={i} className='dep_nametableboxwrapper'>
            <div className="dep_deptable_table">
              {Array.from(Array(53).keys()).map((_, index) => (
                <div key={index} className={"dep_deptable_date color_" + props.group[i]["day" + (index + 1)]}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deptable;
