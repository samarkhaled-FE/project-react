import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaSpotify, FaInstagram, FaYoutube } from "react-icons/fa"; 
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.bgNavbar}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FOXTV</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tvshows">Tv Shows</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/people">People</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="social-media d-flex align-items-center">
              <FaFacebook className="mx-2" />
              <FaSpotify className="mx-2" />
              <FaInstagram className="mx-2" />
              <FaYoutube className="mx-2" />
            </div>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
