import axios from "axios";

export const BACKEND_URL = "http://localhost:3004";

// export async function getAllTrips({state, stateSetter}){
//     try {
//       const results = await axios.get(`${BACKEND_URL}/trips`);
//       const {data} = results;
//       console.log(data.trips);
//       const newArray = [];
//       for (let i = 0; i < data.trips.length; i++) {
//         newArray.push(data.trips[i]);
//       }
//       stateSetter(newArray);
//       console.log(state);

//     } catch (error) {
//       console.log(error);
//     }
// }
