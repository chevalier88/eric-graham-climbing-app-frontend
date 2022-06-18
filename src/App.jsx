import './App.css';
import TripsAppear from './components/ShowAllTrips.jsx';
import React, {useState} from 'react';
import { TripsContext } from './components/TripsContext';

import SubmitTripFormDialog from './components/SubmitTripForm.jsx';
import Login from './components/Login';



function App() {
  const [allTrips, setAllTrips] = useState([]);

  return (
    <div className="App">
      <TripsContext.Provider value = {{allTrips, setAllTrips}}>
        <TripsAppear/>
        <br></br>
        <SubmitTripFormDialog></SubmitTripFormDialog>
        <Login/>
      </TripsContext.Provider>
    </div>
  );
}

export default App;
