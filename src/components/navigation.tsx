import { Link, useLocation } from "react-router";
import { FiUser } from "react-icons/fi";
import { LiaMoon, LiaSun } from "react-icons/lia";
import { HiOutlineMoon } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { GrCursor } from "react-icons/gr";
import { MdAccountCircle, MdOutlineDraw } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import useStore from "../ZustandStore";
import { Button, DropdownMenu } from "@radix-ui/themes";

interface NavigationProps {
  toggleLight: React.MouseEventHandler<HTMLButtonElement>;
  isLightOn: boolean;
}

function Navigation({ isLightOn, toggleLight }: NavigationProps) {

  const userProfile = useStore((state: any) => state.userProfile);

  const isGuest = useStore((state: any) => state.isGuest);
  const isLoggedIn = useStore((state: any) => state.isLoggedIn);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isViewingBoard = location.pathname.startsWith("/whiteboard/");
  const closeMenu = () => setIsOpen(false);

  return (
    <section className={`navigation-container${isViewingBoard ? " board-navigation" : ""}`}>
      <div className="navigation">
        <Link className="nav-logo" to="/">
            <MdOutlineDraw />
            <span className="title">Collaborative Whiteboard</span>
        </Link>

        <div className="nav-items">

            {isViewingBoard ? (
            <Link className="back-button" to="/dashboard"> 
            <span> <IoArrowBack/> Back </span>
            </Link>

            ) : (

           <Link to="/login">
            <Button 
           className="nav-item" 
           variant="soft"
           style={{
             height: '40px',
             borderRadius: '10px',
             color: 'var(--text-color)',
             fontSize: '1.0rem',
             fontWeight: '400'
           }}>
              <MdOutlineDraw /> Create a Workspace
             </Button>
            </Link>
            )
           }

            <button
              className="nav-theme-button"
              id="theme-button"
              onClick={toggleLight}
              aria-label={`Switch to ${isLightOn ? "dark" : "light"} theme`}
            >
              {isLightOn ? <LiaSun /> : <LiaMoon />}
            </button>
      

            {!isGuest && !isLoggedIn ? (

            <Link className="nav-item" id="login-button" to="/login">
              <FiUser /> Login
            </Link>

            ):(
              <div className="user-navigation">
                <DropdownMenu.Root> 
                  <DropdownMenu.Trigger>

                <>
                <div className="userName"> {userProfile.name} </div>
                <img className="userPicture"  src={userProfile.picture} />
                </>
                 
                </DropdownMenu.Trigger>

                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}> 
                   <DropdownMenu.Item className="DropdownMenuItem">
                     <div className="LeftSlot"> <MdAccountCircle /> </div> View Account
                   </DropdownMenu.Item>
                </DropdownMenu.Content>

                </DropdownMenu.Root>
              </div>
            )
            }

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
