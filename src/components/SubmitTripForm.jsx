import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from "react-bootstrap/Form";
import axios from "axios";

import { BACKEND_URL } from './BackendURL.js';

export default function SubmitTripFormDialog() {
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit (event) {
    event.preventDefault();
    console.log('submitting form...');

    const currentSubmittedTrip = {
      "blah": tripName,
    };
    console.log('printing currently submitted trip...');
    // console.log(currentSubmittedTrip);
    console.log('printing backend url...');
    console.log(BACKEND_URL);
    console.log(tripName);

    axios.post(`${BACKEND_URL}/trip`, currentSubmittedTrip)
      .then((response)=> {
        console.log(response.data);
        // routeChange();
        setOpen(false);
    }); 

  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Trip
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit New Trip</DialogTitle>
        <Form onSubmit = {handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Where do want to climb next time?
            </DialogContentText>
            <Form.Group controlId = "tripName">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Trip Name"
                type="name"
                value = {tripName}
                fullWidth
                variant="standard"
                onChange = {(e) => setTripName(e.target.value)}
              />
            </Form.Group>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type = "submit" onClick={handleClose}>Submit</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}
