import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Toolbar from "../../components/Toolbar/Toolbar";
import useToolbar from "../../components/Toolbar/useToolbar";
import useInput from "../../hooks/useInput";
import usePagination from "../../hooks/usePagination";
import Filter from "../../components/Overtime/Filter";
import * as overtimeThunk from "../../redux/thunks/overtime";
import useDateRange from "../../components/DateRangePicker/useDateRange";
import CreateModal from "../../components/Overtime/CreateModal";
import UpdateModal from "../../components/Overtime/UpdateModal";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "employee_id", headerName: "Employee ID", flex: 1 },
  { field: "firstname", headerName: "firstname", flex: 1 },
  { field: "lastname", headerName: "lastname", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "from", headerName: "Check In", flex: 1 },
  { field: "to", headerName: "Check Out", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function OvertimePage() {
  const dispatch = useDispatch();
  const overtime = useSelector((state) => state.overtime);
  const emp = useSelector((state) => state.employee);
  const {
    isUpdating,
    isCreating,
    isDeleting,
    toggleUpdate,
    toggleCreate,
    toggleDelete,
  } = useToolbar();
  const { from, to, setFrom, setTo } = useDateRange(null, null);

  const [search, handleSearchChange] = useInput("");
  const [employeeId, handleEmployeeIdChange] = useInput("");
  const [status, handleStatusChange] = useInput("");
  const { offset, limit, setOffset, setLimit } = usePagination(0, 25);
  const [selectedOt, setSelectedOt] = useState([]);

  const handleCreate = (...params) => {
    dispatch(overtimeThunk.postOvertime(...params)).then(() =>
      dispatch(
        overtimeThunk.getOvertime(offset, limit, search, employeeId, status)
      )
    );
  };

  const handleUpdate = (...params) => {
    dispatch(overtimeThunk.putOvertimeById(selectedOt, ...params)).then(() =>
      dispatch(
        overtimeThunk.getOvertime(offset, limit, search, employeeId, status)
      )
    );
  };

  const handleDelete = (...params) => {};

  useEffect(() => {
    dispatch(
      overtimeThunk.getOvertime(offset, limit, search, employeeId, status)
    );
  }, [dispatch, employeeId, limit, offset, search, status]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div style={{ height: "75vh", width: "100%" }}>
          <DataGrid
            loading={false}
            components={{ Toolbar: Toolbar }}
            componentsProps={{
              toolbar: {
                create: toggleCreate,
                update: toggleUpdate,
                destroy: toggleDelete,
                isUpdateDisabled: selectedOt.length < 1,
                isDestroyDisabled: selectedOt.length < 1,
                filterOption: (
                  <Filter
                    search={search}
                    handleSearchChange={handleSearchChange}
                    employeeId={employeeId}
                    handleEmployeeIdChange={handleEmployeeIdChange}
                    status={status}
                    handleStatusChange={handleStatusChange}
                    employeeList={emp.employeeList}
                    from={from}
                    to={to}
                    onFromChange={setFrom}
                    onToChange={setTo}
                  />
                ),
              },
            }}
            rows={overtime.overtimeList}
            columns={columns}
            checkboxSelection
            disableColumnFilter
            pageSize={limit}
            rowCount={overtime.overtimeListCount}
            rowsPerPageOptions={[25, 50, 100]}
            paginationMode="server"
            onPageSizeChange={(size) => setLimit(size)}
            onPageChange={(page) => setOffset(page * parseInt(limit))}
            onSelectionModelChange={(row) => setSelectedOt(row)}
          />
        </div>
      </Grid>
      <CreateModal
        isOpen={isCreating}
        onCancel={toggleCreate}
        onConfirm={handleCreate}
      />
    </Grid>
  );
}

export default OvertimePage;
