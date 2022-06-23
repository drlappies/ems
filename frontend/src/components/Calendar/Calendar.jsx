import "./calendar.css";
import React from "react";
import { months } from "../../constants/datetime";

function Calendar(props) {
  const { year, month, calendar, renderCalendarBox, isLoading } = props;

  return (
    <table className="calendar">
      <thead>
        <tr>
          <th colSpan="7">
            {year} {months[month]}
          </th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {calendar.map((week, i) => (
          <tr key={i}>
            {week.map((date, j) => (
              <td className="calendar-date" key={j}>
                {date && !isLoading && renderCalendarBox(date)}
                <div>{date?.date}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Calendar;
