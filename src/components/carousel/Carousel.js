import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ApiContext} from "../ApiContext";
import {Direction, QueryType, SortBy} from "../../enums";
import {getApiPage} from "../functions/apiFunctions";
import {PropagateLoader} from "react-spinners";
import {PosterItem} from "./PosterItem";
import {CarouselArrow} from "./CarouselArrow";
import {ErrorMsgPanel} from "../ErrorMsgPanel";

export default function SquadActionsCarousel(props) {
    const apiContext = useContext(ApiContext);
    const genre = props.genre ? props.genre : "";
    const queryType = props.queryType;
    const [carouselData, setCarouselData] = useState([]);
    const [xOffSet, setXOffset] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //todo a test that all part of the query string are non-null would be good
    useEffect(() => {
        let mounted = true;

        async function fetchCarouselData() {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(apiContext.apiAddress + queryType + apiContext.apiKey + apiContext.language
                    + SortBy.POPULARITY_DESC + getApiPage(1) + genre);
                if (mounted) {
                    setCarouselData(result.data);
                }
            } catch (error) {
                setIsError(true);
                console.error(error);
            }
            setIsLoading(false);
        }

        fetchCarouselData();

        return () => {
            mounted = false;
        }
    }, [apiContext.apiAddress, apiContext.apiKey, apiContext.language, genre, queryType]);

    function handleArrowClick(direction) {
        const offset = 20.5;
        if (direction === Direction.LEFT) {
            if (xOffSet < 0) {
                setXOffset(xOffSet + offset);
            }
        } else if (direction === Direction.RIGHT) {
            if (xOffSet > (carouselData.results.length - 2) * -offset)
                setXOffset(xOffSet - offset);
        } else {
            console.error("Unknown direction in function handleArrowClick: " + direction)
        }
    }

    const containerStyle = {
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        marginBottom: "2vh",
        minHeight: "20vh",
    };

    const innerStyle = {
        display: "flex",
        flexFlow: "row",
        marginLeft: xOffSet + "vh",
        transition: "1.2s",
    };

    const infoStyle = {
        position: "absolute",
        width: "100%",
        height: "20vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: isError ? 1 : +1,
    };

    return (
        <div>
            <h3>{props.header}</h3>
            <div style={containerStyle}>
                {(isError || isLoading) &&
                <div style={infoStyle}>
                    <PropagateLoader color={"#00b0f1"} loading={isLoading} size={25}/>
                    <ErrorMsgPanel message={"Unable to fetch data! Please try again later..."}/>}
                </div>
                }
                <div style={innerStyle}>
                    {carouselData.results && carouselData.results.map((item) =>
                        <div key={item.id}>
                            <PosterItem imgSrc={item.poster_path} title={queryType === QueryType.DISCOVER_MOVIE ?
                                item.title : item.name} item={item}/>
                        </div>
                    )}
                </div>
                <CarouselArrow direction={Direction.LEFT} handleArrowClick={() => handleArrowClick(Direction.LEFT)}
                               glyph="<"/>
                <CarouselArrow direction={Direction.RIGHT} handleArrowClick={() => handleArrowClick(Direction.RIGHT)}
                               glyph=">"/>
            </div>
        </div>
    )
};