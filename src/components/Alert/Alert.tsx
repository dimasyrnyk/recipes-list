import { useEffect } from "react";

import "./Alert.scss";
import { useApp } from "@store/app";
import { AlertColor } from "@constants/app";

function Alert() {
  const alert = useApp((state) => state.alert);
  const appHideAlert = useApp((state) => state.appHideAlert);
  const classes = alert?.isError ? AlertColor.RED : AlertColor.GREEN;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (alert) {
      timeoutId = setTimeout(() => {
        hadleCloseAlert();
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [alert]);

  const hadleCloseAlert = () => {
    appHideAlert();
  };

  if (!alert) {
    return null;
  }

  return (
    <div className={"alert alert__" + classes}>
      <div className="alert__body">
        <p className="alert__message">{alert.text}</p>
        <button
          className={"alert__btn alert__btn_" + classes}
          onClick={hadleCloseAlert}
        >
          skip
        </button>
      </div>
    </div>
  );
}

export default Alert;
