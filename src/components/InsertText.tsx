

import type { PointerEvent } from "react";
import type { Text } from '../Types';

interface TextProps{
    id: string;
    text: Text;
    saveText: (id: string, text: string) => void;
    startDrag: (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
        item: Readonly<Text>,
        itemType: "text",
    ) => void;
}

function InsertText({ id, text, saveText, startDrag }: TextProps) {

    return(
        <button 
        className="Text"
        onPointerDown={(event) => startDrag(event, id, text, "text")}
        >
        
        <input 
        className='Text-text'
        type="text" 
        value={text.text} 
        contentEditable="true"
        maxLength={200}
        onChange={(event) => saveText(id, event.target.value)}
        
        /> 
        
        </button>
    )
}

export default InsertText;