import React from "react";
import Profile from "../components/Profile";
import ArticleList from "../components/ArticleList";
import VideoList from "../components/VideoList";
import Weather from "../components/Weather";
import "../style/pages-style/home.css"

export default function Home() {
  return (
    <div className="home">
      <div className="box home-left">
        <Profile />
        <Weather />
      </div>
      <div className="box home-center">
        <ArticleList/>
      </div>
      <div className="box home-right">
        <VideoList />
      </div>
    </div>

  );
}
