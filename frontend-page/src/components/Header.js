import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../style/components-style/header.css";
import axios from 'axios'
import servicePath from '../config/apiUrl'

export default function Header() {
  // const [navArray, setNavArray] = React.useState([])
  // React.useEffect(() =>{
  //   const fetchData = async () => {
  //     const result = await axios(servicePath.getTypeInfo).then(
  //       (res)=> {
  //         return res.data.data
  //       }
  //     )
  //     setNavArray(result)
  //   }
  //   fetchData()
  // }, []) 



  return (
    <header className="header">
      <nav className="header-nav">
        <Link className="nav-logo" to="/" >
          JSAn.com
        </Link>
        <NavLink className={({isActive}) => isActive ? "nav-home active": "nav-home"} to="/">
          Home
        </NavLink>
        <NavLink className={({isActive}) => isActive ? "nav-video active": "nav-video"} to="video" >
          Artice
        </NavLink>
        <NavLink className={({isActive}) => isActive ? "nav-skill active": "nav-skill"} to="skill" >
          Photo
        </NavLink>
      </nav>
    </header>
  );
}

