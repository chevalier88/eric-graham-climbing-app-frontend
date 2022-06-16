import { BACKEND_URL } from "./BackendURL.js";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Container from '@mui/material/Container';


export default function TripsAppear() {

  console.log(BACKEND_URL);

  const [allTrips, setAllTrips] = useState([]);

  async function getAllTrips(){
    try {
      const results = await axios.get(`${BACKEND_URL}/trips`);
      const {data} = results;
      console.log(data);
      const newArray = [];
      for (let i = 0; i < data.length; i++) {
        newArray.push(data[i]);
      }
      setAllTrips(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTrips();
  }, []);


  return (
    <div>
      <br></br>
      <Container maxWidth ="md">
        <h3>All Trips</h3>
        <br></br>
        {allTrips}
        <p>do we get here</p>
      </Container>
    </div>
  );
}