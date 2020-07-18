import React, {useContext, useState} from "react";
import {ApiContext} from "../ApiContext";
import {ImgSize, Medium} from "../../enums";
import {ReactShakaWrapper} from "../player/ReactShakaWrapper";
import {FancyButton} from "../fancyButton/FancyButton";
import {Scrollbars} from 'react-custom-scrollbars';
import {getFormattedDate} from "../functions/getFormattedDate";
import {
    AdditionalInfo,
    Center,
    Gradient,
    PanelContainer,
    PlayerWrapper,
    scrollbarStyle,
    TextColumn
} from "./detailPanelStyles";
import {PropagateLoader} from "react-spinners";

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

    function handleOnClick() {
        setShowPlayer(true);
    }

    return (
        <PanelContainer bgrImgSrc={backDropImgSrc}>
            <Gradient>
                <Center>
                    {showPlayer && !videoLoaded &&
                    <PropagateLoader color={"#00b0f1"} loading={true} size={25}/>}
                </Center>
                <TextColumn>
                    <h1>{title}</h1>
                    {description ? <div style={{height: "100%"}}>
                        <Scrollbars style={scrollbarStyle}>
                            {description}
                        </Scrollbars>
                    </div> : "Bližší informace nejsou dostupné."
                    }
                    <AdditionalInfo>
                        <div>
                            Průměrné hodnocení: {vote}
                        </div>
                        <div>
                            Datum vydání: {getFormattedDate(release)}
                        </div>
                        {!showPlayer && <FancyButton text={"Přehrát video"} onClick={handleOnClick}/>}
                    </AdditionalInfo>
                </TextColumn>
                {showPlayer &&
                <PlayerWrapper onClick={() => setShowPlayer(false)} videoLoaded={videoLoaded} showPlayer={showPlayer}>
                    <ReactShakaWrapper ref={videoRef} setVideoLoaded={setVideoLoaded}/>
                </PlayerWrapper>
                }
            </Gradient>
        </PanelContainer>
    )
}