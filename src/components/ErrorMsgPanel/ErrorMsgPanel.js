import React from "react";

export const ErrorMsgPanel = (props) => {
    const outerStyle = {
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const innerStyle = {
        backgroundColor: "#f16d8d",
        padding: "1vw",
        borderRadius: "2vw",
    };

    return (
        <div style={outerStyle}>
            <div style={innerStyle}>
            {props.message}
            </div>
        </div>
    )
};