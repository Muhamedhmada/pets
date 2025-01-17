import React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message, type) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};
