import { useState, useEffect, useBool } from 'react'
import './App.css'
import './Login.css'

window.danceability = 0.5;
window.energy = 0.5;
window.speechiness = 0.5;
window.tempo = 90.0;
window.valence = 0.5;
window.fresh = false; // change to false if you want all songs


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

    async function getSongs(n) {
        var token = 'BQC7NpmdoZiz3cdZnZhgcEs9hXcRlxdUD9TGSTzIM5SHUCsmdW78uOVaPljKS8x3SS7U7bgAjlEmnE5XhowByOFRmHp5KOpArBSJR6HX6iVkp7dQMorqXz12l8b3YP1L1fELsbUiYsyYrg6YVVJTkCb_ajFb6nGYY4lftqRDH-q8Cg';
        var recomURL = `${'https://api.spotify.com/v1/recommendations?limit='}${n}${'&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA'}${'&target_danceability='}${window.danceability}${'&target_energy='}${window.energy}${'&target_speechiness='}${window.speechiness}${'&target_tempo='}${window.tempo}${'&target_valence='}${window.valence}`
        const result = await fetch(recomURL, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
        })
        const data = await result.json()

        let recomSongs = []

        for (let i = 0; i < data.tracks.length; i++) {
            const arrayIndex = data.tracks[i]
            const newSong = {
                "title": arrayIndex.name,
                "artist": arrayIndex.artists[0].name
            }
            recomSongs.push(newSong)
        }
        setSongs(recomSongs) // i hate state >:(
    }

    function renderSongs(n) {
        console.log(songs, songs.length)
        if (!songs.length) getSongs(n);
        return songs.map(s => (
            <div key={s.title}>
                {s.title} - {s.artist}
            </div>
        ))
    }

    return (
        <div className="App">
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login
                        </a>
                    : <button onClick={logout}>logout</button>}

                {token ?
                    window.fresh ?
                        <>
                            <p>fresh finds</p>
                            { renderSongs(10) }
                        </>
                        :
                        <>
                            <p>rotten finds</p>
                            { renderSongs(70) }
                        </>
                    : <h2>pls login</h2>
                }
        </div>
    );
}

export default Login;