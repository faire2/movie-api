import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ApiContext} from "../ApiContext";
import {Direction, QueryType, SortBy} from "../../enums";
import {getApiPage} from "../functions/getApiPage";
import {PropagateLoader} from "react-spinners";
import {PosterItem} from "./PosterItem";
import {CarouselArrow} from "./CarouselArrow";
import {ErrorMsgPanel} from "../errorMsgPanel/ErrorMsgPanel";
import {CarouselContainer, CarouselInner, FeedbackPanel} from "./carouselStyles";
import {itemWidth} from "./posterItemStyles";

const Carousel = (props) => {
    const apiContext = useContext(ApiContext);
    const genre = props.genre ? props.genre : "";
    const queryType = props.queryType;
    const searchQuery = props.searchQuery;
    const displayedItems = apiContext.displayedItems;

    const query = queryType === QueryType.SEARCH_MULTI ?
        searchQuery && apiContext.apiAddress + queryType + apiContext.apiKey + apiContext.language + "&query=" + searchQuery
        + getApiPage(1) + genre
        : apiContext.apiAddress + queryType + apiContext.apiKey + apiContext.language + SortBy.POPULARITY_DESC
        + getApiPage(1) + genre;

    const [carouselData, setCarouselData] = useState([]);
    const [xOffSet, setXOffset] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // calculate number of displayed items
    function calculateDisplayedItems() {
        const firstDisplayedItemIndex = Math.abs(xOffSet / itemWidth);
        return carouselData.results.length - firstDisplayedItemIndex - displayedItems + 1;
    }

    // querry structure is different between search and category fetch
    useEffect(() => {
        let mounted = true;

        async function fetchCarouselData() {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(query);
                console.log("Query: " + query);
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
    }, [props.queryType, props.searchQuery, query]);

    // arrows change value held in useState and tied to innerStyle: marginLeft
    function handleArrowClick(direction) {
        const offset = itemWidth;
        if (direction === Direction.LEFT) {
            if (xOffSet < 0) {
                setXOffset(xOffSet + offset);
            }
        } else if (direction === Direction.RIGHT) {
            if (calculateDisplayedItems() > 0) {
                setXOffset(xOffSet - offset);
            }
        } else {
            console.error("Unknown direction in function handleArrowClick: " + direction)
        }
    }

    return (
        <div>
            <h3>{props.header}</h3>
            {carouselData.results && (carouselData.results.length > 0) &&
            <CarouselContainer>
                {(isError || isLoading) &&
                <FeedbackPanel>
                    <PropagateLoader color={"#00b0f1"} loading={isLoading} size={25}/>
                    <ErrorMsgPanel message={"Při načítání dat se vyskytl problém :("}/>}
                </FeedbackPanel>
                }
                <CarouselInner xOffset={xOffSet}>
                    {carouselData.results && carouselData.results.map((item) =>
                        <div key={item.id}>
                            <PosterItem imgSrc={item.poster_path} title={queryType === QueryType.DISCOVER_MOVIE ?
                                item.title : item.name} item={item}/>
                        </div>
                    )}
                </CarouselInner>

                <CarouselArrow direction={Direction.LEFT} handleArrowClick={() => handleArrowClick(Direction.LEFT)}
                               glyph="<"/>
                <CarouselArrow direction={Direction.RIGHT} handleArrowClick={() => handleArrowClick(Direction.RIGHT)}
                               glyph=">"/>
            </CarouselContainer>
            }
        </div>
    )
}
// prevents unnecessary re-renders
export const MemoizedCarousel = React.memo(Carousel);