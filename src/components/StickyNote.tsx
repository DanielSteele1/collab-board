
import type { PointerEvent } from "react";
import type { Notes } from "../Types";

interface StickyNoteProps {
    id: string;
    note: Notes;
    noteText: string;
    saveNoteText: (id: string, text: string) => void;
    startDrag: (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
        item: Readonly<Notes>,
        itemType: "shape" | "note",
    ) => void;
}

function StickyNote({ id, note, saveNoteText, startDrag }: StickyNoteProps) {

    return (
        <button
            className="sticky-note"
            onPointerDown={(event) => startDrag(event, id, note, "note")}
            style={{
                backgroundColor: note.fill,
            }}
        >
            <input type="text"
             className="note-text"
             placeholder="Write something here..."
             contentEditable="true"
             value={note.text} 
             onChange={(event) => saveNoteText(id, event.target.value)} />
        </button>
    );
}

export default StickyNote;