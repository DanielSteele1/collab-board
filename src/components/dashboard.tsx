import { BiPlus } from "react-icons/bi";
import { MdOutlineGridView, MdOutlinePassword } from "react-icons/md";
import { LuTable2 } from 'react-icons/lu';

import type { WhiteboardCollection } from '../Types.tsx';

import WhiteboardCard from './WhiteboardCard.tsx';
import { useState } from 'react';


// later down the line 
// - switch over to zustand
// - look into how to generate a unique id for each board
// - actually look into the whiteboard with liveblocks. 

  const defaultBoards: WhiteboardCollection = [
  {
    id: '0',
    title: "Ideas",
    description: "A place for brainstorms",
    color:  "#A259FF",
    boardURL: "/whiteboard/example-board-0",
  },
  {
    id: '1',
    title: "Project Planning",
    description: "Plan tasks and milestones",
    color: "#4F8EF7",
    boardURL: "/whiteboard/example-board-1",
  },
  {
    id: '2',
    title: "Project Work",
    description: "Project Work",
    color: "#ddab4e",
    boardURL: "/whiteboard/example-board-2",
  },

];

function Dashboard(){

  const [searchTerm, setSearchTerm] = useState('');
  const [boards, setBoards] = useState<WhiteboardCollection>(() => {

    const SavedBoards = localStorage.getItem('whiteboardsArray');
    return SavedBoards
      ? JSON.parse(SavedBoards) as WhiteboardCollection
      : defaultBoards;

  });

  function GenerateRandomColor(): string {
    return `hsla(${Math.floor(360 * Math.random())}, 100%, 82%, 0.8)`;
  }

    const filteredBoards = boards.filter((board) => {

    return board.title.toLowerCase().includes(searchTerm.toLowerCase());

    });


   function CreateWhiteboard(){

    const newBoard = {

      id: crypto.randomUUID(),
      title: 'generated-title',
      description: 'generated-desc',
      color: GenerateRandomColor(),
      boardURL: `/whiteboard/${Date.now()}`,
    };

    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem('whiteboardsArray', JSON.stringify(updatedBoards));

   }

    function DeleteWhiteboard(boardId: string) {

    const updatedBoards = boards.filter((board) => board.id !== boardId);
    setBoards(updatedBoards);
    localStorage.setItem('whiteboardsArray', JSON.stringify(updatedBoards));
    
   }

  return (
    <section className="dashboard-container">

      <div className="dashboard">
    
      <div className="dashboard-main">

        <div className="dashboard-welcome">

         <span className="heading"> Weclome, User!</span>
         <div className="dashboard-sub-heading"> Click on the options below to get started.  </div>
         <div className="dashboard-sub-heading"> Either create a new board, join an existing board or search through your current workspaces.</div>
         
         <div className="dashboard-toolbar">

          <div className='toolbar-left'>

          <button onClick={() => CreateWhiteboard()}> <BiPlus /> Create a new workspace </button>
          <button> <MdOutlinePassword /> Join a workspace via a code </button>
          <input 
          type="search" 
          placeholder="Search for a whiteboard..." 
          className="whiteboard-search"
          onChange={(event) => setSearchTerm(event.target.value)} />

          </div>

          <div className="switch-views">
            <button className="grid-toggle">
             <MdOutlineGridView /> Grid 
            </button>

            <button className="table-toggle">
              <LuTable2 /> Table
            </button>
          </div>

         </div>

        </div>

      <div className="whiteboards">

        <div className="whiteboard-grid">

    
        {filteredBoards.map((board) => (


        <WhiteboardCard key={board.id} board={board} onDelete={DeleteWhiteboard}  />

        ))}
        
        </div>

       </div>

      </div>

      </div>


    </section>
  )
}

export default Dashboard;
