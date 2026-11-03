import { BiTrash} from "react-icons/bi";
import { IoShapesOutline, IoText } from "react-icons/io5";
import { GrCursor } from "react-icons/gr";
import { MdOutlineRedo, MdOutlineUndo } from "react-icons/md";
import { FaRegHandPaper } from "react-icons/fa";
import { PiHandGrabbingBold } from "react-icons/pi";
import { FaNoteSticky } from "react-icons/fa6";

import "toastify-js/src/toastify.css";

import { Tooltip as ReactTooltip } from 'react-tooltip';
import { HexColorPicker } from 'react-colorful';
import { Popover } from "@radix-ui/themes";
import { BsEraser } from "react-icons/bs";


interface ToolbarProps {
        deleteShape: (id: string) => void;
        addShape: () => void;    
        addNote: () => void;
        selectedShapeID: string | null;
        pausePanZoom: () => void;
        resumePanZoom: () => void;
        enableDrawMode: () => void;
        indicator: boolean;
        setPathColor: (color: string) => void;
        setBrushSize: (brushSize: number) => void;
        eraser: () => void;
        pathColor: string;
        brushSize: number;
}

function Toolbar({
  addNote,
  eraser,
  brushSize, setBrushSize, enableDrawMode, pathColor, 
  setPathColor, indicator, pausePanZoom, resumePanZoom, addShape, 
  deleteShape, selectedShapeID}:ToolbarProps) {
           
    return(

        <div className="whiteboard-toolbar-container">
          <div className="wb-toolbar-top">
            <div className="indicator"> {indicator ? <span className="grab-mode-indicator"> <PiHandGrabbingBold /> Grab Enabled </span> : <>  </>} </div>
          </div>
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

                 <Popover.Root>
                  <Popover.Trigger>
                     <button
                      type="button"
                        aria-label="Choose brush color"
                       data-tooltip-id="toolbar-tooltip"
                       data-tooltip-content="Choose color"
                       onClick={enableDrawMode}
                      >
                    <div id="color-indicator" style={{backgroundColor: pathColor}}> </div>
                  </button>
                 </Popover.Trigger>

                 <Popover.Content className="brush-popover" side="top" sideOffset={15}>
                   <HexColorPicker color={pathColor} onChangeEnd={(color) => setPathColor(color)}/>
                   <div className="brush-size"> 
                    <input type='number' min={1} max={64} value={brushSize} onChange={(event) => setBrushSize(Number(event.target.value))}/> </div>
                 </Popover.Content>
                </Popover.Root>
                
            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Add text">
             <IoText />
            </button>

              <button id="wb-button-stickyNote" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Sticky Note" onClick={addNote}>
              <FaNoteSticky />
            </button>

            <button data-tooltip-id="toolbar-tooltip" data-tooltip-content="Eraser" onClick={eraser}>
             <BsEraser/>
            </button>
          </div>

          <div className="wb-toolbar-right">

            <button id="wb-button-undo" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Undo">
              <MdOutlineUndo />
            </button>

            <button id="wb-button-redo" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Redo">
              <MdOutlineRedo /> 
            </button>
            
            <button id="wb-button-delete" data-tooltip-id="toolbar-tooltip" data-tooltip-content="Delete selected shape" onClick={() => selectedShapeID && deleteShape(selectedShapeID)}>
              <BiTrash />
            </button>

          </div>
        </div>
        <ReactTooltip id="toolbar-tooltip" place="top" />
        </div>
    )
}

export default Toolbar;