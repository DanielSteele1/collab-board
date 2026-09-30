import { CiPen } from "react-icons/ci";
import { AiOutlineBlock } from "react-icons/ai";
import { Link } from "react-router";
import { FiUser } from "react-icons/fi";
import { LiaSun } from "react-icons/lia";
import { HiOutlineMoon } from "react-icons/hi2";

interface NavigationProps {

 toggleLight: React.MouseEventHandler<HTMLButtonElement>; 
 isLightOn: Boolean;
 
};


function Navigation({ isLightOn, toggleLight }: NavigationProps) {

  return (
    <section className="navigation-container">

        <div className="navigation">

            <span className="nav-logo"> 
            <div className="logo"> 
              <AiOutlineBlock />  
              </div> 
              <Link className="title" to='/'> Collaberative Whiteboard </Link>
            </span>

            <div className="nav-items">
                <Link className="nav-item" id="workspace-button" to='/dashboard'> <CiPen /> Create A Workspace  </Link>
                <Link className="nav-item" id="login-button" to='/login'> <FiUser /> Login </Link>

                <button onClick={toggleLight} id="login-button">
                 {isLightOn ? <LiaSun/> : <HiOutlineMoon/>}
                </button>
            </div>

        </div>

    </section>
  )
}

export default Navigation;
