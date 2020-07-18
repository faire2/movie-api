import styled from "styled-components";
import {Direction} from "../../enums";

export const Arrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 30vh;
    width: 5vw;
    top: 0;
    font-size: 10vh;
    color: white;
    cursor: pointer;
    z-index: 2;
    background-color: #00b0f1;
    opacity: 10%;
    transition:  0.6s;
    right: ${props => props.direction === Direction.LEFT ? "auto" : 0};
    
    &:hover {opacity: 65%}
`;