import styled from "styled-components";

export const FancyButtonStyles = styled.div`
    font-size: 2vh;
    text-align: center;
    padding: 1vh;
    transition: all 0.4s ease 0s;
    cursor: pointer;
    
    &:hover {
        background: #0093D8;
    }
`;

// search button
export const NavButton = styled.div`
    position: absolute;
    width: 15vw;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 1;
`;