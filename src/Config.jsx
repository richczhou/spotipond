const spotify = {
    danceability: 0.5,
    energy: 0.5,
    speechiness: 0.5,
    tempo: 90.0,
    valence: 0.5,
    fresh: true, // false if you want all songs, true if you want only 10
    privUserToken: 'BQAqwbRHxytFYpmakIxqvDEeZaT6r3_MyydWNJSY0VhCvtpHdBVTJsbNc-BN3k9NjBk3y4nLB575aaExft8mSQ_Nd_Me4ou5gKKCZnRar8XaxRcDmTLkG8NPKhL0HnRL0A60IeCIxpksgWjH3kDcD-mhR6FMzzzLRiiwZy3wmGc2YqQQSoV9cX498aQX6g',
    privSongToken: 'BQBL4a0x56ae7Hq_dmZM5O3jU_nWOUI-DG2T7HL8IIAakeJDrvMIAR-DBW7VtjdTPsH6PLAxw7N72z9qIbxY3y9t3nRMujPmyg0awgqzwhiQu7zHGbitAv7OhqpxaBX3DNndGqCzY9tTHLgnZqYrSM41hu6wq8bxfvVSJEPpp6kypw',
    privPlaylistToken: 'BQCeDwVXKzDXQxQRtR4QOumiKpLsDlWf_J_a_yc4WFpWRD6JBQ_87tuxD0x6HyQtjsowID6vP3yb4Kx_nxvVGGphc0Sx1cPizVA_jD_03jRK5v9s5Sy53rhvmHFzYmx9u5WncdSMOLtpuWEaNTVGCJNCWwlgN0U1IQAxTgSpVUXp-sC35P8BWlqtBqOireX2dqFPYStqgtP-_mtacU5DUeqNG3vxH9Q-rNuF3CKgO64',
    clientId: 'a56551db3f5d4df7b05e7efa31394e98',
    redirectUrl: 'http://localhost:5173/gallery',
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
}

export { spotify };
