import { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from './Iconify.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { BACKEND_URL } from './supportFunctions.js';
import DraggableRoutesForOneTrip from './DraggableRoutesForOneTrip.jsx';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function UserMoreMenu({targetRow}) {

  const ref = useRef(null);
  const [isDotsMenuOpen, setIsDotsMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [routes, setRoutes] = useState([]);

  const [routeName, setRouteName] = useState("");
  const [routeDiff, setRouteDiff] = useState("");

  async function getAllRoutes(){
    console.log('attempting to get allRoutes...')
    try{
      console.log(`${BACKEND_URL}/trip/${targetRow}`);
      
      const results = await axios.get(`${BACKEND_URL}/trip/${targetRow}`);

      const { data } = results;

      console.log('printing server response for routes of this trip...');
      console.log(data);

      console.log(Object.keys(data));
      console.log(data[0]);
 
      const newArray = [];
      for (let i = 0; i < data.length; i++) {
        newArray.push(data[i]);
      }

      console.log('printing newArray');
      console.log(newArray);

      setRoutes(newArray);
      // console.log(routes);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    getAllRoutes();
  },[]);

  function handleDotMenuOpen(e){
    e.preventDefault();
    setIsDotsMenuOpen(true);
    };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  function handleViewEditButtonClick(e){
    e.preventDefault();
    console.log(`view/edit button was clicked for ${Number(targetRow)}`);
    setIsDotsMenuOpen(false);
    
    setDialogOpen(true);

  }

  // ------ ADD NEW ROUTE ------- //
  


  async function handleAddNewRoute (event) {
    event.preventDefault();
    
    console.log("testing to see if this is working");

    const newRoute = {
      'name': routeName,
      'difficulty': routeDiff,
    };
    console.log(newRoute);
    const response = await axios.post(`${BACKEND_URL}/addRoute/${targetRow}`, newRoute);
    console.log(response.data);

    setRouteName('');
    setRouteDiff('');
    getAllRoutes();
  }

  return (
    <>
      <IconButton ref={ref} onClick={(handleDotMenuOpen)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isDotsMenuOpen}
        anchorEl={ref.current}
        onClose={() => setIsDotsMenuOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick = {handleViewEditButtonClick}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View/Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Routes for Trip {targetRow}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Routes are ranked in order of user-specified priority. <b>Drag routes</b> to modify rank.
          </DialogContentText>
          <br></br>
          <DraggableRoutesForOneTrip routes = {routes}></DraggableRoutesForOneTrip>
        </DialogContent>
        <DialogActions>
           <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Route Name"
                type="name"
                value = {routeName}
                fullWidth
                variant="standard"
                onChange = {(e) => setRouteName(e.target.value)}
              />
               <TextField
                autoFocus
                margin="dense"
                id="diff"
                label="Route Difficulty"
                type="name"
                value = {routeDiff}
                fullWidth
                variant="standard"
                onChange = {(e) => setRouteDiff(e.target.value)}
              />
          <Button onClick={handleAddNewRoute}>Add New Route</Button>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}