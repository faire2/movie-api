import React from "react";

export const ModalWrapper = (props) => {
    const modalPanelWrapperStyle = {
        top: "-10vh",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(235,242,255,0.36)",
        position: "fixed",
        zIndex: 1,
        paddingTop: "10vh",
    };
  return (
      <div style={modalPanelWrapperStyle} onClick={() => props.hideModalPanels()}/>  )
};