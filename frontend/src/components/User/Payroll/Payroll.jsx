import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { months } from "../../../constants/datetime";
import * as userThunk from "../../../redux/thunks/user";
import usePagination from "../../../hooks/usePagination";
import { networkStatus } from "../../../constants/network";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "from", headerName: "From", flex: 1 },
  { field: "to", headerName: "To", flex: 1 },
  { field: "payday", headerName: "Payday", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function UserPayroll() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { offset, limit, setLimit, setOffset } = usePagination(0, 25);

  //   const fetchEmployeePayroll = useCallback(
  //     async (offset, limit) => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_API}/api/payroll/user/${auth.id}`,
  //           {
  //             params: {
  //               offset: offset,
  //               limit: limit,
  //             },
  //             headers: {
  //               token: window.localStorage.getItem("jwt"),
  //             },
  //           }
  //         );
  //         setState((prevState) => {
  //           return {
  //             ...prevState,
  //             currentPayrollRecord: res.data.payroll.map((el) => {
  //               return {
  //                 ...el,
  //                 from: `${new Date(el.from).getDate()} ${
  //                   months[new Date(el.from).getMonth()]
  //                 }  ${new Date(el.from).getFullYear()}`,
  //                 to: `${new Date(el.to).getDate()} ${
  //                   months[new Date(el.to).getMonth()]
  //                 }  ${new Date(el.to).getFullYear()}`,
  //                 payday: `${new Date(el.payday).getDate()} ${
  //                   months[new Date(el.payday).getMonth()]
  //                 }  ${new Date(el.payday).getFullYear()}`,
  //               };
  //             }),
  //             rowCount: parseInt(res.data.rowCount.count),
  //             isFetching: false,
  //           };
  //         });
  //       } catch (err) {
  //         dispatch(popMessage(err.response.data.error, "error"));
  //       }
  //     },
  //     [auth.id, dispatch]
  //   );

  useEffect(() => {
    dispatch(userThunk.getUserPayroll(offset, limit));
  }, [dispatch, limit, offset]);

  return (
    <DataGrid
      loading={user.getUserPayrollStatus === networkStatus.FETCH_IN_PROGRESS}
      paginationMode="server"
      disableColumnFilter
      style={{ height: "70vh", width: "100%" }}
      rows={user.userPayroll}
      columns={columns}
      pageSize={limit}
      rowCount={user.payrollCount}
      rowsPerPageOptions={[25, 50, 100]}
      onPageSizeChange={(size) => setLimit(size)}
      onPageChange={(page) => setOffset(page)}
    />
  );
}

export default UserPayroll;
