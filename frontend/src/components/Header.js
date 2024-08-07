// frontend/src/components/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src="/images/logo.png" alt="EduConnect Logo" style={styles.logo} />
      </div>
      <nav style={styles.nav}>
        {[
          { path: "/", label: "Home" },
          { path: "/mentorship", label: "Mentorship" },
          { path: "/studygroup", label: "Study Group" },
          { path: "/resourcesharing", label: "Resources" },
          { path: "/careerinsights", label: "Career Insights" },
        ].map((link, index) => (
          <Link
            key={index}
            to={link.path}
            style={{
              ...styles.navLink,
              ...(hoveredLink === index ? styles.navLinkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div style={styles.profileContainer}>
        <button style={styles.iconButton} onClick={() => navigate("/messages")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.mailIcon} // Add this line to apply the transform style
          >
            <path
              d="M4 4H20V16H4V4Z"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M4 4L12 10L20 4"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button style={styles.iconButton} onClick={() => navigate("/profile")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    height: "70px",
    padding: "0 20px",
    backgroundColor: "#ff7043",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderBottom: "2px solid #d2691e",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "75px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navLink: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "500",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  navLinkHover: {
    backgroundColor: "#ffd54f",
    color: "#333",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mailIcon: {
    transform: "translateY(2px)", // Adjust this value to move the mail icon downwards
  },
};

export default Header;
