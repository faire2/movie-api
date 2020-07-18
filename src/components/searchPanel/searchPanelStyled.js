import styled from "styled-components";

export const SearchContainer = styled.div`
    position: fixed;
    padding: 2vw;
    width: 80vw;
    height: auto;
    min-height: 70vh;
    margin-top: 10vh;
    background-color: #0a181c;
    border-radius: 0.4vw;
    transition: 1s;
    color: #d9d9d9;
    z-index: 2;
`;

export const SearchInput = styled.input`
    background-color: rgba(133, 133, 133, 0.76);
    color: #d9d9d9;
    width: 30vw;
    border: 0;
    border-bottom: 0.5vw red;
    outline: 0;
    padding: 0.5vw 0 0.5vw 1.5vw;
    transition: border-color 0.2s;
    border-radius: 2vw;
`;