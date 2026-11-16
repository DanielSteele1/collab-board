
"use client"

import { LiveMap, LiveObject } from "@liveblocks/client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "../utils";
import type { ReactNode } from "react";

const welcomeUnderlinePath = getSvgPathFromStroke(
    getStroke(
        [
            [2370, 1920, 0.7],
            [2405, 1928, 0.9],
            [2440, 1925, 0.85],
            [2480, 1932, 1],
            [2520, 1930, 0.88],
            [2560, 1934, 0.95],
            [2600, 1930, 0.9],
            [2640, 1935, 1],
            [2680, 1932, 0.93],
            [2720, 1928, 0.92],
            [2760, 1933, 1],
            [2800, 1928, 0.9],
            [2840, 1931, 1],
            [2880, 1922, 0.87],
            [2920, 1926, 0.8],
            [2960, 1914, 0.65],
        ],
        {
            size: 30,
            thinning: 0.3,
            smoothing: 0.5,
            streamline: 0.35,
            simulatePressure: false,
        },
    ),
);

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
        shapes: new LiveMap([
            [
                "welcome-block-1",
                new LiveObject({ x: 2100, y: 1850, fill: "#8b5cf6" }),
            ],
            [
                "welcome-block-2",
                new LiveObject({ x: 3040, y: 1650, fill: "#38a0c9" }),
            ],
            [
                "welcome-block-3",
                new LiveObject({ x: 2500, y: 2020, fill: "#4efd09" }),
            ],
        ]),
        notes: new LiveMap(),
        strokes: new LiveMap([
            [
                "welcome-underline",
                new LiveObject({
                    path: welcomeUnderlinePath,
                    color: "#f5e900",
                }),
            ],
        ]),

        text: new LiveMap([
            [
                "text-1",
                new LiveObject({ x: 2780, y: 1850, text: "Create anything." }),
            ],
        ]),

       }}
       >
        <ClientSideSuspense fallback={<div className="loader">
          
            </div>
        }>
        {children}
        </ClientSideSuspense>
       </RoomProvider>
    </LiveblocksProvider>

    )
}

export default Room;