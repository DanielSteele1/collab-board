

import type { PointerEvent } from "react";
import type { Text } from '../Types';
import { IoText } from "react-icons/io5";
import { LuBold } from "react-icons/lu";

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

    saveTextColor: (id: string, fill: string) => void;
    saveTextSize: (id: string, textSize: number) => void;
    saveTextBoldness: (id: string, boldness: number) => void;

    isSelected: boolean;
}

function InsertText({ 
    saveTextSize, 
    saveTextColor, 
    saveTextBoldness,
    isSelected, id, text, saveText, startDrag }: TextProps) {

    return(
        <div className="text-container">

            {isSelected && (

                <div className="text-menu">

                    <div className="text-setSize">

                        <span> <IoText/> </span>

                        <input
                            type="number"
                            min="1"
                            max="200" 
                            value={text.size ?? 48}
                            onChange={(event) => saveTextSize(id, Number(event.currentTarget.value))}
                        />

                    </div>

                    <div className="text-setBold">

                        <span> <LuBold/> </span>


                        <input type="number"

                        min={100}
                        max={1000}
                        step={100}
                        value={text.boldness ?? 40}
                        onChange={(event) => saveTextBoldness(id, Number(event.currentTarget.value))}
                        />
                    </div>

                    <div className="text-setColor">
                        <input type="color" 
                        value={text.fill ?? '#FFFFFF'}
                        onChange={(event) => saveTextColor(id, event.currentTarget.value)}
                        />
                    </div>

                </div>
            )}


        <button
            className="Text"
            onPointerDown={(event) => startDrag(event, id, text, "text")}
        >

                <input
                    className='Text-text'
                    type="text"
                    size={Math.max(text.text.length, 1)}
                    value={text.text}
                    contentEditable="true"
                    maxLength={200}
                    onChange={(event) => saveText(id, event.target.value)}
                    style={{
                        fontSize: `${text.size ?? 48}px`,
                        color: text.fill ?? "#FFFFFF",
                        fontWeight: `${text.boldness ?? 40} `
                    }}
                    />

            </button>
    </div>
    )
}

export default InsertText;