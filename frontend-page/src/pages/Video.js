import React from "react";
import Profile from "../components/Profile";
import VideoList from "../components/VideoList";
import LessonList from "../components/LessonList";
import "../style/pages-style/video.css"

export default function Video(){
  return (
    <div className="video">
      <div className="box video-left">
        <LessonList />
      </div>
      <div className="box video-right">
        <Profile />
        <VideoList />
      </div>
    </div>
  )
}