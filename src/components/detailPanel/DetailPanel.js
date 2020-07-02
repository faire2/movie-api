import React, {useContext, useState} from "react";
import {ApiContext} from "../ApiContext";
import {ImgSize, Medium} from "../../enums";
import {ReactShakaWrapper} from "../player/ReactShakaWrapper";
import {FancyButton} from "../FancyButton";
import { Scrollbars } from 'react-custom-scrollbars';
import {getFormattedDate} from "../functions/getFormattedDate";

export default function DetailPanel() {
    const [showPlayer, setShowPlayer] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const apiContext = useContext(ApiContext);
    const detailData = apiContext.detailData;
    const videoRef = React.useRef(null);

    const title = detailData.title ? detailData.title : detailData.name;
    const description = detailData.overview ? detailData.overview : "Bližší informace nejsou momentálně k dispozici.";
    const vote = detailData.vote_average;
    const release = detailData.release_date ? detailData.release_date : detailData.first_air_date;
    const backDropImgSrc = Medium.IMG + ImgSize.LARGE + detailData.backdrop_path;

    const containerStyle = {
        position: "fixed",
        width: "80vw",
        maxWidth: 780,
        height: "70vh",
        backgroundColor: "#0a181c",
        // ensures the carousels' items are clickable
        borderRadius: "0.4vw",
        transition: "1s",
        color: "#d9d9d9",
        display: "flex",
        flexFlow: "row",
        backgroundImage: `url(${backDropImgSrc})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: 2,
    };

    const textColumnStyle = {
        width: "30%",
        height: "100%",
        paddingLeft: "3vw",
        marginBottom: "7vh",
        top: 0,
    };

    // the background image is covered with a gradient overlay which serves as a text backdrop
    const gradientStyle = {
        background: "linear-gradient(90deg, rgba(0,0,0,1) 33%, rgba(255,255,255,0) 71%, rgba(255,255,255,0) 100%)",
        width: "100%",
        minHeight: "20vh",
        zIndex: 2,
        display: "flex",
        flexFlow: "row"
    };

    // definition of text limits complemented with scrollbar
    const scrollbarStyle = {
        width: "100%",
        height: "58%"
    };

    // additional information are contained in a container at the bottom of the panel
    const additionalInfoStyle = {
        position: "absolute",
        top: "85%",
    };

    // player element is position on top of background image when not full-screen
    // display value ensures that player starts full-screen after loading the video
    const playerStyle = {
        left: "35%",
        display: videoLoaded ? "block" : "none",
    };

    function handleOnClick() {
        setShowPlayer(true);
    }


    return (
        <div style={containerStyle}>
            <div style={gradientStyle}>
                <div style={textColumnStyle}>
                    <h1>{title}</h1>
                    {description ? <div style={{height: "100%"}}>
                        <Scrollbars style={scrollbarStyle}>
                        {description}
                        </Scrollbars>
                    </div> : "Bližší informace nejsou dostupné."
                    }
                    <div style={additionalInfoStyle}>
                        <div>
                            Průměrné hodnocení: {vote}
                        </div>
                        <div>
                            Datum vydání: {getFormattedDate(release)}
                        </div>
                        <FancyButton text={"Přehrát video"} onClick={handleOnClick}/>
                    </div>
                </div>
                <div style={playerStyle}>
                    {showPlayer && <ReactShakaWrapper ref={videoRef} setVideoLoaded={setVideoLoaded}/>}
                </div>
            </div>
        </div>
    )
}