

import { BiTrash } from "react-icons/bi";
import type { WhiteboardType } from "../Types";
import { Link } from "react-router";

interface WhiteboardCardProps {

    board: WhiteboardType; //inherit the already established type structure
    onDelete: (boardId: string) => void;
}

function WhiteboardCard({board, onDelete}:WhiteboardCardProps){

    return (
        <div className="whiteboard">
            <div className="whiteboard-img" style={{ backgroundColor: board.color}}>
                <div className="board-preview" aria-hidden="true">
                    <span className="board-preview-note board-preview-note-one" />
                    <span className="board-preview-note board-preview-note-two" />
                    <span className="board-preview-note board-preview-note-three" />
                </div>
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
               <span className="whiteboard-subheading">{board.description || "A space to make something together."}</span>
            </Link>
          </div>
    );
}

export default WhiteboardCard;