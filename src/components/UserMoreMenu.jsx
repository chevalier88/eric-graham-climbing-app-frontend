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
// ----------------------------------------------------------------------

export default function UserMoreMenu({targetRow}) {

  const ref = useRef(null);
  const [isDotsMenuOpen, setIsDotsMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function getAllRoutes(){
    console.log('attempting to get allRoutes...')
    try{
      console.log(`${BACKEND_URL}/trip/${targetRow}`);
      
      const results = await axios.get(`${BACKEND_URL}/trip/${targetRow}`);

      const { data } = results;

      console.log('printing server response for routes of this trip...');
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

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
    
    getAllRoutes();

    setDialogOpen(true);

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
          <DialogContentText>
            Routes are ranked in order of user-specified priority.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <br></br>
          <DraggableRoutesForOneTrip></DraggableRoutesForOneTrip>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          {/* <Button onClick={handleDialogClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}