function LoginOverlay() {
    return (
    <div className="overlay">
        <div id="hero-container" >
            <h1 style={{
                color: "var(--spotify-light)",
                textAlign: 'center'
            }}>
                SpotiPond
            </h1>
            <button className="spotify-button">
                Dive into new your taste
            </button>
        </div>
    </div>
    )
}

export default LoginOverlay;
