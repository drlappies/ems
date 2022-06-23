import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { months } from "../../../constants/datetime";
import usePagination from "../../../hooks/usePagination";
import * as userThunk from "../../../redux/thunks/user";
import { networkStatus } from "../../../constants/network";

const columns = [
  { field: "id", headerName: "Bonus ID", flex: 1 },
  { field: "date", headerName: "date", flex: 1 },
  { field: "reason", headerName: "Reason", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
];

function UserBonus() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { offset, limit, setLimit, setOffset } = usePagination(0, 25);

  //   const fetchBonusRecord = useCallback(
  //     async (offset, limit) => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_API}/api/bonus/user/${auth.id}`,
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
  //             bonusRecord: res.data.bonus.map((el) => {
  //               return {
  //                 ...el,
  //                 date: `${new Date(el.date).getDate()} ${
  //                   months[new Date(el.date).getMonth()]
  //                 } ${new Date(el.date).getFullYear()}`,
  //               };
  //             }),
  //             isFetching: false,
  //             rowCount: parseInt(res.data.rowCount.count),
  //           };
  //         });
  //       } catch (err) {
  //         dispatch(popMessage(err.response.error.data, "error"));
  //       }
  //     },
  //     [auth.id, dispatch]
  //   );

  useEffect(() => {
    dispatch(userThunk.getUserBonus(offset, limit));
  }, [dispatch, limit, offset]);

  return (
    <DataGrid
      loading={user.getUserBonusStatus === networkStatus.FETCH_IN_PROGRESS}
      paginationMode="server"
      disableColumnFilter
      style={{ height: "70vh", width: "100%" }}
      rows={user.userBonus}
      columns={columns}
      pageSize={limit}
      rowCount={user.bonusCount}
      rowsPerPageOptions={[25, 50, 100]}
      onPageSizeChange={(size) => setLimit(size)}
      onPageChange={(page) => setOffset(page)}
    />
  );
}

export default UserBonus;
