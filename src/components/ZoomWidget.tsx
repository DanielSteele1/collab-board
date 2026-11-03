import { BiMinus, BiPlus } from "react-icons/bi";

interface ZoomProps {

    ZoomAmount: number;
    IncrementZoom: () => void;
    DecrememntZoom: () => void;
}

function ZoomWidget({ ZoomAmount, IncrementZoom, DecrememntZoom  }:ZoomProps) {

    return (

        <div className="zoom-widget">

            <div className="plus-zoom-button">
                <button onClick={IncrementZoom}> <BiPlus /> </button>
            </div>

            <div className="zoom-indicator">
               {ZoomAmount}%
            </div>

            <div className="minus-zoom-button">
                <button onClick={DecrememntZoom}> <BiMinus /> </button>
            </div>

        </div>

    );
}

export default ZoomWidget;