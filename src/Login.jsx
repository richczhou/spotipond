import { useState, useEffect, useRef } from 'react'
import './App.css'
import './Login.css'

window.danceability = 0.5;
window.energy = 0.5;
window.speechiness = 0.5;
window.tempo = 90.0;
window.valence = 0.5;
window.fresh = true; // false if you want all songs, true if you want only 10
window.privUserToken = 'BQBiN_QGKp5KL9a0RTobeT8nMgaZr9ZeM_C0Lv3XF0DqNKiZrDrdRoJKbBrf3zsFCnX0KIjLRn8JXICQf6zEQvDdjph4yYRJtbPqbHWAd22rOEvvoPm_ZKelTU5uHZVCpWHu5iXg8cYk3T0Jlek--IGMhpe-HwnJkVhzKy8jD1kucLzEyobOouagN263';
window.privSongToken = 'BQDhNwNaSp_Usd3xZWFBH0XePagt_1RKEtFHqS11PUpfSCxipC9y5B9c0nteYJm1rKiwzd6aUBDHXZQYy49HT_66wKsDnNg7ed01Bbb02J1LTq_CcpWGeJA9OGzPcH7OiNfpAP39YHcxCiE8dqhvS1vi8H-EmyGBITQjSMaAcxF0';
window.privPlaylistToken = 'BQBvGHyEO6ltYa4p2B0gjW5xMnwdL5KYbAcJgBCPPKPG344p0PcdmdludF4FwmmuzjJiJvqdSa-Um1ZQyigxxZr-8Mg03M3ZvJWQTFndiVHY_5q61nToyDWjEtyAu4xucdfwcElA5w6wycHeUTnKoMYtVAAtOU4Iz8bXHPlaogJoV5NHaWehvi3l9Pd36Vz64CUetCs8Jz2RaiU-vs34RPs6qktTHsDbcaWtvsvQ8A';

function Login() {
    const CLIENT_ID = "a56551db3f5d4df7b05e7efa31394e98"
    const REDIRECT_URI = "http://localhost:5173/callback"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [songs, setSongs] = useState([])
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
            headers: { 'Authorization' : 'Bearer ' + window.privUserToken},
        });
        const user = await result.json();
        return user.id;
    }

    async function getSongs(n) {
        var recomURL = `${'https://api.spotify.com/v1/recommendations?limit='}${n}${'&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA'}${'&target_danceability='}${window.danceability}${'&target_energy='}${window.energy}${'&target_speechiness='}${window.speechiness}${'&target_tempo='}${window.tempo}${'&target_valence='}${window.valence}`
        const result = await fetch(recomURL, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + window.privSongToken},
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
        if (token) {
            getUser().then(
                async function (id) {
                    var playlistUrl = `${'https://api.spotify.com/v1/users/'}${id}${'/playlists'}`

                    const result = await fetch(playlistUrl, {
                    method: 'POST',
                    headers: { 'Authorization' : 'Bearer ' + window.privPlaylistToken},
                    body: JSON.stringify({
                        name: "spotipond finds v8",
                        description: "here are your fresh finds",
                        public: false,
                      }),                 
                    })

                    const data = await result.json();
                    // console.log(data);
                    playlistId.current = data.id;
                    const songUri = parseSongs();

                    var addSongsUrl = `${'https://api.spotify.com/v1/playlists/'}${playlistId.current}${'/'}`

                    const result2 = await fetch(addSongsUrl + songUri, {
                    method: 'POST',
                    headers: { 'Authorization' : 'Bearer ' + window.privPlaylistToken},                
                    })

                    const data2 = await result2.json();
                },
                (e) => {
                  console.error(e); 
                },
            );
        }
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
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
                    </>
                }
        </div>
    );
}

export default Login;