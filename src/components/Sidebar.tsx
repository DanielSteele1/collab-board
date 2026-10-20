import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { WhiteboardCollection } from "../Types";

import { useState } from "react";
import { Link } from "react-router";
import { LuTable2 } from "react-icons/lu";
import { MdOutlineGridView } from "react-icons/md";

function Sidebar() {

   const [isCollapsed, setIsCollapsed] = useState(false);
   const [isViewSwitch, setIsViewSwitch] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');

   const [boards] = useState<WhiteboardCollection>(() => {
    
      const saved = localStorage.getItem('whiteboardsArray');
      return saved ? (JSON.parse(saved) as WhiteboardCollection) : [];

   })

   function searchBoards() {

      const normalizedSearchTerm = searchTerm.trim().toLowerCase();

      return boards.filter(board =>
         board.title.toLowerCase().includes(normalizedSearchTerm)
      );
   }

   const filteredBoards = searchBoards();

    return (
    <section className={isCollapsed ? "sidebar-collapsed" : "sidebar"}>

      <div className="sidebar-top">

      <button
        className="sidebar-collapse"
        onClick={() => setIsCollapsed(prev => !prev)}
        aria-label={isCollapsed ? "Expand boards sidebar" : "Collapse boards sidebar"}
      >
        {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
      </button>

      {!isCollapsed ?
      <div className="sidebar-title">
       Your Boards
      </div>
      : <> </>}

      </div>

      {!isCollapsed && (
        <>
        <div className="sidebar-search-bar">
          <input className="sidebar-search" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />

          <button
            className="sidebar-views"
            onClick={() => setIsViewSwitch(prev => !prev)}
            aria-label={isViewSwitch ? "Switch to grid view" : "Switch to table view"}
          >
            {isViewSwitch ? <LuTable2 /> : <MdOutlineGridView />}
          </button>

        </div>
        </>
      )}

    {isViewSwitch ? (

    <div className="grid-view">

      {filteredBoards.length === 0 ? (

      <span className="sidebar-no-results">
       {boards.length === 0
         ? "No results. Create a board first to get started."
         : `No boards found for "${searchTerm}".`}
      </span>
      ) : (

    <div className="sidebar-board-grid-container">
     {filteredBoards.map(({ id, title, color, boardURL }) => (
     <Link 
      className="sidebar-board-grid"
      key={id}
      to={boardURL}
      >

      <div className="sidebar-color-grid" style={{ backgroundColor: color }}>
      </div>

      {!isCollapsed ?
      <div className="sidebar-title-grid">
      {title}
      </div> : <> </>}

     </Link>
     ))}
    </div>

     )}

     </div>

    ) : (


  <div>

     {filteredBoards.length === 0 ? (

      <span className="sidebar-no-results">
       {boards.length === 0
         ? "No results. Create a board first to get started."
         : `No boards found for "${searchTerm}".`}
      </span>
      ) : (

     filteredBoards.map(({ id, title, color, boardURL }) => (
     <Link
      className="sidebar-board"
      key={id}
      to={boardURL}
      >

      <div className="sidebar-color" style={{ backgroundColor: color }}>
      </div>

      {!isCollapsed && <div className="sidebar-title">
      {title}
      </div>}

     </Link>
     ))
     )}

  </div>
    )}

    </section>
    )
}

export default Sidebar;