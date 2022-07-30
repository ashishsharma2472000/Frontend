import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import {
  Routes,
  Route,
} from "react-router-dom" 
import RestaurantDetails from './components/Restaurantsdetails/RestaurantsDetails';
import Filter from './components/Restaurantsdetails/Filter';

function App() {
  return (

      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/details/:rName' element={<RestaurantDetails/>} />
        <Route path='/filter' element={<Filter/>}/>

      </Routes>      
  
  );
}

export default App;
