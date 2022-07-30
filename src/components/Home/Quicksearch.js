import React, { Component } from 'react'

import '../../style/Header.css'

import MealTypeItem from './MealTypeItem'


export default class Quicksearch extends Component {

  constructor(){
    super()
    this.state={
      mealtype:[]
    }
  }

  componentDidMount(){
    fetch('http://localhost:6767/mealtype',{method:'GET'})
    .then(request=>request.json())
    .then(data=>this.setState({mealtype:data.data}))
  }
    

  render() {

    let quicklist = this.state.mealtype.length && this.state.mealtype.map((item)=><MealTypeItem item={item} key={item.name} ></MealTypeItem>)
    return (
      <div>
         <div>
         <label id="qs"> Quick Searches</label>
         </div>
         <div>
         <label id="ds">Discover restaurants by type of meal</label>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            {quicklist}
          </div>
        </div>
        
      </div>
    )
  }
}
