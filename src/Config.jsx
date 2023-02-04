const spotify = {
    danceability: 0.5,
    energy: 0.5,
    speechiness: 0.5,
    tempo: 90.0,
    valence: 0.5,
    fresh: true, // false if you want all songs, true if you want only 10
    privUserToken: 'BQDe-_T9vPcbuF-jSPykjh1sC75x3kB25AsUncxvaDfaxNdrOr3n7nrkM80PsMeeHxyDOL3Hcgk6r6_Aq6oFBVm6VkVJwZVOrDarMJVvQPvRoYaKyc7PCvv11m1mHb7ECa5q39hStS5qYn2BNP6y2Rae--hsExIpnV3YbDiDXnfzuzDRvAy4DDPJkapIBg',
    privSongToken: 'BQBJmS79Ym8ibVI6NfOUePvIZDWqBCYG8iftGMEE0uehR_EurRQIMnSAaIsXB8jtvsQQYaRCawBEgE4TxsZC-yoON2WUiDx8LUy_wVraDKZAgtIcguFos_GlOXN6EAeQq-PQvERFsLyFMObt9x5gXJ1Rbp2IiVDJ89UE-LzKt6yctg',
    privPlaylistToken: 'BQC7naaMHzb8VeEUpMLoVL4NEZ0jOLL_-MslfFVlcCoJlL7h_M2IqNvtnf9Zk7YNLiwQe_-1BJJK92n3DXjtjwjFE_xFxMJneTDouG4DFbppfdOhGdCeyKorZrV-BzY8jR71P_wEZnA187GDkVs6M6Magf0bn0MpxOOi8nl8mu0eyVO7bWnXSRbMwXJ1QwJ3Plyj69_kzFNRm0fHZD6GlJJdh52U-ERLHtMyXSiK_RM',
    clientId: 'a56551db3f5d4df7b05e7efa31394e98',
    redirectUrl: 'http://localhost:5173/gallery',
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
}

export { spotify };
