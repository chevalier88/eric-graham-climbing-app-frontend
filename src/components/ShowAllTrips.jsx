import { BACKEND_URL } from "./supportFunctions.js";
import axios from "axios";
import React, { useState, useEffect, useContext} from "react";
import { TripsContext } from "./TripsContext.jsx";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import UserMoreMenu from './UserMoreMenu.jsx';


function Row({row}) {
  // console.log(row);

  return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            <Typography variant="body" gutterBottom component="div">
              {row.id}
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="body" gutterBottom component="div">
              {row.createdAt}
            </Typography>
          </TableCell>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">
            <UserMoreMenu 
              targetRow={row.id} 
            />
          </TableCell>
       </TableRow>
      </React.Fragment>
  );
}
export default function TripsAppear() {

  console.log(BACKEND_URL);

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

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div>
      <h3>All Trips </h3>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Date Created</TableCell>
              <TableCell align="left">Trip Name</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTrips.map((row) => (
              <Row 
                key={row.name} 
                row={row} 
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}