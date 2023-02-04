import { useState } from "react";

function MainOverlay() {
    const [isActive, setActive] = useState(0);

    return (
    <div className="overlay">
        <div id="main-overlay">
            <iframe className='playlist'
                    src="https://open.spotify.com/embed/playlist/5OHAlIRtavyClwEDV8cEp9?utm_source=generator"
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    ></iframe>
        </div>
    </div>
    )
}

export default MainOverlay;
