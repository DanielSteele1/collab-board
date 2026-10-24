import { BiBrush, BiRedo, BiText, BiTrash, BiUndo } from "react-icons/bi";
import { IoShapesOutline } from "react-icons/io5";
import { GrCursor } from "react-icons/gr";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link } from "react-router";
import { FaRegHandPaper } from "react-icons/fa";
import { PiHandGrabbingBold } from "react-icons/pi";

import "toastify-js/src/toastify.css";

import { Tooltip as ReactTooltip } from 'react-tooltip';

interface ToolbarProps {
        deleteShape: (id: string) => void;
        addShape: () => void;    
        selectedShapeID: string | null;
        pausePanZoom: () => void;
        resumePanZoom: () => void;
        enableDrawMode: () => void;
        indicator: boolean;
}

function Toolbar({enableDrawMode, indicator, pausePanZoom, resumePanZoom, addShape, deleteShape, selectedShapeID}:ToolbarProps) {

    return(

        <>
        <div className="whiteboard-toolbar">

          <div className="wb-toolbar-left">
         
            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Select mode" onClick={pausePanZoom}>
             <GrCursor /> 
            </button>

            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Grab mode" onClick={resumePanZoom}>
                <FaRegHandPaper/>
            </button>

            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Add a shape" onClick={addShape}>
             <IoShapesOutline/>  
            </button>

            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Draw mode" onClick={enableDrawMode}>
             <BiBrush /> 
            </button>

            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Add text">
             <BiText />
            </button>
          </div>

          <div className="wb-toolbar-mid">
            {indicator ? <span className="grab-mode-indicator"> <PiHandGrabbingBold />  Grab mode enabled </span> : <>  </>}
          </div>

          <div className="wb-toolbar-right">

            <Link to="/dashboard" id="wb-button-back">
            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Dashboard">
              <MdOutlineDashboardCustomize /> 
            </button>
            </Link>

            <button id="wb-button-undo" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Undo">
              <BiUndo />
            </button>

            <button id="wb-button-redo" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Redo">
              <BiRedo /> 
            </button>

            <button id="wb-button-delete" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Delete selected shape" onClick={() => selectedShapeID && deleteShape(selectedShapeID)}>
              <BiTrash />
            </button>

          </div>
        </div>
        <ReactTooltip id="toolbar-tooltip" place="top" />
        </>
    )
}

export default Toolbar;