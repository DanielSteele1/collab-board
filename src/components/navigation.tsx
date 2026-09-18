import { CiPen } from "react-icons/ci";
import { AiOutlineBlock } from "react-icons/ai";
import { Link } from "react-router";
import { FiUser } from "react-icons/fi";

function Navigation() {

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
            </div>

        </div>

    </section>
  )
}

export default Navigation;
