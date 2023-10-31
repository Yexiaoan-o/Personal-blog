import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style/components-style/layout.css"

import { Outlet } from "react-router-dom";

export default function Layout(){
  return (
    <div className="big-container">
    <Header />
    <Outlet />
    <Footer />
    </div>
  )
}