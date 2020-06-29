import React, {useState} from 'react';
import "./App.css"
import {Genre, Language, QueryType} from "./enums";
import {ApiContext} from "./components/ApiContext";
import Carousel from "./components/carousel/Carousel";
import DetailPanel from "./components/detailPanel/DetailPanel";

function App() {
    // detail panel modal
    const [detailData, setDetailData] = useState(null);
    const [showDetailPanel, setShowDetailPanel] = useState(false);

    //todo implement language switch
    /*const [language, setLanguage] = useState(Language.CZECH);*/
    const language = Language.CZECH;

    const detailPanelWrapperStyle = {
        top: "-10vh",
        width: "100vw",
        height: "1100vh",
        backgroundColor: "rgba(235,242,255,0.36)",
        position: "fixed",
        zIndex: 1,
        paddingTop: "10vh",
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
    };
    return (
        <div className="App">
            <h1>Movie Api</h1>
            <ApiContext.Provider value={apiContextValues}>
                {showDetailPanel &&
                <div>
                        <DetailPanel/>
                    <div style={detailPanelWrapperStyle} onClick={() => setShowDetailPanel(false)}>
                    </div>
                </div>}
                <Carousel header={"Oblíbené filmy"} queryType={QueryType.DISCOVER_MOVIE}/>
                <Carousel header={"Oblíbené seriály"} queryType={QueryType.DISCOVER_TV}/>
                <Carousel header={"Rodinné filmy"} queryType={QueryType.DISCOVER_MOVIE} genre={Genre.FAMILY}/>
                <Carousel header={"Dokumenty"} queryType={QueryType.DISCOVER_MOVIE} genre={Genre.DOCUMENTARY}/>
            </ApiContext.Provider>
        </div>
    );
}

export default App;