import {ImgSize, Medium} from "../../enums";
import React, {useContext, useState} from "react";
import {ErrorMsgPanel} from "../ErrorMsgPanel/ErrorMsgPanel";
import {ApiContext} from "../ApiContext";
import {MissingPosterImage, PosterContainer, PosterImage} from "./posterItemStyles";

export function PosterItem(props) {
    const [imageAvailable, setImageAvailable] = useState(props.imgSrc != null);
    const apiContext = useContext(ApiContext);

    // clicking shows modal panel with item details
    function showItemDetailPanel(item) {
        if (apiContext.showSearchPanel) {
            // if we click from the search panel, it needs to be closed before opening detail panel
            apiContext.setShowSearchPanel(false);
        }
        if (item) {
            // open set data and open detail panel
            apiContext.setDetailData(item);
            apiContext.setShowDetailPanel(true);
        } else {
            console.error("Cannot process item. Unable to show item detail.");
            console.log(item);
        }
    }

    // title length is limited to 32 characters
    let title = props.title && props.title.length > 32 ? props.title.substring(0, 32) + "..." : props.title;

    // image address
    const src = Medium.IMG + ImgSize.SMALL + props.imgSrc;
    // image has trigger set to display error message if the image is not available
    const img = imageAvailable ? <PosterImage src={src} alt={"poster of " + props.title}
                                              onError={() => setImageAvailable(false)}/>
        : null;

    return (
        <PosterContainer onClick={() => showItemDetailPanel(props.item)}>
            {imageAvailable ? img : <MissingPosterImage><ErrorMsgPanel message={"Picture not available"}/></MissingPosterImage>}
            <span>{title}</span>
        </PosterContainer>
    )
}
