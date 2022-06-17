import React from "react";
import { Draggable } from "react-drag-reorder";

export default function DraggableRoutesForOneTrip(){
  const words = ["Hello", "Hi", "How are you", "Cool"];

  const getChangedPos = (currentPos, newPos) => {
    console.log(currentPos, newPos);
  };
  
  return (
    <div className="flex-container">
      <div className="row">
        <Draggable onPosChange={getChangedPos}>
          {words.map((word, idx) => {
            return (
              <div key={idx} className="flex-item">
                {word}
              </div>
            );
          })}
        </Draggable>
      </div>
    </div>
  )
}
