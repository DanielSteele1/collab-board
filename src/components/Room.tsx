
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
       id={boardId}
       initialStorage={{
        shapes: new LiveMap([

            [
                "shape-1",
                new LiveObject({ x: 600, y: 120, fill: "#f59e0b"}),
            ],

            [
                "shape-2",
                new LiveObject({ x: 480, y: 200, fill: "#859e0b"}),
            ],

            [
                "shape-3",
                new LiveObject({ x: 880, y: 100, fill: "#854e0b"}),
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