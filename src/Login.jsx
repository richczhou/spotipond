import { useState, useEffect, useRef } from 'react';
import './App.css';
import './Login.css';
import { spotify } from './Config';


function Login() {
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("");
    const [songs, setSongs] = useState([]);
    const playlistId = useRef("");

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    async function getUser() {
        const result = await fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + spotify.privUserToken},
        });
        const user = await result.json();
        return user.id;
    }

    async function getSongs(n) {
        var recomURL = `${'https://api.spotify.com/v1/recommendations?limit='}${n}${'&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA'}${'&target_danceability='}${spotify.danceability}${'&target_energy='}${spotify.energy}${'&target_speechiness='}${spotify.speechiness}${'&target_tempo='}${spotify.tempo}${'&target_valence='}${spotify.valence}`
        const result = await fetch(recomURL, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + spotify.privSongToken},
        })
        const data = await result.json()

        let recomSongs = []

        for (let i = 0; i < data.tracks.length; i++) {
            const arrayIndex = data.tracks[i]
            const newSong = {
                "title": arrayIndex.name,
                "artist": arrayIndex.artists[0].name,
                "id": arrayIndex.id
            }
            recomSongs.push(newSong)
        }
        setSongs(recomSongs) // i hate state >:(
    }

    function renderSongs(n) {
        if (!songs.length) getSongs(n);
        return songs.map(s => (
            <div key={s.title}>
                {s.title} - {s.artist}
            </div>
        ))
    }

    function parseSongs() {
        const prefix = "spotify%3Atrack%3A";
        const suffix = "%2C";
        var songUri = "tracks?uris=";
        if (songs.length) {
            for (let i = 0; i < songs.length; i++) {
                const song = songs[i]
                songUri += (prefix + song.id + suffix)
            }
        }
        return songUri;
    }

    async function createPlaylist() {
        // if (token) {
        //     getUser().then(
        //         async function (id) {
        //             var playlistUrl = `${'https://api.spotify.com/v1/users/'}${id}${'/playlists'}`

        //             const result = await fetch(playlistUrl, {
        //             method: 'POST',
        //             headers: { 'Authorization' : 'Bearer ' + spotify.privPlaylistToken},
        //             body: JSON.stringify({
        //                 name: "spotipond finds v8",
        //                 description: "here are your fresh finds",
        //                 public: false,
        //               }),                 
        //             })

        //             const data = await result.json();
        //             // console.log(data);
        //             playlistId.current = data.id;
        //             const songUri = parseSongs();

        //             var addSongsUrl = `${'https://api.spotify.com/v1/playlists/'}${playlistId.current}${'/'}`

        //             const result2 = await fetch(addSongsUrl + songUri, {
        //             method: 'POST',
        //             headers: { 'Authorization' : 'Bearer ' + spotify.privPlaylistToken},                
        //             })

        //             const data2 = await result2.json();
        //         },
        //         (e) => {
        //           console.error(e); 
        //         },
        //     );
        // }
        playlistId.current = '3TAWFddAhxONhW6o2OVYuW';
    }

    if (songs.length >= 10) {
        createPlaylist()
    }

    const iframeSrc = "https://open.spotify.com/embed/playlist/" + playlistId.current + "?utm_source=generator"

    return (
        <div className="App">
                {token ? 
                    window.fresh ?
                        <>
                            <button onClick={logout}>Logout</button>
                            <p>Fresh Finds (10 songs)</p>
                            { renderSongs(10) }
                            <iframe
                                src={iframeSrc}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy">
                            </iframe>
                        </>
                        :
                        <>
                            <button onClick={logout}>Logout</button>
                            <p>Rotten Finds (70 songs)</p>
                            { renderSongs(70) }
                            <iframe
                                src={iframeSrc}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy">
                            </iframe>
                        </>
                    : 
                    <>
                        <h2>Please login to enable experience</h2>
                        <a href={`${AUTH_ENDPOINT}?client_id=${spotify.clientId}&redirect_uri=${spotify.redirectUrl}&response_type=${RESPONSE_TYPE}`}>Login</a>
                    </>
                }
        </div>
    );
}

export default Login;