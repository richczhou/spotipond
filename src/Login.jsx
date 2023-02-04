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
window.privPlaylistToken = 'BQAAPJ5J2xVABqxP2xw2X5ln6WvGHszell7lVsezq472IaiQ-tdP-EsGq0efT4o5ti9IMuNUOYV16Pt_w87e2JkKvMOm_nVK2B1cDH6ul4ZkjZAGHU7KLjWloZRDPsT3TNwVIk6x3ziT_1_y7QKNeyKdciC9VCssvJfGWYHJyNS14kNuNMI_pl9Fw6jgPa4q2wAYZAdpPGZrjlhpx7q6-j0vvAWJCVKYtf-U-HJLAV0';

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
                        name: "spotipond finds v7",
                        description: "here are your fresh finds",
                        public: false,
                      }),                 
                    })

                    const data = await result.json();
                    console.log(data);
                    const playlistID = data.id;
                    const songUri = parseSongs();

                    var addSongsUrl = `${'https://api.spotify.com/v1/playlists/'}${playlistID}${'/'}`

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