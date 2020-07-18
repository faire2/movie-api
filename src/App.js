import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import "./fonts.css"
import {Genre, Language, QueryType} from "./enums";
import {ApiContext} from "./components/ApiContext";
import DetailPanel from "./components/detailPanel/DetailPanel";
import SearchPanel from "./components/searchPanel/SearchPanel";
import {ModalWrapper} from "./components/modalWrapper/ModalWrapper";
import {MemoizedCarousel} from "./components/carousel/Carousel";
import {itemWidth} from "./components/carousel/posterItemStyles";
import {PanelWrapper, SearchButtonWrapper} from "./appStyles";
import {FancyButton} from "./components/fancyButton/FancyButton";

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

    // creates ref to enable measuring item's width
    let containerRef = useRef();
    const [displayedItems, setDisplayedItems] = useState(0);
    const RESET_TIMEOUT = 100;

    function calculateDisplayedItems() {
        const carouselWidth = containerRef.current.offsetWidth
        const windowHeight = window.innerHeight
        setDisplayedItems(
            Math.round(carouselWidth / ((windowHeight * itemWidth) / 100)),
        )
    }

    // during first render set initial element size
    useLayoutEffect(() => {
        if (containerRef.current) {
            calculateDisplayedItems()
        }
    })

    // add throttled window listener
    useEffect(() => {
        let movement_timer = null

        const resizeListener = () => {
            clearTimeout(movement_timer)
            movement_timer = setTimeout(calculateDisplayedItems, RESET_TIMEOUT)
        }

        calculateDisplayedItems()

        window.addEventListener('resize', resizeListener)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])

    const apiContextValues = {
        apiAddress: "https://api.themoviedb.org/3/",
        apiKey: "api_key=4c367d0da4105ce1dcb1dc2d68dec2d9",
        imagesAddress: "",
        language: language,
        detailData: detailData,
        displayedItems: displayedItems,
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
                <SearchButtonWrapper>
                    <FancyButton text={"Vyhledávání"} onClick={() => setShowSearchPanel(true)}/>
                </SearchButtonWrapper>
                <div ref={containerRef}>
                    {showDetailPanel &&
                    <PanelWrapper>
                        <DetailPanel/>
                        <ModalWrapper hideModalPanels={hideModalPanels}/>
                    </PanelWrapper>}
                    {showSearchPanel &&
                    <PanelWrapper>
                        <SearchPanel/>
                        <ModalWrapper hideModalPanels={hideModalPanels}/>
                    </PanelWrapper>
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