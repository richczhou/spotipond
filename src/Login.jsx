import { useState, useEffect, useBool } from 'react'
import './App.css'
import './Login.css'

window.danceability = 0.5;
window.energy = 0.5;
window.speechiness = 0.5;
window.tempo = 90.0;
window.valence = 0.5;
window.fresh = true; // false if you want all songs, true if you want only 10
window.privToken = 'BQDpSTnd9pkORWf9XbDBBzdZHHvUv3sGZNaxHb-4m0nuuutUIomUQJBN6Ws6_y_KyWWOjgEmuaWxwONusZfq0EUKBv-SMNAG0RFPmwvZ9RQJae9SUWA1pKRv3gZWZeF0RLkL9dDW6M5xnDnM9d_9rjTVuvDpasCVgbIEI_grxYPFAg';
window.privPlaylistToken = 'BQCq4uvWlwBkjzId6RoW-RvL7dS040fHaCtcZ-fSW9AgoqjhigQv57Wm4wtoVNDgqC5PXjrjNlCc_Xdm8Rfxv21o_b_4etlDFkiheuFp7WiVBBxoEclDGhFTih2ZdnZ9KvdiKoT_IPhf6EnGjQYaD1CuDp_69WzwU8g-6VzhsUTeWp23jhvfWySfRpOXMhdtvorYLXnFO98Vw25u1MAGXYqrLZ8teTtW-XzJT54tz-Q';

function Login() {
    const CLIENT_ID = "a56551db3f5d4df7b05e7efa31394e98"
    const REDIRECT_URI = "http://localhost:5173/callback"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [songs, setSongs] = useState([])

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
            headers: { 'Authorization' : 'Bearer ' + window.privToken},
        });
        const user = await result.json();
        return user.id;
    }

    async function getSongs(n) {
        var recomURL = `${'https://api.spotify.com/v1/recommendations?limit='}${n}${'&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA'}${'&target_danceability='}${window.danceability}${'&target_energy='}${window.energy}${'&target_speechiness='}${window.speechiness}${'&target_tempo='}${window.tempo}${'&target_valence='}${window.valence}`
        const result = await fetch(recomURL, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + window.privToken},
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
    
    async function createPlaylist() {
        if (token) {
            getUser().then(
                async function (id) {
                    console.log(id);
                    var playlistUrl = `${'https://api.spotify.com/v1/users/'}${id}${'/playlists'}`

                    const result = await fetch(playlistUrl, {
                    method: 'POST',
                    headers: { 'Authorization' : 'Bearer ' + window.privPlaylistToken},
                    body: JSON.stringify({
                        name: "spotipond finds!!",
                        description: "here are your fresh finds",
                        public: false,
                      }),                 
                    })

                    // const data = result.json();
                    console.log(result);
                },
                (e) => {
                  console.error(e); 
                },
            );
        }
    }

    if (songs.length >= 10) {
        // createPlaylist()
    }

    return (
        <div className="App">
                {token ? 
                    window.fresh ?
                        <>
                            <button onClick={logout}>logout</button>
                            <p>fresh finds (10 songs)</p>
                            { renderSongs(10) }
                        </>
                        :
                        <>
                            <button onClick={logout}>logout</button>
                            <p>rotten finds (70 songs)</p>
                            { renderSongs(70) }
                        </>
                    : 
                    <>
                        <h2>pls login</h2>
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login</a>
                    </>
                }
        </div>
    );
}

export default Login;