import 'shaka-player/dist/controls.css';
import muxjs from "mux.js";
import shaka from "shaka-player"
import * as React from "react";
import {forwardRef, useEffect} from "react";

export const ReactShakaWrapper = forwardRef((props, ref) => {
    window.muxjs = muxjs;
    const isBrowserSupported = shaka.Player.isBrowserSupported();
    shaka.polyfill.installAll();

    useEffect(() => {
            let mounted = true;
            let player = new shaka.Player(ref.current);
            window[player] = player;
            if (player) {
                player.addEventListener("error", evt => console.error(evt));
            }

            async function loadVideo() {
                if (isBrowserSupported) {
                    try {
                        if (mounted) {
                            await player.load('https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8');
                            props.setVideoLoaded(true);
                            try {
                                ref.current.requestFullscreen();
                            } catch (e) {
                                console.error(e)
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            loadVideo();
            return async () => {
                mounted = false;
                await player.destroy();
            }
        }
    , []);

    return (
        <video
            ref={ref}
            width="50%"
            height="30%"
            controls
            autoPlay
        />
    )
});