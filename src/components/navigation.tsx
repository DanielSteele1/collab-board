import { Link } from "react-router";
import { FiUser } from "react-icons/fi";
import { LiaSun } from "react-icons/lia";
import { HiOutlineMoon } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { GrCursor } from "react-icons/gr";
import { MdOutlineDraw } from "react-icons/md";

interface NavigationProps {
  toggleLight: React.MouseEventHandler<HTMLButtonElement>;
  isLightOn: boolean;
}

function Navigation({ isLightOn, toggleLight }: NavigationProps) {

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <section className="navigation-container">
      <div className="navigation">
        <Link className="nav-logo" to="/">
            <MdOutlineDraw />
            <span className="title">Collaborative Whiteboard</span>
        </Link>

        <div className="nav-items">

            <Link className="nav-item" id="workspace-button" to="/dashboard">
              <MdOutlineDraw /> Create a Workspace
            </Link>

            <Link className="nav-item" id="login-button" to="/login">
              <FiUser /> Login
            </Link>

            <button
              className="nav-theme-button"
              id="theme-button"
              onClick={toggleLight}
              aria-label={`Switch to ${isLightOn ? "dark" : "light"} theme`}
            >
              {isLightOn ? <LiaSun /> : <HiOutlineMoon />}
            </button>
        </div>
      </div>

      <div className="hamburger-nav">
        <div className="hamburger-nav-bar">
            <Link className="nav-logo" to="/" onClick={closeMenu}>
              <MdOutlineDraw />
              <span className="title">Collaborative Whiteboard</span>
            </Link>

            <div className="hamburger-nav-controls">
              <button
                className="nav-theme-button"
                onClick={toggleLight}
                aria-label={`Switch to ${isLightOn ? "dark" : "light"} theme`}
              >
                {isLightOn ? <LiaSun /> : <HiOutlineMoon />}
              </button>

              <button
                className="hamburger-button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
              </button>
            </div>
        </div>

        <nav
            className="hamburger-menu"
            id="mobile-navigation-menu"
            hidden={!isOpen}
        >
            <Link className="nav-item" to="/dashboard" onClick={closeMenu}>
              <GrCursor /> Create A Workspace
            </Link>

            <Link className="nav-item" to="/login" onClick={closeMenu}>
              <FiUser /> Login
            </Link>
        </nav>
      </div>
    </section>
  );
}

export default Navigation;
