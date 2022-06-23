import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import * as attdThunk from "../../redux/thunks/attendance";
import Grid from "@mui/material/Grid";
import Toolbar from "../../components/Toolbar/Toolbar";
import useToolbar from "../../components/Toolbar/useToolbar";
import usePagination from "../../hooks/usePagination";
import useInput from "../../hooks/useInput";
import useDateRange from "../../components/DateRangePicker/useDateRange";
import DeleteModal from "../../components/Attendance/DeleteModal";
import UpdateModal from "../../components/Attendance/UpdateModal";
import CreateModal from "../../components/Attendance/CreateModal";
import Filter from "../../components/Attendance/Filter";
import { networkStatus } from "../../constants/network";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "employee_id", headerName: "Employee ID", flex: 1 },
  { field: "firstname", headerName: "Firstname", flex: 1 },
  { field: "lastname", headerName: "Lastname", flex: 1 },
  { field: "date", headerName: "Date", type: "date", flex: 1 },
  { field: "check_in", headerName: "Check In", type: "time", flex: 1 },
  { field: "check_out", headerName: "Check Out", type: "string", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function AttendancePage() {
  const dispatch = useDispatch();
  const attd = useSelector((state) => state.attendance);
  const emp = useSelector((state) => state.employee);

  const {
    isUpdating,
    isCreating,
    isDeleting,
    toggleUpdate,
    toggleCreate,
    toggleDelete,
  } = useToolbar();
  const {
    from: queryFrom,
    to: queryTo,
    setFrom: setQueryFrom,
    setTo: setQueryTo,
  } = useDateRange(null, null);

  const [search, setSearch] = useInput("");
  const [employee, setEmployee] = useInput("any");
  const [status, setStatus] = useInput("any");
  const { offset, limit, setOffset, setLimit } = usePagination(0, 25);
  const [selectedAttd, setSelectedAttd] = useState([]);

  useEffect(() => {
    dispatch(
      attdThunk.getAttendance(
        offset,
        limit,
        employee,
        status,
        search,
        queryFrom,
        queryTo
      )
    );
  }, [dispatch, employee, limit, offset, queryFrom, queryTo, search, status]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div style={{ width: "100%", height: "75vh" }}>
          <DataGrid
            loading={attd.getAttdStatus === networkStatus.FETCH_IN_PROGRESS}
            checkboxSelection
            paginationMode="server"
            disableColumnFilter
            rows={attd.attendences}
            columns={columns}
            pageSize={limit}
            rowCount={attd.attendancesCount}
            rowsPerPageOptions={[25, 50, 100]}
            onSelectionModelChange={(row) => setSelectedAttd(row)}
            onPageSizeChange={(size) => setLimit(size)}
            onPageChange={(page) => setOffset(page * limit)}
            components={{ Toolbar: Toolbar }}
            componentsProps={{
              toolbar: {
                create: toggleCreate,
                update: toggleUpdate,
                destroy: toggleDelete,
                isUpdateDisabled: selectedAttd.length < 1,
                isDestroyDisabled: selectedAttd.length < 1,
                filterOption: (
                  <Filter
                    search={search}
                    onSearchChange={setSearch}
                    employee={employee}
                    onEmployeeChange={setEmployee}
                    status={status}
                    onStatusChange={setStatus}
                    dateFrom={queryFrom}
                    dateTo={queryTo}
                    onDateFromChange={setQueryFrom}
                    onDateToChange={setQueryTo}
                    employeeList={emp.employeeList}
                  />
                ),
              },
            }}
          />
        </div>
      </Grid>

      <DeleteModal
        isOpen={isDeleting}
        onClose={toggleDelete}
        onCancel={toggleDelete}
        id={selectedAttd}
        offset={offset}
        limit={limit}
        employee={employee}
        status={status}
        search={search}
        queryFrom={queryFrom}
        queryTo={queryTo}
      />
      <UpdateModal
        isOpen={isUpdating}
        onClose={toggleUpdate}
        onCancel={toggleUpdate}
        id={selectedAttd}
        offset={offset}
        limit={limit}
        employee={employee}
        status={status}
        search={search}
        queryFrom={queryFrom}
        queryTo={queryTo}
      />
      <CreateModal
        isOpen={isCreating}
        onClose={toggleCreate}
        onCancel={toggleCreate}
        offset={offset}
        limit={limit}
        employee={employee}
        status={status}
        search={search}
        queryFrom={queryFrom}
        queryTo={queryTo}
      />
    </Grid>
  );
}

export default AttendancePage;
