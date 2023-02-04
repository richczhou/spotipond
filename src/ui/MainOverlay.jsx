import { useRef, useState } from "react";
import FishCard from "./FishCard";

function MainOverlay() {
    const [isActive, setActive] = useState(false);
    const [isReady, setReady] = useState(true);
    const playlistRef = useRef();

    function pullUp() {
        if (!isReady || playlistRef.current.style.top == '15%') return;
        setReady(false);

        setActive(true);
        // console.log(playlistRef.current)
        // playlistRef.current.style.top = '15%';
        playlistRef.current.animate([
            // keyframes
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-500px)' }
          ], {
            // timing options
            duration: 500,
            direction: 'normal',
            easing: "ease-in",
            iterations: 1,
        });
        setTimeout(() => {
            playlistRef.current.style.top = 'calc(75% - 500px)';
        }, 499);  

        setTimeout(() => {
            setReady(true);
        }, 500);  
    }

    function pullDown() {
        setActive(false);

        playlistRef.current.animate([
            // keyframes
            { transform: 'translateY(0%)' },
            { transform: 'translateY(60%)' }
          ], {
            // timing options
            duration: 300,
            iterations: 1
        });
        setTimeout(() => {
            playlistRef.current.style.top = '75%';
        }, 300);  
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
                        onPointerOver={null}
                        onPointerOut={null} />
            </div>
            <FishCard />
        </div>
    </div>
    )
}

export default MainOverlay;
