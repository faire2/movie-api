import styled from "styled-components";

// marginleft value shifts carousel
export const CarouselInner = styled.div`
    display: flex;
    flex-flow: row;
    margin-left: ${props => props.xOffset}vh;
    transition: 1.2s;
`;

// overflow hidden hides items that are beyond screenport
export const CarouselContainer = styled.div`
    max-width: 100%;
    min-height: 20vh;
    overflow: hidden;
    position: relative;
    margin-bottom: 2vh;
`;

// displayes loading / error state feedbacks
export const FeedbackPanel = styled.div`
    position: absolute;
    width: 100%;
    height: 20vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;
