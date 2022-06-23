import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import usePagination from "../../../hooks/usePagination";
import { networkStatus } from "../../../constants/network";
import * as userThunk from "../../../redux/thunks/user";

const columns = [
  { field: "id", headerName: "Deduction ID", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "reason", headerName: "Reason", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
];

function UserDeduction() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { offset, limit, setLimit, setOffset } = usePagination(0, 25);

  //   const fetchDeductionRecord = useCallback(
  //     async (offset, limit) => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_API}/api/deduction/user/${auth.id}`,
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
  //             deductionRecord: res.data.deduction.map((el) => {
  //               return {
  //                 ...el,
  //                 date: `${new Date(el.date).getDate()} ${
  //                   months[new Date(el.date).getMonth()]
  //                 } ${new Date(el.date).getFullYear()}`,
  //               };
  //             }),
  //           };
  //         });
  //       } catch (err) {
  //         dispatch(popMessage(err.respones.data.error, "error"));
  //       }
  //     },
  //     [auth.id, dispatch]
  //   );

  useEffect(() => {
    dispatch(userThunk.getUserDeduction(offset, limit));
  }, [dispatch, limit, offset]);

  return (
    <DataGrid
      loading={user.getUserDeductionStatus === networkStatus.FETCH_IN_PROGRESS}
      paginationMode="server"
      disableColumnFilter
      style={{ height: "70vh", width: "100%" }}
      rows={user.userDeduction}
      columns={columns}
      pageSize={limit}
      rowCount={user.deductionCount}
      rowsPerPageOptions={[25, 50, 100]}
      onPageSizeChange={(size) => setLimit(size)}
      onPageChange={(page) => setOffset(page)}
    />
  );
}

export default UserDeduction;
