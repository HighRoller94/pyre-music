export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    playingTrack: null,
    item: null,
    top_artists: null,
    spotify: null,
};

const reducer = (state, action) => {  
    console.log(action)
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state, 
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state, 
                token: action.accessToken
            }
        case 'SET_PLAYING_TRACK':
            return {
                ...state, 
                playingTrack: action.playingTrack
            }
        case 'SET_PLAYING_ARTIST':
            return {
                ...state, 
                playingArtist: action.playingArtist
            }
        case 'SET_PLAYING':
            return {
                ...state, 
                playing: action.playing
            }
        case 'SET_LYRICS':
            return {
                ...state, 
                lyrics: action.lyrics
            }
        default:
            return state;
    }
}

export default reducer;
