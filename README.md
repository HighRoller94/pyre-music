
# React Music Player App

### [Link to live site](https://pyre-2e47e.web.app/)

### For the time being the app is not completely open to the public, so for testing purposes please use the credentials below!
 
Email: pyretest@gmail.com
Pass: pyretest123

- Music player app built with React with a simple dashboard layout that allows users to log in (through Spotify) and listen to their favourite music 

Allows users to search Spotify via API
  - Search through music
  - Users can view artists, albums, playlists and other spotify accounts
- Returns latest tracks played, most played artists and more using the spotify web api node wrapper!

- Users can also favourite playlists, albums and artists 
- Pyre uses the Spotify API for authentication
  - Auth handled via an express backend running via Firebase functions

Users can create and edit playlists through Pyre (though no endpoint for deletion - search through Spotifys massive database of music and create playlists.
Pyre utilises react router to switch between components that are invidually seperated with own SASS styles

### Libraries used -

- Axios
- React Router Dom v6
- Spotify Web API Node
- React Spotify Web Playback
- Material UI Core + Icons
- Node SASS (for SASS implementation)

### Hosting
- Both frontend and backend hosted via Firebase
- Express server that deals with authentication used as a firebase function
