import React, {useState} from "react";
import {Direction} from "../../enums";

export function CarouselArrow(props) {
    const [hover, setHover] = useState(false);

    const basicStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        height: "30vh",
        width: "5vw",
        top: 0,
        fontSize: "10vh",
        color: "white",
        cursor: "pointer",
        zIndex: 2,
        backgroundColor: "#00b0f1",
        opacity: "10%",
        transition:  "0.6s"
    };

    const arrowRightStyle = {
        right: 0
    };

    const hoverStyle = {
        ...basicStyle,
        opacity: "65%",
    };


    const arrowStyle = props.direction === Direction.LEFT ? hover ? hoverStyle : basicStyle
        : hover ? {...hoverStyle, ...arrowRightStyle} : {...basicStyle, ...arrowRightStyle};

    return (
        <div style={arrowStyle} onClick={() => props.handleArrowClick(props.direction)}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}>
            {props.glyph}
        </div>
    )
}