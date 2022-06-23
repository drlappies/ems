import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import usePagination from "../../../hooks/usePagination";
import * as userThunk from "../../../redux/thunks/user";
import { networkStatus } from "../../../constants/network";

const columns = [
  { field: "id", headerName: "Allowance ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function UserAllowance() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { offset, limit, setLimit, setOffset } = usePagination(0, 25);

  useEffect(() => {
    dispatch(userThunk.getUserAllowance(offset, limit));
  }, [dispatch, limit, offset]);

  return (
    <DataGrid
      loading={user.getUserAllwanceStatus === networkStatus.FETCH_IN_PROGRESS}
      paginationMode="server"
      disableColumnFilter
      style={{ height: "70vh", width: "100%" }}
      rows={user.userAllowance}
      columns={columns}
      pageSize={limit}
      rowCount={user.allowanceCount}
      rowsPerPageOptions={[25, 50, 100]}
      onPageSizeChange={(size) => setLimit(size)}
      onPageChange={(page) => setOffset(page)}
    />
  );
}

export default UserAllowance;
