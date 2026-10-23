

import { BiTrash } from "react-icons/bi";
import type { WhiteboardType } from "../Types";
import { Link } from "react-router";
import { MdDateRange } from "react-icons/md";

import { formatDistance } from "date-fns";

interface WhiteboardCardProps {

    board: WhiteboardType; //inherit the already established type structure
    onDelete: (boardId: string) => void;
}

function WhiteboardCard({board, onDelete}:WhiteboardCardProps){

    const createdDate = formatDistance(new Date(board.createdAt), new Date(), {addSuffix: true});


    return (
        <div className="whiteboard">
            <div className="whiteboard-img" style={{ backgroundColor: board.color}}>

                <button
                    className="delete-button"
                    aria-label={`Delete ${board.title} board`}
                    onClick={() => onDelete(board.id)}
                >
                    <BiTrash /> Remove
                </button>
            </div>
            <Link to={board.boardURL} className="whiteboard-title">
               <span className="whiteboard-card-title">{board.title}</span>
               <div className="whiteboard-tray"> 
               <span className="whiteboard-subheading">{board.description || "A space to make something together."}</span>
               <span className="whiteboard-createdAt"> <MdDateRange /> {createdDate} </span>
               </div>
             
            </Link>
          </div>
    );
}

export default WhiteboardCard;