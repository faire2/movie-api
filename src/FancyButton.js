import React, {useState} from "react";

export function FancyButton(props) {
    // simulation of onHover effect
    const [hover, setHover] = useState(false);

    const basicStyle = {
        textDecoration: "none",
        padding: "20px",
        textAlign: "center",
        marginTop: "1vh",
    };

    const buttonStyle = {
        border: "4px solid #494949 !important",
        transition: "all 0.4s ease 0s",
    };

    const hoverStyle = {
        background: "#0093D8",
        borderColor: "#f6b93b !important",
        transition: "all 0.4s ease 0s",
    };

    const finalStyle = hover ? {...basicStyle, ...hoverStyle} : {...basicStyle, ...buttonStyle};

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={props.onClick}
               style={finalStyle}>{props.text}</div>
    )
}