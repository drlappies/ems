import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissMessage } from "../actions/ui";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function SnackbarProvider(props) {
    const dispatch = useDispatch();
    const ui = useSelector(state => state.ui);

    return (
        <React.Fragment>
            {props.children}
            <Snackbar
                open={ui.snackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={1500}
                onClose={() => dispatch(dismissMessage(ui.message, ui.severity))}
                TransitionComponent={TransitionLeft}
                message="test"
            >
                <Alert
                    onClose={() => dispatch(dismissMessage(ui.message, ui.severity))}
                    severity={ui.severity}
                >
                    {ui.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default SnackbarProvider