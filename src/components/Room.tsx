
"use client"

import { LiveMap, LiveObject } from "@liveblocks/client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import type { ReactNode } from "react";

interface RoomProps{
    boardId: string;
    children: ReactNode;
}

 function Room({ children, boardId}: RoomProps) {

    return (
    <LiveblocksProvider publicApiKey="pk_dev_QY3H17XvLJO1Ex7XZOMUy7lXlIeWFam-j_LKFH4ZpZabmjzN-fdtHuX3xzbos2AZ" throttle={16}>

       <RoomProvider
       initialPresence={{ cursor: null, selectShapeId: null}}
       id={boardId}
       initialStorage={{
        shapes: new LiveMap(),
        strokes: new LiveMap(),
        notes: new LiveMap(),

        text: new LiveMap([

            [
                "text-1",
                new LiveObject({ x: 2400 - 105, y: 1350 - 105, text: "Hello World!"}),
            ],

        ]),

       }}
       >
        <ClientSideSuspense fallback={<div className="loader">
            <div className="room-loading"> 

            </div>
            <span className="loading-txt"> Loading... </span>
            </div>
        }>
        {children}
        </ClientSideSuspense>
       </RoomProvider>
    </LiveblocksProvider>

    )
}

export default Room;