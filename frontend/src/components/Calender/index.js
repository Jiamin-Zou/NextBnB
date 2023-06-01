import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from 'moment';

const Calender = (props) => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1,'days'));
  const [focusedInput, setFocusedInput] = useState(null);

  const alertStartDate = () => {
    if (startDate) {
      alert(startDate.format("YYYY/MM/DD"));
      // console.log(startDate)
      console.log(startDate.format("YYYY/MM/DD"));
      console.log(`Type is: ${typeof startDate.format("YYYY/MM/DD")}`); // this is a string
      const date = new Date(startDate.format("YYYY/MM/DD"));
      alert(date);
    }
  };
  const alertEndDate = () => {
    if (endDate) {
      alert(endDate);

      console.log(endDate);
    }
  };

  return (
    <div className="App">
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
      />
      <button onClick={alertStartDate}>Click for start date</button>
      <button onClick={alertEndDate}>Click for end date</button>
    </div>
  );
};

export default Calender;
