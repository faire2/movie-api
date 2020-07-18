import React, {useState} from "react";
import {QueryType} from "../../enums";
import {MemoizedCarousel} from "../carousel/Carousel";
import {SearchContainer, SearchInput} from "./searchPanelStyled";

export default function SearchPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [input, setInput] = useState("");

    function encodeInput() {
        setSearchQuery(encodeURIComponent(input));
    }

    return (
        <SearchContainer>
            Vyhledat: <SearchInput type="text" value={input} onChange={(e) => setInput(e.target.value)}
                   onBlur={() => encodeInput()}/>
            <MemoizedCarousel header={"Hledání"} queryType={QueryType.SEARCH_MULTI} searchQuery={searchQuery}/>
        </SearchContainer>
    )
}