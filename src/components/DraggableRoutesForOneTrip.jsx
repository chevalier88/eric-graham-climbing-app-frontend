import React from "react";
import { Draggable } from "react-drag-reorder";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// const style = {
//   width: '100%',
//   maxWidth: 360,
//   bgcolor: 'background.paper',
// };

export default function DraggableRoutesForOneTrip( {routes} ){

  console.log('printing routes inherited by draggable...');
  console.log(routes);

  const getChangedPos = (currentPos, newPos) => {
    console.log(currentPos, newPos);
  };
  
  return (
    <div className="flex-container">
      <div className="row">
        <List component="nav" aria-label="mailbox folders">
          <Draggable onPosChange={getChangedPos}>
            {routes.map((route, idx) => {
              return (
                <ListItem key={idx} className="flex-item" divider >
                  {route.id} : {route.name}
                  {/* <ListItemText primary = {route.name}></ListItemText> */}
                </ListItem>
              );
            })}
          </Draggable>
        </List>
      </div>
    </div>
  )
}
