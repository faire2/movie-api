import React, {useContext} from "react";
import {Genre, QueryType, Routes} from "../../enums";
import {PanelWrapper} from "./homePageStyles";
import {FancyButton} from "../fancyButton/FancyButton";
import DetailPanel from "../detailPanel/DetailPanel";
import {ModalWrapper} from "../modalWrapper/ModalWrapper";
import {MemoizedCarousel} from "../carousel/Carousel";
import {useHistory} from "react-router-dom";
import {ApiContext} from "../ApiContext";
import {NavButton} from "../fancyButton/fancyButtonStyles";

function HomePage() {
    const history = useHistory();
    const apiContext = useContext(ApiContext);

    return (
        <div>
            <h1>Movie Api</h1>
            <NavButton>
                <FancyButton text={"Vyhledávání"} onClick={() => history.push(Routes.SEARCH)}/>
            </NavButton>
            <div>
                {apiContext.showDetailPanel &&
                <PanelWrapper>
                    <DetailPanel/>
                    <ModalWrapper hideModalPanels={apiContext.hideModalPanels}/>
                </PanelWrapper>}
                <MemoizedCarousel header={"Oblíbené filmy"} queryType={QueryType.DISCOVER_MOVIE}/>
                <MemoizedCarousel header={"Oblíbené seriály"} queryType={QueryType.DISCOVER_TV}/>
                <MemoizedCarousel header={"Rodinné filmy"} queryType={QueryType.DISCOVER_MOVIE} genre={Genre.FAMILY}/>
                <MemoizedCarousel header={"Dokumenty"} queryType={QueryType.DISCOVER_MOVIE} genre={Genre.DOCUMENTARY}/>
            </div>
        </div>
    );
}

export default HomePage;