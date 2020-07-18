import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import "./fonts.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import SearchPage from "./components/searchPanel/SearchPanel";
import {Language, Routes} from "./enums";
import {ApiContext} from "./components/ApiContext";
import {itemWidth} from "./components/carousel/posterItemStyles";

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
        hideModalPanels: hideModalPanels,
        setDetailData: setDetailData,
        showDetailPanel: showDetailPanel,
        setShowDetailPanel: setShowDetailPanel,
        showSearchPanel: showSearchPanel,
        setShowSearchPanel: setShowSearchPanel,
    };

    return (
        <div ref={containerRef}>
            <ApiContext.Provider value={apiContextValues}>
                <Router>
                    <Route path={Routes.HOME} exact component={HomePage}/>
                    <Route path={Routes.SEARCH} exact component={SearchPage}/>
                </Router>
            </ApiContext.Provider>
        </div>
    )
}

export default App;