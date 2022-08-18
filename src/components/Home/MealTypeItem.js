import React from 'react'
import { useState , useEffect  } from 'react'
import '../../style/Wallpaper.css'
import ReactDOM from 'react-dom';
import Filter2 from '../Restaurantsdetails/Filter';
import {useNavigate} from 'react-router-dom'

export default function MealTypeItem(props) {
    const {name,content,image}=props.item;
    console.log(props.item)
    const[currentPageno,setCurrentPageno]=useState(1)
    const[Restaurants,setRestaurants]=useState([])
    const[pageCount,setPageCount]=useState(0)
    const[filter,setfilter]=useState({
      city_id:'',
      cuisine:[],
      lcost:'',
      hcost:'',
      sort:1
  })
  const naviagate=useNavigate();
    



useEffect(()=>{


    fetch(`http://localhost:6767/restaurant/filter/${currentPageno}`,{method:"GET"})
    .then(request=>request.json())
    .then(data=>{
        setRestaurants(data.data);
        setPageCount(data.totalRecords/2)    
    })
        

},[filter])

const handleNavigate=()=>{
    naviagate(`/filter/${name}`)
}

  return (
            <div className="col-sm-12 col-md-12 col-lg-4">

              <div className="tileContainer" onClick={handleNavigate}  >
                    <div className="tileComponent1">
                       <img src={require('../../' + image)} height="150" width="140" />
                    </div>
                    <div className="tileComponent2">
                    <div className="componentHeading">
                        {name}
                    </div>
                    <div className="componentSubHeading">
                    {content}
                    </div>
                </div>
            </div>
        </div>



                
                
                
                
                
              
  )
}

