import { MdOutlineGridView, MdOutlinePassword } from "react-icons/md";
import { LuTable2 } from 'react-icons/lu';

import type { WhiteboardCollection } from '../Types.tsx';

import WhiteboardCard from './WhiteboardCard.tsx';
import WhiteboardTable from './whiteboard-table.tsx';
import { useState } from 'react';
import { BsFilterLeft } from "react-icons/bs";
import { TiSortAlphabetically } from "react-icons/ti";

import { MdOutlineDateRange } from "react-icons/md";

import CreateBoardModal from './create-board-modal.tsx';

import { DropdownMenu } from "radix-ui";
import { BiX } from "react-icons/bi";

  const moodboardId = crypto.randomUUID();
  const ideasId = crypto.randomUUID();
  const projectsId = crypto.randomUUID();

  const defaultBoards: WhiteboardCollection = [
  {
    id: ideasId,
    title: "Ideas",
    description: "A place for brainstorms",
    color:  "#c681f5",
    boardURL: `/whiteboard/${ideasId}`,
    createdAt: Date.parse("2026-02-26"),

  },
  {
    id: projectsId,
    title: "Project Planning",
    description: "Plan tasks and milestones",
    color: "#4F8EF7",
    boardURL: `/whiteboard/${projectsId}`,
    createdAt: Date.parse('2025-06-14'),
  },
  {
    id: moodboardId,
    title: "Moodboard",
    description: "Moodboard",
    color: "#ddab4e",
    boardURL: `/whiteboard/${moodboardId}`,
    createdAt: Date.parse('2024-12-14'),
  },

];

function Dashboard(){

  const [searchTerm, setSearchTerm] = useState('');

  const [view, setView] = useState(true);
  

  // possible filters

  const [sortBy, setSortBy] = useState<"A-Z" | "New" | "Old" | "Color" | "None">("None");
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

   function CreateWhiteboard(title: string, description: string){

    const boardId = crypto.randomUUID();

    const newBoard = {

      id: boardId,
      title,
      description,
      color: GenerateRandomColor(),
      boardURL: `/whiteboard/${boardId}`,
      createdAt: Date.now(),
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

   // sort each board 

    filteredBoards.sort((a ,b) => {

          switch(sortBy) {

            case "A-Z":
               return a.title.localeCompare(b.title);

            case "New":
              return b.createdAt - a.createdAt;

            case "Color":
              return a.color.localeCompare(b.color);

            case "Old":
              return a.createdAt - b.createdAt;

            case "None":
              return 0;
    }})

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

          <CreateBoardModal onCreate={CreateWhiteboard} />

          <button> <MdOutlinePassword /> Join a workspace via a code </button>
          
          <input 
          type="search" 
          placeholder="Search for a whiteboard..." 
          className="whiteboard-search"
          onChange={(event) => setSearchTerm(event.target.value)} />

          </div>

          <div className="switch-views">
    
           <DropdownMenu.Root> 
            <DropdownMenu.Trigger asChild> 
            <button className="grid-toggle">
             <BsFilterLeft /> Sort by
            </button>


            </DropdownMenu.Trigger>

              <DropdownMenu.Content className="filter-dropdown" sideOffset={5}>

                <DropdownMenu.Item className="filter-option" onClick={() => setSortBy("A-Z")}> <div className="left-slot">  <TiSortAlphabetically />  </div> <span> Alphebetically </span> </DropdownMenu.Item>
                <DropdownMenu.Item className="filter-option" onClick={() => setSortBy("New")}> <div className="left-slot"> <MdOutlineDateRange /> </div> <span> Newest </span> </DropdownMenu.Item>
                <DropdownMenu.Item className="filter-option" onClick={() => setSortBy("Old")}> <div className="left-slot"> <MdOutlineDateRange /> </div> <span> Oldest </span> </DropdownMenu.Item>
                <DropdownMenu.Item className="filter-option" onClick={() => setSortBy("None")}> <div className="left-slot"> <BiX /> </div> <span> Default </span> </DropdownMenu.Item>

              </DropdownMenu.Content>
            </DropdownMenu.Root>

                    <div className="sort-by-indicator">
             ( {sortBy} )
            </div>

            <button className="grid-toggle" onClick={ () => setView(prev => !prev)}>
             {view ? (<div className="view-btn"> <LuTable2 /> </div>) : (<div className="view-btn"> <MdOutlineGridView /> </div>) }
            </button>
          </div>

         </div>
        </div>

      <div className="whiteboards">

        {view ? (

        <div className="whiteboard-grid">
        
         {filteredBoards.length === 0 ? (
          <div className="no-results">
          <span> No matching boards with the name <span id="highlight-text">"{searchTerm}"</span> found. </span>
          <span> Try searching for something else.</span> 
          </div>
         ):(

         filteredBoards.map((board) => (
         <WhiteboardCard key={board.id} board={board} onDelete={DeleteWhiteboard} />
         ))
          
         )}

        </div>
        ) : (
            <WhiteboardTable boards={filteredBoards} onDelete={DeleteWhiteboard} />        
        )
      }

       </div>

      </div>

      </div>

    </section>
  )
}

export default Dashboard;
