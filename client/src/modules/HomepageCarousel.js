import React from 'react';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router';

const vidStyle = {
  textStyle: "none",
};

const vidTextStyle = {
  color: "#0088ee",
  textStyle: "none",
};

const descriptStyle = {
  color: "#e2e2e2",
  textStyle: "none",
  fontSize: "12px",
};

const HomepageCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    const data = this.props.latestVideos.map(video => {
      return {
        thumbnailUrl: video.thumbnail ? JSON.parse(video.thumbnail).DataUrl : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150',
        hash: video.hash,
        title: video.title,
        description: video.description,
        views: Math.floor(Math.random() * 10000) + 100,
      };
    });

    return (
      <div>
        <h1>{this.props.header}</h1>
        <Carousel style={vidStyle} slidesToShow={3} cellAlign="left">
          {
            data.map((videoData) =>
              (
                <Link to={`/videos/${videoData.hash}`}>
                  <img width="250px" src={videoData.thumbnailUrl} onLoad={() => {window.dispatchEvent(new Event('resize'));}} />
                  <div style={vidTextStyle}>{videoData.title}</div>
                  <div style={descriptStyle}> {videoData.description} </div>
                  <div style={descriptStyle}> Views: {videoData.views} </div>
                </Link>
              ),
            )
          }
        </Carousel>
      </div>
    );
  },
});


export default HomepageCarousel;
