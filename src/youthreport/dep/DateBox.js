/*eslint-disable*/
import { React } from "react";
import "./css/Date.css"
import sundaylist from "./sundaylist";

function DateBox(props) {

  return (
    <div className="Date">
      <div className="Date_table1">
        <div className="Date_empty"></div>
        <table>
          <tbody>
            <tr>
              <td className="Date_group">소그룹/반</td>
              <td className="Date_name">이름</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="Date_table2">
        <table>
          <tbody>
            <tr>
              {sundaylist.map((date, i) => (
                <td className="date" key={i}>
                  <div>{sundaylist[i].month} /</div>
                  <div>{sundaylist[i].day}</div>
                  <div></div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DateBox;
