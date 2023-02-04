import { useState, useEffect, useCallback } from 'react'
import './App.css'
import './Login.css'
import axios from 'axios'


window.danceability = 0.5;
window.energy = 0.5;
window.speechiness = 0.5;
window.tempo = 90.0;
window.valence = 0.5;


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

    async function getSongs() {
        var token = 'BQCSALifVGyy_egp2TC7oWZaoMZlNUYhRAqOBcVLLjT883d9tXLJaRf9QnkvL6LmtokAzMRFB_pOKCBbxc3wmdOrGvCF_o6WOIUyjuh2Q5wGbbLU7Dslf1YrPWBEDnbO75kb5-dqwGwuI6qULjokkZ9CH8Iu62Hd18qUtvKI_DyLTg';
        var recomURL = `${'https://api.spotify.com/v1/recommendations?limit=3&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA'}${'&target_danceability='}${window.danceability}${'&target_energy='}${window.energy}${'&target_speechiness='}${window.speechiness}${'&target_tempo='}${window.tempo}${'&target_valence='}${window.valence}`
        const result = await fetch(recomURL, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
        })
        const data = await result.json()
        // console.log(data)

        let recomSongs = []

        for (let i = 0; i < data.tracks.length; i++) {
            const arrayIndex = data.tracks[i]
            const newSong = {
                "title": arrayIndex.name,
                "artist": arrayIndex.artists[0].name
            }
            recomSongs.push(newSong)
        }
        setSongs(recomSongs)
        // console.log(recomSongs)
    }

    function renderSongs () {
        // console.log(songs)
        if (songs.length < 1) getSongs();
        getSongs()
        return songs.map(s => (
            <div key={s.title}>
                {s.title} - {s.artist}
            </div>
        ))
    }

    return (
        <div className="App">
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

                {token ?
                    <>
                    { renderSongs() }
                    <p>these are the user's recommended songs</p>
                    </>
                    : <h2>pls login</h2>
                }      
        </div>
    );
}

export default Login;