import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Skill from "./pages/Skill";
import Article from "./pages/Article";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Article />} />
          <Route path="video" element={<Video />} />
          <Route path="video/:id" element={<Article />} />
          <Route path="skill" element={<Skill />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
