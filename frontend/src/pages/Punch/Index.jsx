import "./punch.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as attdThunk from "../../redux/thunks/attendance";
import PunchCard from "../../components/PunchCard/PunchCard";

function PunchPage() {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(attdThunk.getUserCheckInStatus());
  }, [dispatch]);

  return (
    <div className="punch-container">
      <PunchCard
        title={"Employee Check-In"}
        checkInTime={attendance.userCheckInTime}
        checkOutTime={attendance.userCheckOutTime}
        hasCheckedIn={attendance.hasUserCheckedIn}
        hasCheckedOut={attendance.hasUserCheckedOut}
        checkIn={() => dispatch(attdThunk.postAttdCheckIn())}
        checkOut={() => dispatch(attdThunk.postAttdCheckOut())}
      />
    </div>
  );
}

export default PunchPage;
