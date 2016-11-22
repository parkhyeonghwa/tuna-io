import React, { Component } from 'react';
import videojs from 'video.js';
import overlay from 'videojs-overlay';

// TODO: prevent errors if there is no transcript
// TODO: remove duplicate code in upload
class VideoDetails extends Component {
  constructor(props) {
    super(props);

    // Initialize state in constructor
    this.state = {
      currentVideoId: props.params.videoId,
      currentVideoDetails: null,

      // Transcript format: [{'word': 'coming', 'time': 1}, {'word': 'soon', 'time': 2}]
      transcript: [],
      query: '',
      searchResults: [],
      currentTime: 24,
    };


    this.myVideo;
    this.myPlayer;

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.findTime = this.findTime.bind(this);
    this.myVideo;
    // Fetch initial video data. This is only called once
    this.fetchVideoFromAPI(props.params.videoId);
  }

  // Upon going to a different video details page, fetch video data
  componentWillReceiveProps(nextProps) {
    this.fetchVideoFromAPI(nextProps.params.videoId);
  }

  // Helper function to fetch video data
  fetchVideoFromAPI(videoId) {
    const url = `http://127.0.0.1:3000/api/videos/${videoId}`;
    const options = {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    };
    const request = new Request(url, options);

    fetch(request)
    .then(response => response.json())
    .then((jsonResponse) => {
      this.setState({ currentVideoDetails: jsonResponse });
      var transcript = JSON.parse(jsonResponse.transcript);
      this.saveTranscript(transcript);
    })
    .catch((err) => {
      console.log('Error fetching video with ID', videoId, err);
    });
  }

  // save transcript words and times
  saveTranscript(transcript) {
    const newTranscript = [];

    transcript.Words.forEach(word =>
      newTranscript.push({ 
        word: word.Token,
        starttime: word.Begin,
        endtime: word.End
      })
    );

    this.setState({
      transcript: newTranscript,
    });
  }

  handleChange(event) {
    // Retrieve checkbox data using event.target.checked
    const value = event.target.name === 'private' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value });
  }

  search(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/api/videos/search/" + this.state.currentVideoDetails.hash + "/" + this.state.query, {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then((newSearchResults) => {
      this.setState({
        searchResults: newSearchResults,
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
  }


  findTime(time, event) {
    this.myVideo.currentTime = time;
  }

  // Transcript is rendered after server-side transcription
  renderTranscript() {
    return (
      <div>
        <h3>Transcript: </h3>
        {this.state.transcript.length ? (
          <div>
            {this.state.transcript.map(pair => pair.word).reduce((firstword, secondword) => `${firstword} ${secondword}`)}
          </div>
          ) : null
        }
      </div>
    );
  }

  renderSearchForm() {
    if (this.state.transcript.length) {
      return (
        <form onSubmit={this.search}>
          Search:
          <input type="text" name="query" onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
    return null;
  }

  renderSearchResults() {
    if (this.state.transcript.length) {
      return (
        <div>
          <div> Search results: </div>
          <div>
            {this.state.searchResults ? (this.state.searchResults.map((i)=> {
              return (
                <button onClick={
                  this.findTime.bind(this, this.state.transcript[i].endtime)}>
                  {
                    Math.floor(this.state.transcript[i].endtime / 60) + ":" +
                    this.state.transcript[i].endtime % 60 + '--' +
                    this.state.transcript.slice(Math.max(i - 4, 0),
                    Math.min(i + 5, this.state.transcript.length))
                    .map(pair => pair.word)
                    .reduce((fword, sword) => {
                      return `${fword} ${sword}`
                    })
                  }
                </button>
              )
            })) : null }
          </div>
        </div>
      );
    }
    return null;
  }

  loadVideoJS(input) {
    videojs(document.getElementById('my-video'), {}, () => {
      this.myVideo = input;
      this.myPlayer = this;
    });
  }

  generateOverlay() {
    this.myPlayer.overlay({
      overlays: [{
        content: 'HELLO TEST TEST',
        start: 3,
        end: 15,
        align: 'bottom'
      }]
    });
  }

  render() {
    if (this.state.currentVideoDetails) {
      console.log(this.state.currentVideoDetails);

      return (
        <div>
          <h1>{this.state.currentVideoDetails.title}</h1>
          <div>
            <video ref={(input) => this.loadVideoJS(input)} id="my-video"
              className="video-js vjs-sublime-skin" controls preload="auto"
              width="640" height="264" poster="" data-setup="{}"
              src={this.state.currentVideoDetails.url} type="video/webm" />
            <button onClick={this.generateOverlay}> CLICK ME </button>
          </div>
          <div>Creator: {this.state.currentVideoDetails.creator}</div>
          <div>Uploaded: {this.state.currentVideoDetails.timestamp}</div>
          <div>Description: {this.state.currentVideoDetails.description}</div>
          <div>Extension: {this.state.currentVideoDetails.extension}</div>
          <div>Views: {this.state.currentVideoDetails.views}</div>
          <div>Likes: {this.state.currentVideoDetails.likes}</div>
          <div>Dislikes: {this.state.currentVideoDetails.dislikes}</div>
          <div>Private: {this.state.currentVideoDetails.private}</div>
          {
            this.renderTranscript()
          }
          {
            this.renderSearchForm()
          }
          {
            this.renderSearchResults()
          }
        </div>
      );
    } else {
      return (<div />);
    }
  }
}

export default VideoDetails;
