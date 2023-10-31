import React from "react";
import "../style/components-style/video-list.css";
import videoData from "../assets/fake data/video";

export default function VideoList() {
  const videos = videoData.map((video) => {
    return (
      <li key={video.id}>
        <a
          href={video.link}
          target="_blank"
          class="link"
        >
          <div class="video-image">
            <img src={video.image} />
          </div>
          <div class="video-title">
            {video.title}
          </div>
        </a>
      </li>
    );
  });
  return (
    <section className="video-container">
      <span className="box-title">NEW VIDEO</span>
      <ul>
        {videos}
      </ul>
    </section>
  );
}
