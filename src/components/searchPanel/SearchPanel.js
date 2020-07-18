import React, {useContext, useState} from "react";
import {SearchContainer, SearchInput} from "./searchPanelStyled";
import {QueryType, Routes} from "../../enums";
import {MemoizedCarousel} from "../carousel/Carousel";
import {FancyButton} from "../fancyButton/FancyButton";
import {useHistory} from "react-router-dom";
import {NavButton} from "../fancyButton/fancyButtonStyles";
import {PanelWrapper} from "../homePage/homePageStyles";
import DetailPanel from "../detailPanel/DetailPanel";
import {ModalWrapper} from "../modalWrapper/ModalWrapper";
import {ApiContext} from "../ApiContext";

export default function SearchPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [input, setInput] = useState("");
    const history = useHistory();
    const apiContext = useContext(ApiContext);

    function encodeInput() {
        setSearchQuery(encodeURIComponent(input));
    }

    return (
        <SearchContainer>
            <NavButton>
                <FancyButton text={"Přehled"} onClick={() => history.push(Routes.HOME)}/>
            </NavButton>
            <h1>Vyhledávání</h1>
            Vyhledat: <SearchInput type="text" value={input} onChange={(e) => setInput(e.target.value)}
                   onBlur={() => encodeInput()} onKeyDown={() => encodeInput()}/>
            {apiContext.showDetailPanel &&
            <PanelWrapper>
                <DetailPanel/>
                <ModalWrapper hideModalPanels={apiContext.hideModalPanels}/>
            </PanelWrapper>}
            <MemoizedCarousel header={"Hledání"} queryType={QueryType.SEARCH_MULTI} searchQuery={searchQuery}/>
        </SearchContainer>
    )
}