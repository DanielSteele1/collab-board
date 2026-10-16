import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { WhiteboardCollection } from "../Types";

import { useState } from "react";
import { Link } from "react-router";

function Sidebar() {

   const [isCollapsed, setIsCollapsed] = useState(true);

   const [boards] = useState<WhiteboardCollection>(() => {
    
      const saved = localStorage.getItem('whiteboardsArray');
      return saved ? (JSON.parse(saved) as WhiteboardCollection) : [];

   })

    return (
    <section className={isCollapsed ? "sidebar" : "sidebar-collapsed"}>

      <div className="sidebar-top">

      <button className="sidebar-collapse" onClick={() => setIsCollapsed(prev => !prev)}>
        {isCollapsed ? <FaArrowLeft /> : <FaArrowRight />} 
      </button>

      {isCollapsed ? 
      <div className="sidebar-title">
       Boards
      </div>
      : <> </>}

      </div>

     {boards.map(({ id, title, color, boardURL }) => ( 
     <Link 
     className="sidebar-board" 
     key={id}
     to={boardURL}
     >

      <div className="sidebar-color" style={{ backgroundColor: color }}>
      </div>

      {isCollapsed ?    <div className="sidebar-title">
      {title}
      </div> : <> </>}

     </Link>
     ))}

    </section>
    )

}

export default Sidebar;