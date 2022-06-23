import "./punch.overtime.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as overtimeThunk from "../../redux/thunks/overtime";
import PunchCard from "../../components/PunchCard/PunchCard";

function PunchOvertimePage() {
  const dispatch = useDispatch();
  const overtime = useSelector((state) => state.overtime);

  useEffect(() => {
    dispatch(overtimeThunk.getUserOvertimeStatus());
  }, [dispatch]);

  return (
    <div className="punch-container">
      <PunchCard
        title={"Employee Check-In"}
        checkInTime={overtime.userOtCheckInTime}
        checkOutTime={overtime.userOtCheckOutTime}
        hasCheckedIn={overtime.hasUserOtCheckedIn}
        hasCheckedOut={overtime.hasUserOtCheckedOut}
        checkIn={() => dispatch(overtimeThunk.postOvertimeCheckIn())}
        checkOut={() => dispatch(overtimeThunk.postOvertimeCheckOut())}
      />
    </div>
  );
}

export default PunchOvertimePage;
