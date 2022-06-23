import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { popMessage } from "../redux/actions/ui";
import { DataGrid } from "@mui/x-data-grid";
import Toolbar from "./Toolbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import axios from "axios";

function Position() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    selectedRow: [],
    positions: [],
    offset: 0,
    limit: 25,
    rowCount: 0,
    search: "",
    positionName: "",
    isLoading: true,
  });

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "post", headerName: "Position", flex: 1 },
  ];

  const fetchPositions = useCallback(
    async (offset, limit, search) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/position`,
          {
            params: {
              offset: offset,
              limit: limit,
              search: search,
            },
            headers: {
              token: window.localStorage.getItem("jwt"),
            },
          }
        );
        setRows(res.data.position);
        setState((prevState) => {
          return {
            ...prevState,
            rowCount: parseInt(res.data.rowCount.count),
            isCreating: false,
            isUpdating: false,
            isDeleting: false,
            positionName: "",
            isLoading: false,
          };
        });
      } catch (err) {
        dispatch(popMessage(err.response.data.error, "error"));
      }
    },
    [dispatch]
  );

  const createPosition = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/position`,
        {
          name: state.positionName,
        },
        {
          headers: {
            token: window.localStorage.getItem("jwt"),
          },
        }
      );
      dispatch(popMessage(res.data.success, "success"));
      return fetchPositions(state.offset, state.limit, state.search);
    } catch (err) {
      dispatch(popMessage(err.response.data.error, "error"));
    }
  }, [
    dispatch,
    fetchPositions,
    state.limit,
    state.offset,
    state.positionName,
    state.search,
  ]);

  const deletePosition = useCallback(async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/position/${state.selectedRow
          .map((el, i) => (i === 0 ? `?id=${el}` : `&id=${el}`))
          .join("")}`,
        {
          headers: {
            token: window.localStorage.getItem("jwt"),
          },
        }
      );
      dispatch(popMessage(res.data.success, "success"));
      return fetchPositions(state.offset, state.limit, state.search);
    } catch (err) {
      dispatch(popMessage(err.response.data.error, "error"));
    }
  }, [
    dispatch,
    fetchPositions,
    state.limit,
    state.offset,
    state.search,
    state.selectedRow,
  ]);

  const toggleUpdating = useCallback(async () => {
    try {
      if (state.isUpdating) {
        return setState((prevState) => {
          return { ...prevState, isUpdating: false };
        });
      }
      if (state.selectedRow.length > 1) {
        setState((prevState) => {
          return { ...prevState, isUpdating: true, positionName: "" };
        });
      } else {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/position/${[state.selectedRow]}`,
          {
            headers: {
              token: window.localStorage.getItem("jwt"),
            },
          }
        );
        setState((prevState) => {
          return {
            ...prevState,
            positionName: res.data.position.post,
            isUpdating: true,
          };
        });
      }
    } catch (err) {
      dispatch(popMessage(err.response.data.error, "error"));
    }
  }, [dispatch, state.isUpdating, state.selectedRow]);

  const updatePosition = useCallback(async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/position`,
        {
          id: state.selectedRow,
          name: state.positionName,
        },
        {
          headers: {
            token: window.localStorage.getItem("jwt"),
          },
        }
      );
      dispatch(popMessage(res.data.success, "success"));
      return fetchPositions(state.offset, state.limit, state.search);
    } catch (err) {
      dispatch(popMessage(err.response.data.error, "error"));
    }
  }, [
    dispatch,
    fetchPositions,
    state.limit,
    state.offset,
    state.positionName,
    state.search,
    state.selectedRow,
  ]);

  const changePageSize = (limit) => {
    setState((prevState) => {
      return { ...prevState, limit: limit, isLoading: true };
    });
  };
  const changePage = (offset) => {
    setState((prevState) => {
      return { ...prevState, offset: offset, isLoading: true };
    });
  };
  const handleSelect = (row) => {
    setState((prevState) => {
      return { ...prevState, selectedRow: row };
    });
  };
  const toggleCreating = () => {
    setState((prevState) => {
      return { ...prevState, isCreating: !prevState.isCreating };
    });
  };
  const toggleDeleting = () => {
    setState((prevState) => {
      return { ...prevState, isDeleting: !prevState.isDeleting };
    });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    fetchPositions(state.offset, state.limit, state.search);
  }, [fetchPositions, state.limit, state.offset, state.search]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataGrid
          loading={state.isLoading}
          paginationMode="server"
          checkboxSelection
          disableColumnFilter
          rows={rows}
          columns={columns}
          pageSize={state.limit}
          rowCount={state.rowCount}
          rowsPerPageOptions={[25, 50, 100]}
          style={{ height: "75vh", width: "100%" }}
          onSelectionModelChange={(row) => handleSelect(row)}
          onPageSizeChange={(size) => changePageSize(size)}
          onPageChange={(page) => changePage(page)}
          components={{ Toolbar: Toolbar }}
          componentsProps={{
            toolbar: {
              create: toggleCreating,
              update: toggleUpdating,
              destroy: toggleDeleting,
              isUpdateDisabled: state.selectedRow.length < 1,
              isDestroyDisabled: state.selectedRow.length < 1,
              filterOption: (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      label="Search"
                      name="search"
                      value={state.search}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              ),
            },
          }}
        />
      </Grid>
      <Modal open={state.isCreating} onClose={toggleCreating}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={5}>
            <Card>
              <CardHeader title="Create Position" />
              <CardContent>
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  label="Position Name"
                  name="positionName"
                  value={state.positionName}
                  onChange={handleChange}
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={toggleCreating}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={createPosition}
                >
                  Create
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Modal>
      <Modal open={state.isUpdating} onClose={toggleUpdating}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={5}>
            <Card>
              <CardHeader title="Update Payroll Record" />
              <CardContent>
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  label="Position Name"
                  name="positionName"
                  value={state.positionName}
                  onChange={handleChange}
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={toggleUpdating}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={updatePosition}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Modal>
      <Modal open={state.isDeleting} onClose={toggleDeleting}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={5}>
            <Card>
              <CardHeader title="Delete Leave Record" />
              <CardContent>Are you sure?</CardContent>
              <CardActions>
                <Button variant="contained" onClick={toggleDeleting}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={deletePosition}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default Position;
