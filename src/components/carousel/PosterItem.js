import {ImgSize, Medium} from "../../enums";
import React, {useContext, useState} from "react";
import {ErrorMsgPanel} from "../ErrorMsgPanel";
import {ApiContext} from "../ApiContext";

export function PosterItem(props) {
    const [imageAvailable, setImageAvailable] = useState(true);
    const apiContext = useContext(ApiContext);
    const itemWidth = "20vh";

    const containerStyle = {
        fontSize: "1.8vh",
        display: "flex",
        flexFlow: "column",
        textAlign: "center",
        width: itemWidth,
        marginRight: "0.5vh",
        zIndex: 1,
    };

    const imageStyle = {
        width: itemWidth,
        height: "30vh",
        marginRight: "0.5vh",
        marginBottom: "0.3vh",
    };

    // clicking shows modal panel with item details
    function showItemDetailPanel(item) {
        if (item) {
            console.log(item);
            console.log("click");
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
    const img = <img src={src} alt={"poster of " + props.title} style={imageStyle} onError={() => setImageAvailable(false)}/>;


    return (
        <div style={containerStyle} onClick={() => showItemDetailPanel(props.item)}>
            {imageAvailable ? img : <div style={imageStyle}><ErrorMsgPanel message={"Picture not available"}/></div>}
            <span>{title}</span>
        </div>
    )
}
