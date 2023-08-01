/*eslint-disable*/
import React from 'react';
import Deptable from './Deptable';
import sundaylist from "./sundaylist";
import "./css/Stats.css"

function Present(props) {
  const transfer_data = props.transfer_data
  const group_copy = transfer_data.map((e) => e.dag_ko);
  const grouplist = [...new Set(group_copy)];

  return (
    <div className="dep_main_deptable">
      {/* 각 소그룹별 명단 */}
      {grouplist.map((a, i) => (
        <Deptable key={i} group={transfer_data.filter((e) => e.dag_ko === `${grouplist[i]}`)} />
      ))}

      {/* 통계 */}
      <div className="Stats">
        <div className="Stats_table1">
          <div className="Stats_empty"></div>
          <table>
            <tbody> {/* <tbody> 추가 */}
              <tr>
                <td className="Stats_group"></td>
                <td className="Stats_name">통계</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="Stats_table2">
          <table>
            <tbody>
              <tr>
                {sundaylist.map((a, i) => {
                  return (
                    <td key={i} className="date">{transfer_data.filter(e => eval("e.day" + (i + 1)) === '1').length}</td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Present;
