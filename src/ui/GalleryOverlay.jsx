function GalleryOverlay() {
    return (
    <div className="overlay">
        <div id="gallery-container" >
            <h2 style={{
                color: "var(--spotify-dark)",
                width: '40vw',
                textAlign: 'center',
            }}>
                What type of experience are you looking for?
            </h2>
            <button className="spotify-button">
                get some gallery
            </button>
        </div>
    </div>
    )
}

export default GalleryOverlay;
