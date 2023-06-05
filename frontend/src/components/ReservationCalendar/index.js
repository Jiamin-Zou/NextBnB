import {useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./ReservationCalendar.css";

const ReservationCalendar = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setCalenderOpen,
}) => {
  const calRef = useRef(null);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const closeOnOutsideClick = (e) => {
    if (calRef.current && !calRef.current.contains(e.target)) {
      setCalenderOpen(false);
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  };

  useEffect(()=>{
    document.addEventListener("click", closeOnOutsideClick)
  },[])

  return (
    <div ref={calRef}>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        className="reservation-calendar"
      />
    </div>
  );
};

export default ReservationCalendar;
