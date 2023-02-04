import { useRef, useState } from "react";

function MainOverlay() {
    const [isActive, setActive] = useState(false);
    const [isReady, setReady] = useState(true);
    const playlistRef = useRef();

    function pullUp() {
        if (!isReady) return;
        setReady(false);

        setActive(true);
        // console.log(playlistRef.current)
        // playlistRef.current.style.top = '15%';
        playlistRef.current.animate([
            // keyframes
            { transform: 'translateY(0%)' },
            { transform: 'translateY(-60%)' }
          ], {
            // timing options
            duration: 300,
            iterations: 1
        });
        setTimeout(() => {
            playlistRef.current.style.top = '15%';
        }, 300);  

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
                        onPointerOver={pullUp}
                        onPointerOut={pullDown} />
            </div>
        </div>
    </div>
    )
}

export default MainOverlay;
