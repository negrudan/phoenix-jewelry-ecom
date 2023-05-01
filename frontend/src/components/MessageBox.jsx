import React from "react";

export default function MessageBox(props) {
  return (
    <div className={props.variant || "alert alert-info"} role="alert">
      {props.children}
    </div>
  );
}
