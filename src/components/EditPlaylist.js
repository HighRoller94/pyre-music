import React, { useEffect, useState, useRef } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

import noImage from '../assets/images/noImage.jpg'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        background: 'none'
    },
}));

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function EditPlaylist({ updatePlaylist, open, info, setOpen, accessToken }) {
    const classes = useStyles()
    const hiddenFileInput = useRef()
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [playlistImage, setPlaylistImage] = useState()
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [])

    const handleClose = () => {
        setOpen(false);
        setPreview('');
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPlaylistImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        // Sets the image preview (if one is found)
        if (playlistImage) {
            const reader = new FileReader();
            reader.readAsDataURL(playlistImage);
            reader.onloadend = () => {
                setPreview(reader.result);
            };
        } else {
            setPreview(null);
        }
    }, [playlistImage]);
    
    const uploadImage = (e) => {
        if (preview) {
            spotifyApi.uploadCustomPlaylistCoverImage(`${info.body.id}`, preview)
            .then(function(data) {
                console.log('Playlist cover image uploaded!');
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }
    }

    const setPlaylistDetails = (e) => {
        spotifyApi.changePlaylistDetails(`${info.body.id}`,
        {
            name: name || info.body.name || '',
            description: details || info.body.description || '',
        }).then(function(data) {
            console.log('Playlist details updated');
            setOpen(false)
            updatePlaylist();
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    return (
        <div>
            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <div className="edit__modal">
                        <h1>Edit Playlist</h1>
                        <div className="edit__details">
                            <div className="edit__image">
                                {preview ? (
                                    <img src={preview} alt="" onClick={e => hiddenFileInput.current.click()} />
                                ) : (
                                    <div>
                                        {info?.body.images[0]?.url ? (
                                            <img src={info?.body.images[0]?.url} alt="" onClick={e => hiddenFileInput.current.click()} />
                                        ) : (
                                            <img src={noImage} alt="" onClick={e => hiddenFileInput.current.click()} />
                                        )}
                                    </div>
                                )}
                                <input 
                                    type="file" 
                                    style={{ display: "none"}} 
                                    ref={hiddenFileInput} 
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit__info">
                                <input type="text" placeholder={info?.body.name} value={name} onChange={e => setName(e.target.value)} />
                                <textarea rows="8" cols="8" placeholder={info?.body.description} value={details} onChange={e => setDetails(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal__buttons">
                            <p onClick={handleClose} >Delete Playlist</p>
                            <button onClick={() => { uploadImage(); setPlaylistDetails(); }}>Save</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditPlaylist
