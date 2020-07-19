import React, {useContext, useEffect, useState} from "react";
import {ApiContext} from "../ApiContext";
import {Direction, QueryType} from "../../enums";
import {PropagateLoader} from "react-spinners";
import {PosterItem} from "./PosterItem";
import {CarouselArrow} from "./CarouselArrow";
import {ErrorMsgPanel} from "../errorMsgPanel/ErrorMsgPanel";
import {CarouselContainer, CarouselInner, FeedbackPanel} from "./carouselStyles";
import {itemWidth} from "./posterItemStyles";
import {getCarouselData} from "../functions/getData";

const Carousel = (props) => {
    const apiContext = useContext(ApiContext);
    const genre = props.genre ? props.genre : "";
    const queryType = props.queryType;
    const searchQuery = props.searchQuery;
    const displayedItems = apiContext.displayedItems;

    const [carouselData, setCarouselData] = useState([]);
    const [xOffSet, setXOffset] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageToLoad, setPageToLoad] = useState(2);
    const [totalPages, setTotalPages] = useState(null);

    // calculate number of displayed items
    function calculateItemsToTheRight() {
        const firstDisplayedItemIndex = Math.abs(xOffSet / itemWidth);
        return carouselData.length - firstDisplayedItemIndex - displayedItems + 1;
    }

    // fetch data with loading and error states
    useEffect(() => {
        let mounted = true;

        fetchCarouselData(mounted, 1);

        return () => {
            mounted = false;
        }
    }, [genre, queryType, searchQuery]);

    async function fetchCarouselData(mounted, pageNumber) {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await getCarouselData(queryType, genre, searchQuery, pageNumber);
            if (mounted) {
                setCarouselData([...carouselData, ...result.data.results]);
                setTotalPages(result.data["total_pages"]);
            }
        } catch (error) {
            setIsError(true);
            console.error(error);
        }
        setIsLoading(false);
    }

    // arrows change value held in useState and tied to innerStyle: marginLeft
    function handleArrowClick(direction) {
        const offset = itemWidth;
        if (direction === Direction.LEFT) {
            if (xOffSet < 0) {
                setXOffset(xOffSet + offset);
            }
        } else if (direction === Direction.RIGHT) {
            const itemsToTheRight = calculateItemsToTheRight();
            if (itemsToTheRight > 0) {
                setXOffset(xOffSet - offset);
                if (itemsToTheRight < 4 && pageToLoad > 0) {
                    fetchCarouselData(true, pageToLoad);
                    if (totalPages > pageToLoad) {
                    setPageToLoad(pageToLoad => pageToLoad++);
                    } else {
                        setPageToLoad(0);
                    }
                }
            }
        } else {
            console.error("Unknown direction in function handleArrowClick: " + direction)
        }
    }

    return (
        <div>
            <h3>{props.header}</h3>
            {carouselData && (carouselData.length > 0) &&
            <CarouselContainer>
                {(isError || isLoading) &&
                <FeedbackPanel>
                    <PropagateLoader color={"#00b0f1"} loading={isLoading} size={25}/>
                    <ErrorMsgPanel message={"Při načítání dat se vyskytl problém :("}/>}
                </FeedbackPanel>
                }
                <CarouselInner xOffset={xOffSet}>
                    {carouselData.map((item) =>
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