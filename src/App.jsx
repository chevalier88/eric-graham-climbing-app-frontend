import './App.css';
import TripsAppear from './components/ShowAllTrips.jsx';
import SubmitTripFormDialog from './components/SubmitTripForm.jsx';
function App() {
  return (
    <div className="App">
      <TripsAppear/>
      <SubmitTripFormDialog></SubmitTripFormDialog>
    </div>
  );
}

export default App;
