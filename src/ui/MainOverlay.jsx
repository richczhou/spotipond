import { useRef, useState } from "react";
import { spotify } from '../Config';
import FishCard from "./FishCard";

function MainOverlay() {
    const [isActive, setActive] = useState(false);
    const [isReady, setReady] = useState(true);
    const playlistRef = useRef();
    const [songs, setSongs] = useState([]);
    const playlistId = useRef("");

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
        getUser().then(
            async function (id) {
                var playlistUrl = `${'https://api.spotify.com/v1/users/'}${id}${'/playlists'}`

                const result = await fetch(playlistUrl, {
                method: 'POST',
                headers: { 'Authorization' : 'Bearer ' + spotify.privPlaylistToken},
                body: JSON.stringify({
                    name: "spotipond finds v10",
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
                headers: { 'Authorization' : 'Bearer ' + spotify.privPlaylistToken},                
                })

                const data2 = await result2.json();
            },
            (e) => {
                console.error(e); 
            },
        );
    }

    if (spotify.fresh) {
        renderSongs(10)
    }
    else {
        renderSongs(70)
    }
    
    if (songs.length >= 10) {
        // createPlaylist()
    }
    
    // const iframeSrc = "https://open.spotify.com/embed/playlist/" + playlistId.current + "?utm_source=generator";
    const iframeSrc = "https://open.spotify.com/embed/playlist/5OHAlIRtavyClwEDV8cEp9?utm_source=generator";
    
    function pullUp() {
        if (!isReady || playlistRef.current.style.top == '15%') return;
        setReady(false);

        setActive(true);
        // console.log(playlistRef.current)
        // playlistRef.current.style.top = '15%';
        playlistRef.current.animate([
            // keyframes
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-500px)' }
          ], {
            // timing options
            duration: 500,
            direction: 'normal',
            easing: "ease-in",
            iterations: 1,
        });
        setTimeout(() => {
            playlistRef.current.style.top = 'calc(75% - 500px)';
        }, 499);  

        setTimeout(() => {
            setReady(true);
        }, 500);  
    }

    function pullDown() {
        setActive(false);

        playlistRef.current.animate([
            // keyframes
            { transform: 'translateY(0%)' },
            { transform: 'translateY(60%)' }
          ], {
            // timing options
            duration: 300,
            iterations: 1
        });
        setTimeout(() => {
            playlistRef.current.style.top = '75%';
        }, 300);  
    }

    return (
    <div className="overlay">
        <div id="main-overlay">
            <div className="playlist" 
                 ref={playlistRef}>
                <iframe src={iframeSrc}
                        frameBorder={0} 
                        allowFullScreen={0} 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy" 
                        onPointerOver={null}
                        onPointerOut={null} />
            </div>
            <FishCard />
        </div>
    </div>
    )
}

export default MainOverlay;
