

import { BiTrash } from "react-icons/bi";
import type {Whiteboard} from "../Types";
import { Link } from "react-router";

interface WhiteboardCardProps {

    board: Whiteboard; //inherit the already established type structure
    onDelete: (boardId: string) => void;
}

function WhiteboardCard({board, onDelete}:WhiteboardCardProps){

    return (

        <div className="whiteboard">
            <div className="whiteboard-img" style={{ backgroundColor: board.color}}>
                <button className="delete-button" onClick={() => onDelete(board.id)}> <BiTrash /> Delete Item </button>

                <div className="whiteboard-icon"> 
                    
                </div>
            </div>
            <Link to={board.boardURL} className="whiteboard-title">

               <span> {board.title} </span>
               <span className="whiteboard-subheading"> {board.description} </span>
            </Link>
          </div>
    );
}

export default WhiteboardCard;