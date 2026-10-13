import { BiBrush, BiRedo, BiText, BiTrash, BiUndo } from "react-icons/bi";
import { IoShapesOutline } from "react-icons/io5";
import { GrCursor } from "react-icons/gr";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link } from "react-router";
import { FaRegHandPaper } from "react-icons/fa";


interface ToolbarProps {
        deleteShape: (id: string) => void;
        addShape: () => void;    
        selectedShapeID: string | null;
}

function Toolbar({addShape, deleteShape, selectedShapeID}:ToolbarProps) {

    return(

        <div className="whiteboard-toolbar">

          <div className="wb-toolbar-left">
         
            <button>
             <GrCursor /> 
            </button>

            <button>
                <FaRegHandPaper/>
            </button>

            <button onClick={addShape}>
             <IoShapesOutline/>  
            </button>

            <button>
             <BiBrush /> 
            </button>

            <button>
             <BiText />
            </button>
          </div>

          <div className="wb-toolbar-right">

            <Link to="/dashboard" id="wb-button-back">
            <button>
              <MdOutlineDashboardCustomize /> 
            </button>
            </Link>

            <button id="wb-button-undo">
              <BiUndo />
            </button>

            <button id="wb-button-redo">
              <BiRedo /> 
            </button>

            <button id="wb-button-delete" onClick={() => selectedShapeID && deleteShape(selectedShapeID)}>
              <BiTrash />
            </button>

          </div>
        </div>
    )
}

export default Toolbar;