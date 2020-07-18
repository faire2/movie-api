import React from "react";
import {Arrow} from "./carouselArrowStyles";

export const CarouselArrow = (props) =>
        <Arrow direction={props.direction} onClick={() => props.handleArrowClick(props.direction)}>
            {props.glyph}
        </Arrow>