import styled from "styled-components";

export const PanelContainer = styled.div`
    position: fixed;
    width: 80vw;
    max-width: 780px;
    height: 70vh;
    border-radius: 0.4vw;
    transition: 1s;
    display: flex;
    flex-flow: row;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2; 
    background-color: #0a181c;
    color: #d9d9d9;
    @media (min-width: 640px) {
        background-image: url(${props => props.bgrImgSrc});
    }
`;

export const TextColumn = styled.div`
    @media (min-width: 640px) {
        width: 30%;
    }
    @media (max-width: 640px) {
        width: 90%;
    }
    height: 100%;
    padding-left: 3vw;
    margin-bottom: 9vh;
    top: 0;
`;

// the background image is covered with a gradient overlay which serves as a text backdrop
export const Gradient = styled.div` 
    background: linear-gradient(90deg, rgba(0,0,0,1) 33%, rgba(255,255,255,0) 71%, rgba(255,255,255,0) 100%);
    width: 100%;
    min-height: 20vh;
    z-index: 2;
    display: flex;
    flex-flow: row
`;

// definition of text limits complemented with scrollbar
export const scrollbarStyle = {
    width: "100%",
    height: "55%",
};

// additional information are contained in a container at the bottom of the panel
export const AdditionalInfo = styled.div` 
    position: absolute;
    bottom: 1vh;
`;

// player element is positioned on in center of panel when not full-screened
// display value ensures that player starts full-screen after loading the video
// clicking on the wrapper unmounts the player
export const PlayerWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: ${props => props.videoLoaded ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    background-color: ${props => props.showPlayer ? "rgba(235,242,255,0.36)" : "transparent"};
`;