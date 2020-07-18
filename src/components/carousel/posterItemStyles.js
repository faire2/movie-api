import styled, {css} from "styled-components";

// responsive width
const posterItemWidth = 20;
const posterItemMargin = 0.5;
export const itemWidth = posterItemWidth + posterItemMargin;
// heigth is 1.5 of width
export const itemDimensionsRatio = 1.5;
const posterItemHeight = posterItemWidth * 1.5;
// max width derived from poster resolution
const maxWidth = 200;

export const PosterContainer = styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;
    width: ${posterItemWidth}vh;
    max-width: ${maxWidth}vh;
    margin-right: ${posterItemMargin}vh;
    z-index: 1;
`;

export const posterImageStyle = css`
    width: ${posterItemWidth}vh;
    max-width: ${maxWidth};
    height: ${posterItemHeight}vh;
    margin-right: 0.5vh;
    margin-bottom: 0.3vh;
    background-color: aliceblue;
`;

export const PosterImage = styled.img`${posterImageStyle}`;
export const MissingPosterImage = styled.div`${posterImageStyle}`;