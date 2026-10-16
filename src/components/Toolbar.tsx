import { BiBrush, BiRedo, BiText, BiTrash, BiUndo } from "react-icons/bi";
import { IoShapesOutline } from "react-icons/io5";
import { GrCursor } from "react-icons/gr";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link } from "react-router";
import { FaRegHandPaper } from "react-icons/fa";
import { PiHandGrabbingBold } from "react-icons/pi";


interface ToolbarProps {
        deleteShape: (id: string) => void;
        addShape: () => void;    
        selectedShapeID: string | null;
        pausePanZoom: () => void;
        resumePanZoom: () => void;
        indicator: boolean;
}

function Toolbar({indicator, pausePanZoom, resumePanZoom, addShape, deleteShape, selectedShapeID}:ToolbarProps) {

    return(

        <div className="whiteboard-toolbar">

          <div className="wb-toolbar-left">
         
            <button onClick={pausePanZoom}>
             <GrCursor /> 
            </button>

            <button onClick={resumePanZoom}>
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

          <div className="wb-toolbar-mid">
            {indicator ? <span className="grab-mode-indicator"> <PiHandGrabbingBold />  Grab mode enabled </span> : <>  </>}
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