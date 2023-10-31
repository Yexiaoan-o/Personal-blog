import React from "react";
import "../style/components-style/profile.css"
import img from "../assets/images/personal-img.jpg"

export default function Profile(){
  return (
    <div className="profile">
      <img className="profile-img" src='https://p7.itc.cn/images01/20210106/85c30d8c84e544e68c8a0ba72f53bae3.jpeg' />
      <span className="profile-name">Ye Xiaoan</span>
      <span className="profile-job">Web Developer</span>
      <span className="profile-intro">I'm delving into web development and am currently working on creating a personal technical blog using React. I'm optimistic about successfully constructing this site, where I plan to chronicle my learning journey. My aspiration is to evolve into a seasoned web developer in the near future.</span>
      <div className="profile-data">
        <div className="data">
          <span className="title">ARTICLE</span>
          <span className="num">100w</span>
        </div>
        <div className="data">
          <span className="title">COMMENT</span>
          <span className="num">50w</span>
        </div>
        <div className="data">
          <span className="title">PHOTO</span>
          <span className="num">100</span>
        </div>
      </div>
    </div>
  )
}