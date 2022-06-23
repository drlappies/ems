import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import usePagination from "../../../hooks/usePagination";
import { networkStatus } from "../../../constants/network";
import * as userThunk from "../../../redux/thunks/user";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "date", headerName: "From", flex: 1 },
  { field: "reason", headerName: "To", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function UserReimbursement() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { offset, limit, setLimit, setOffset } = usePagination(0, 25);

  //   const fetchReimbursementRecord = useCallback(
  //     async (offset, limit) => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_API}/api/reimbursement/user/${auth.id}`,
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
  //             reimbursementRecord: res.data.reimbursement.map((el) => {
  //               return {
  //                 ...el,
  //                 date: `${new Date(el.date).getDate()} ${
  //                   months[new Date(el.date).getMonth()]
  //                 } ${new Date(el.date).getFullYear()}`,
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
    dispatch(userThunk.getUserReimbursement(offset, limit));
  }, [dispatch, limit, offset]);

  return (
    <DataGrid
      loading={user.getUserReimbmentStatus === networkStatus.FETCH_IN_PROGRESS}
      paginationMode="server"
      disableColumnFilter
      style={{ height: "70vh", width: "100%" }}
      rows={user.userReimbment}
      columns={columns}
      pageSize={limit}
      rowCount={user.reimbmentCount}
      rowsPerPageOptions={[25, 50, 100]}
      onPageSizeChange={(size) => setLimit(size)}
      onPageChange={(page) => setOffset(page)}
    />
  );
}

export default UserReimbursement;
