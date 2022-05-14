import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDataLayerValue } from '../../DataLayer';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function useSpotify() {
    const [{ token }, dispatch] = useDataLayerValue();
    return spotifyApi;
}

export default useSpotify