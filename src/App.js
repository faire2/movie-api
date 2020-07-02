import React, {useState} from 'react';
import "./App.css"
import {Genre, Language, QueryType} from "./enums";
import {ApiContext} from "./components/ApiContext";
import DetailPanel from "./components/detailPanel/DetailPanel";
import SearchPanel from "./components/searchPanel/SearchPanel";
import {ModalWrapper} from "./components/ModalWrapper";
import {MemoizedCarousel} from "./components/carousel/Carousel";
import {FancyButton} from "./components/FancyButton";

function App() {
    // detail panel modal
    const [detailData, setDetailData] = useState(null);
    const [showDetailPanel, setShowDetailPanel] = useState(false);
    const [showSearchPanel, setShowSearchPanel] = useState(false);

    // Language selector with appropriate state hook would be set here.
    // Labels would be provided by internationalization layer, e.g. i18next
    /*const [language, setLanguage] = useState(Language.CZECH);*/
    const language = Language.CZECH;

    // wrapper around modal panels hides them onClick
    function hideModalPanels() {
        setShowDetailPanel(false);
        setShowSearchPanel(false);
    }

    // centers movie detail
    const detailWrapperStyle = {
        display: "flex",
        justifyContent: "center"
    };

    // search button position
    const searchButtonStyle = {
        position: "absolute",
        width: "15vw",
        left: "0",
        top: "0"
    };

    const apiContextValues = {
        apiAddress: "https://api.themoviedb.org/3/",
        apiKey: "api_key=4c367d0da4105ce1dcb1dc2d68dec2d9",
        imagesAddress: "",
        language: language,
        detailData: detailData,
        setDetailData: setDetailData,
        showDetailPanel: showDetailPanel,
        setShowDetailPanel: setShowDetailPanel,
        showSearchPanel: showSearchPanel,
        setShowSearchPanel: setShowSearchPanel,
    };

    return (
        <div>
            <ApiContext.Provider value={apiContextValues}>
                <h1>Movie Api</h1>
                <div style={searchButtonStyle}><FancyButton text={"Vyhledávání"} onClick={() => setShowSearchPanel(true)}/></div>
                <div>
                    {showDetailPanel &&
                    <div style={detailWrapperStyle}>
                        <DetailPanel/>
                        <ModalWrapper hideModalPanels={hideModalPanels}/>
                    </div>}
                    {showSearchPanel &&
                    <div style={detailWrapperStyle}>
                        <SearchPanel/>
                        <ModalWrapper hideModalPanels={hideModalPanels}/>
                    </div>
                    }
                    <MemoizedCarousel header={"Oblíbené filmy"} queryType={QueryType.DISCOVER_MOVIE}/>
                    <MemoizedCarousel header={"Oblíbené seriály"} queryType={QueryType.DISCOVER_TV}/>
                    <MemoizedCarousel header={"Rodinné filmy"} queryType={QueryType.DISCOVER_MOVIE} genre={Genre.FAMILY}/>
                    <MemoizedCarousel header={"Dokumenty"} queryType={QueryType.DISCOVER_MOVIE} genre={Genre.DOCUMENTARY}/>
                </div>
            </ApiContext.Provider>
        </div>
    );
}

export default App;