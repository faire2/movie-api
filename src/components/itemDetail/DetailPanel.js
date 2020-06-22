import React, {useContext} from "react";
import {ApiContext} from "../ApiContext";
import {ImgSize, Medium} from "../../enums";

export default function DetailPanel() {
    const apiContext = useContext(ApiContext);
    const detailData = apiContext.detailData;
    const isPanelDisplayed = apiContext.showDetailPanel;

    const title = detailData.title ? detailData.title : detailData.name;
    const description = detailData.overview ? detailData.overview : "Bližší informace nejsou momentálně k dispozici.";
    const vote = detailData.vote_average;
    const release = detailData.release_date ? detailData.release_date : detailData.first_air_date;
    const backDropImgSrc = Medium.IMG + ImgSize.LARGE + detailData.backdrop_path;

    const containerStyle = {
        position: "absolute",
        left: "9vw",
        width: "80vw",
        height: "auto",
        minHeight: "70vh",
        marginTop: "10vh",
        backgroundColor: "#0a181c",
        // ensures the carousels' items are clickable
        zIndex: isPanelDisplayed ? 1 : -1,
        borderRadius: "0.4vw",
        transition: "1s",
        color: "#d9d9d9",
        display: "flex",
        flexFlow: "row",
        backgroundImage: `url(${backDropImgSrc})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    const textColumnStyle = {
        width: "30%",
        minHeight: "80%",
        paddingLeft: "3vw",
        paddingBottom: "7vh",
        top: 0,
        fontSize: "1.2rem",
        overflow: "visible",
    };

    // the background image is covered with a gradient overlay which serves as a text backdrop
    const gradientStyle = {
        background: "linear-gradient(90deg, rgba(0,0,0,1) 33%, rgba(255,255,255,0) 71%, rgba(255,255,255,0) 100%)",
        width: "100%",
        minHeight: "20vh",
        zIndex: 2,
    };

    // additional information are contained in a container at the bottom of the panel
    const additionalInfoStyle = {
        position: "absolute",
        bottom: "2vh",
    };

    return (
        <div style={containerStyle}>
            <div style={gradientStyle}>
                <div style={textColumnStyle}>
                    <h1>{title}</h1>
                    {description ? <div>{description}</div> : "Bližší informace k tomuto filmu nejsou dostupné."
                    }
                    <div style={additionalInfoStyle}>
                        <div>
                            Průměrné hodnocení: {vote}
                        </div>
                        <div>
                            Datum vydání: {release}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}