## Jukebox - Audio Player

You're going to build a small online Jukebox to play songs!

### Setup some songs

Below you will find 4 songs as `mp3` files that you can use. Download them to your computer and put the songs in the `public` folder of your React app, in a new folder called `songs`.

**Check that it works:** Go to `https://localhost:3000/songs/fantasy-classical.mp3` to check that the mp3 file is there and available (you should be able to play it in the browser). Otherwise you'll get errors when the Audio doesn't load later on.

### `Jukebox` component

Once you have set up the music files, create a new component called `Jukebox`.

Here's the code for the Jukebox. Try to figure out when the `AudioPlayer` component will mount, update and unmount.

```js
class Jukebox extends Component {

  state = {
    song: ''
  }

  chooseSong = (song) => {
    this.setState({song: song})
  }

  render() {
    return <div>
      <h1>Jukebox</h1>
      <p><button onClick={() => this.chooseSong('')}>Disable Audio</button></p>
      <span>Play song: </span>
      <button onClick={() => this.chooseSong('/songs/fantasy-classical.mp3')}>Fantasy Classical</button>
      <button onClick={() => this.chooseSong('/songs/gates-of-heaven.mp3')}>Gates of Heaven</button>
      <button onClick={() => this.chooseSong('/songs/grand-orchestra.mp3')}>Grand Orchestra</button>
      <button onClick={() => this.chooseSong('/songs/piano-song.mp3')}>Piano Song</button>
      
      { this.state.song === '' ? <p>Audio disabled</p> : <AudioPlayer audioURL={this.state.song}/> }
    </div>
  }
}
```

### `AudioPlayer` component

This is where the magic happens! Your job is to implement this `AudioPlayer` component so that it does the following:

- When the component is mounted, it loads the given song and starts playing the music.
- When the component props update to a new song, it plays the new song (stopping any song that was playing).
- When the comopnent unmounts, it stops playing the song.

You also need to make the Play/Pause button work.
 - If a song is playing the button should be a `Pause` button, otherwise it should be a `Play` button to start the music.
 - When the `Pause` button is pressed, the music should stop playing.
 - When the `Play` button is pressed, play the music should continue playing.

Here's some starting code for the `AudioPlayer` component:

```js
class AudioPlayer extends Component {
  state = {
    status: "paused",
  };

  render() {
    return (
      <div>
        <p>Playing {this.props.audioURL}</p>
        <button>Pause</button>
      </div>
    );
  }
}
```

Here's an example of how to play audio from JavaScript:
```js
url = "/sounds/fantasy-classical.mp3";

// Load the song, and set it automatically start playing once it is loaded.
const audioElement = new Audio(url);
audioElement.autoplay = true;

// Play the song
audioElement.play();

// Pause or stop the song
audioElement.pause();
```

### Check it all works!

Make sure that when using your Jukebox that it does the following:

- Start playing a song, and then click the button for _a different song_. They should not both be playing at the same time.
- Start playing a song, and then click the button for _the same song_. The song should keep playing, it should not stop and start from the beginning.
- Start playing a song, then click `Disable Audio`. The song should stop playing.
- Start playing a song, then pause it. If you click `Play` again, it should start where it was up to. The song should not start again from the beginning.

### Extensions

Read the [MDN Documentation for Audio](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio).

#### Detect when the song has finished

Currently, when the song gets to the end and finishes playing, it still shows up as playing. Make it so that the song shows up as 'finished' or 'stopped' when it reaches the end.

#### Display progress through the song

The Audio object has a `duration` property and a `currentTime` property. Show these in the UI to see progress through the playback of the song. You will need to use state for the `currentTime` in order to update the display. Use the `timeupdate` event to be notified when the current time (playback position) changes.

#### Seek (extra hard)

Create a UI that lets the user 'seek' to a particular point of the song (perhaps with an `<input type="range">` slider to skip to any part of the song. See the [Input Range Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range).





All music is used with permssion under the Pixabay license: https://pixabay.com/service/license/