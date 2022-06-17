import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from "react-bootstrap/Form";
import axios from "axios";

import { TripsContext } from "./TripsContext.jsx";
import { BACKEND_URL} from './supportFunctions.js';

export default function SubmitTripFormDialog() {
  const {allTrips, setAllTrips} = useContext(TripsContext);

  async function getAllTrips(){
    try {
      const results = await axios.get(`${BACKEND_URL}/trips`);
      const {data} = results;
      console.log(data.trips);
      const newArray = [];
      for (let i = 0; i < data.trips.length; i++) {
        newArray.push(data.trips[i]);
      }
      setAllTrips(newArray);
      console.log(allTrips);

    } catch (error) {
      console.log(error);
    }
  }

  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit (event) {
    event.preventDefault();
    console.log('submitting form...');

    const currentSubmittedTrip = {
      "name": tripName,
    };
    console.log('printing currently submitted trip...');
    console.log(currentSubmittedTrip);
    console.log('printing backend url...');
    console.log(BACKEND_URL);
    console.log(tripName);

    const response = await axios.post(`${BACKEND_URL}/trip`, currentSubmittedTrip);

    console.log(response);
    console.log(response.data);

    getAllTrips();
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
