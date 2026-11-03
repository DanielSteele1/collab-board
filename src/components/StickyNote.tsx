
import type { PointerEvent } from "react";
import type { Notes } from "../Types";

interface StickyNoteProps {
    id: string;
    note: Notes;
    startDrag: (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
        item: Readonly<Notes>,
        itemType: "shape" | "note",
    ) => void;
}

function StickyNote({ id, note, startDrag }: StickyNoteProps) {

    return (
        <button
            className="sticky-note"
            onPointerDown={(event) => startDrag(event, id, note, "note")}
            style={{
                position: "absolute",
                left: note.x,
                top: note.y,
                backgroundColor: note.fill,
            }}
        >
            hey!
        </button>
    );
}

export default StickyNote;