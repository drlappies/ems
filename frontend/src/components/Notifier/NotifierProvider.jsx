import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "../../redux/actions/notification";

export const NotifierContext = createContext();

let displayed = [];

function NotifierProvider(props) {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.snackbars);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        if (displayed.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            dispatch(removeSnackbar({ key: myKey }));
            removeDisplayed(myKey);
          },
        });

        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return (
    <NotifierContext.Provider value={{}}>
      {props.children}
    </NotifierContext.Provider>
  );
}
export default NotifierProvider;
