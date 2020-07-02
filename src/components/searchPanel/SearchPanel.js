import React, {useState} from "react";
import {QueryType} from "../../enums";
import {MemoizedCarousel} from "../carousel/Carousel";

export default function SearchPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [input, setInput] = useState("");

    const containerStyle = {
        position: "fixed",
        padding: "2vw",
        width: "80vw",
        height: "auto",
        minHeight: "70vh",
        marginTop: "10vh",
        backgroundColor: "#0a181c",
        borderRadius: "0.4vw",
        transition: "1s",
        color: "#d9d9d9",
        zIndex: 2,
    };

    const inputStyle = {
        backgroundColor: "rgba(133,133,133,0.76)",
        color: "#d9d9d9",
        width: "30vw",
        border: 0,
        borderBottom: "0.5vw red",
        outline: 0,
        padding: "0.5vw 0 0.5vw 1.5vw",
        //background: "transparent",
        transition: "border-color 0.2s",
        borderRadius: "2vw",
    };

    function encodeInput() {
        console.log(encodeURIComponent(input));
        setSearchQuery(encodeURIComponent(input));
    }

    return (
        <div style={containerStyle}>
            Vyhledat: <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                   onBlur={() => encodeInput()} style={inputStyle}/>
            <MemoizedCarousel header={"Hledání"} queryType={QueryType.SEARCH_MULTI} searchQuery={searchQuery}/>
        </div>
    )
}