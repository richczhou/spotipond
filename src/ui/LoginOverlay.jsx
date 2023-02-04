import { spotify } from '../Config';

function onClick() {
    window.location = `${spotify.AUTH_ENDPOINT}?client_id=${spotify.clientId}&redirect_uri=${spotify.redirectUrl}&response_type=${spotify.RESPONSE_TYPE}`;    
}

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
            <button className="spotify-button" onClick={onClick}>
                Dive into your new taste
            </button>
        </div>
    </div>
    )
}

export default LoginOverlay;
