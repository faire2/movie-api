import React from "react";
import {FancyButtonStyles} from "./fancyButtonStyles";

export const FancyButton = (props) => {
    return (
        <FancyButtonStyles onClick={props.onClick}>
            {props.text}
        </FancyButtonStyles>
    )
}