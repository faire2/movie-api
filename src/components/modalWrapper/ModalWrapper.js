import React from "react";
import {Wrapper} from "./modalWrapperStyles";

export const ModalWrapper = (props) => {
  return (
      <Wrapper onClick={() => props.hideModalPanels()}/>  )
};