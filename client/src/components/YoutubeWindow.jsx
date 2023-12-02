import React from "react";

const YoutubeWindow = ({ videoId }) => (
  <div className="video-responsive">
    <iframe
      style={{outline:"10px solid #000000"}}
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeWindow