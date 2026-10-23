
import { getStroke } from 'perfect-freehand'
import { useState } from 'react';

function Path() {


      // points for the draw functionality

  const [points, setPoints] = useState([]);

  // users stroke size and color

    const stroke = getStroke(points, {
      size: 32,
      thinning: 0.7,
    })

    // draw feature

    const inputPoints = [
      [0, 0],
      [10, 5],
      [20, 8]
    ]

   const outlinePoints = getStroke(inputPoints);




    return (


        <>
        
        </>
    )
}
