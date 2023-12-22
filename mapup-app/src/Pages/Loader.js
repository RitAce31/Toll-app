import React from "react";

export default function Loader(props) {
  return props.IsLoaderActive ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        left: 0,
        top: 0,
        background: "rgba(120,120,120,0.6)",
        zIndex: 9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
      }}
    >
      <div class="lds-hourglass"></div>
    </div>
  ) : null;
}
