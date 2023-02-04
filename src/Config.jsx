const spotify = {
    danceability: 0.5,
    energy: 0.5,
    speechiness: 0.5,
    tempo: 90.0,
    valence: 0.5,
    fresh: true, // false if you want all songs, true if you want only 10
    privUserToken: 'BQBiN_QGKp5KL9a0RTobeT8nMgaZr9ZeM_C0Lv3XF0DqNKiZrDrdRoJKbBrf3zsFCnX0KIjLRn8JXICQf6zEQvDdjph4yYRJtbPqbHWAd22rOEvvoPm_ZKelTU5uHZVCpWHu5iXg8cYk3T0Jlek--IGMhpe-HwnJkVhzKy8jD1kucLzEyobOouagN263',
    privSongToken: 'BQDhNwNaSp_Usd3xZWFBH0XePagt_1RKEtFHqS11PUpfSCxipC9y5B9c0nteYJm1rKiwzd6aUBDHXZQYy49HT_66wKsDnNg7ed01Bbb02J1LTq_CcpWGeJA9OGzPcH7OiNfpAP39YHcxCiE8dqhvS1vi8H-EmyGBITQjSMaAcxF0',
    privPlaylistToken: 'BQBvGHyEO6ltYa4p2B0gjW5xMnwdL5KYbAcJgBCPPKPG344p0PcdmdludF4FwmmuzjJiJvqdSa-Um1ZQyigxxZr-8Mg03M3ZvJWQTFndiVHY_5q61nToyDWjEtyAu4xucdfwcElA5w6wycHeUTnKoMYtVAAtOU4Iz8bXHPlaogJoV5NHaWehvi3l9Pd36Vz64CUetCs8Jz2RaiU-vs34RPs6qktTHsDbcaWtvsvQ8A',
    clientId: 'a56551db3f5d4df7b05e7efa31394e98',
    redirectUrl: 'http://localhost:5173/callback',

}

/* props
name: string
rarity: string
img: string (url)
song: string (url)
moreLikeThis: string (url)
likes: string
traits: string
seenBy: [string (url)]
*/

const fishes = {
    name: "Gerald",
    rarity: "Super Rare",
    img: "https://cdn.pixabay.com/photo/2016/12/31/21/22/discus-fish-1943755__340.jpg",
    song: "song url",
    likes: "rap, dancing",
    traits: "high energy"
}

export { spotify, fishes };
