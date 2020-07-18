import React from "react";
import {ErrorPanel, InnerWrapper} from "./errorMsgPanelStyles";

export const ErrorMsgPanel = (props) => {
    return (
        <ErrorPanel>
            <InnerWrapper>
                {props.message}
            </InnerWrapper>
        </ErrorPanel>
    )
};