import { useRef, useState } from "react";

function MainOverlay() {
    const [isActive, setActive] = useState(false);
    const playlistRef = useRef();
    let isReady = true;

    function pullUp() {
        setActive(true);
        // console.log(playlistRef.current)
        playlistRef.current.style.top = '75%';
    }

    function pullDown() {
        setActive(false);
        playlistRef.current.style.top = '15%';
    }

    return (
    <div className="overlay">
        <div id="main-overlay">
            <div className="playlist" 
                 ref={playlistRef} >
                <iframe src="https://open.spotify.com/embed/playlist/5OHAlIRtavyClwEDV8cEp9?utm_source=generator"
                        frameBorder={0} 
                        allowFullScreen={0} 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy" 
                        onPointerOver={pullUp}
                        onPointerOut={pullDown} />
            </div>
        </div>
    </div>
    )
}

export default MainOverlay;
