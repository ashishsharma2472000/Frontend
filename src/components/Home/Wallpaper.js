import React,{Component} from 'react'
import '../../style/Wallpaper.css'
import homepageimg from '../../Assets/homepageimg.png'
import { Link } from 'react-router-dom'


export default class Wallpaper extends Component {

  constructor(){
      super()
      console.log(" wallpaper constructor getting called...")
      this.state={
          locations:[],
          restaurants:[]
      }

    }



    componentDidMount(){
        
        //call my api 
        fetch('http://localhost:6767/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=> this.setState({locations:data.data}))
  
    }  

   
    fetchRestaurants = (event)=>{
        fetch(`http://localhost:6767/restaurant/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=> {this.setState({restaurants:data.data});console.log(data.data)})

        
    
    }

    render() {
        
        let locationsOption  =this.state.locations.length && this.state.locations.map((item)=><option key={item.name} value={item.city_id} >{item.name}</option>)

       let restaurantlist = this.state.restaurants.length && <ul>
    {
      this.state.restaurants.map((item=>
                                        <li key={item.name}>
                                            <Link to={`/details/${item.name}`}>{item.name}
                                            </Link>
                                        </li>))
    }

  </ul>
        return (
            <div>
                <div>
                <img src={homepageimg} width='100%' height='460' />

                <div className="logo">
                    <p>e!</p>
                </div>
                <div className="headings">
                    Find the best restaurants, cafes, bars 
                        </div>
                <div className="locationSelector">
                    <select className="locationDropdown" onChange={this.fetchRestaurants}>
                       <option value="0">Select</option>
                       {locationsOption}
                    </select>
                    <div id="notebooks" >
                        <input className="restaurantsinput" type="text" placeholder="Search Restaurant" />
                        {restaurantlist}
                    </div>
                   
                </div>
            </div >
            </div>
        )


      
    }
}
