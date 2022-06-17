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
      console.log(data.trips);
      const newArray = [];
      for (let i = 0; i < data.trips.length; i++) {
        newArray.push(data.trips[i]);
      }
      console.log(newArray);
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
      <br></br>
      <Container maxWidth ="md">
        <h3>All Trips</h3>
        <br></br>
        <ul>
          {allTrips.map((trip) => (
            <li 
            >
              {trip.name}
            </li>
          ))}
        </ul>

        <p>do we get here</p>

      </Container>
    </div>
  );
}