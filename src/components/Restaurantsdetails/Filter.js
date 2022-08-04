import React from 'react'

import '../../style/Filter2.css'

import { useState, useEffect } from 'react'
import '../../style/Header.css'
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Filter2() {

    const[filter,setfilter]=useState({
        city_id:'',
        cuisine:[],
        lcost:'',
        hcost:'',
        sort:1
    })



    const[locations,setlocations] =useState([])
    const[Restaurants,setRestaurants]=useState([])
    const[pageCount,setPageCount]=useState(0)
    const[currentPageno,setCurrentPageno]=useState(1)
    const[isLoginModalopen,setLoginModal]=useState(false)
    const[isCreateModalopen,setCreateModal] = useState(false)
    const[isHelpModalopen,setHelpModal] = useState(false)
    const responseFacebook = (response) => {
        console.log(response);
      }



    const[user,setuser]= useState({
        name:'',
        email:"",
        phoneno:'',
        password:"",
        confirm:""
     
       })

    const handlechange=(e)=>{
        const{ name , value } = e.target
        setuser({
          ...user,
          [name]:value
        })
       
     }
    
    
    
      const register = (e)=>{
        e.preventDefault();
        console.log('register function')
        const{name,email,phoneno,password,confirm} = user
        if(name && email && phoneno && password && (password == confirm)){
        axios({url:'https://zomato-clone-4.herokuapp.com/signUp',
        method:'post',
        headers:{'Content-Type':'Application/json'},
        data: user}).then(response=>{console.log(response);alert(response.data.message);setCreateModal(false)})
        .catch(err=>console.log(err))
    
        }else{
          alert("invalid")
        }
    
    
      }
    
      const[login,setlogin] = useState({
        email:'',
        password:''
      })
    
    
      const handlelogin = (e) =>{
       // e.preventDefault()
        const{name,value} = e.target;
        //console.log(e.target)
        setlogin({
          ...login,
          [name]:value
        })
    
      }
    
    
      const LOGIN = (e)=>{
        // const{email,password} = user
        e.preventDefault()
        console.log(login)
        axios({url:'https://zomato-clone-4.herokuapp.com/login',
        method:'post',
        headers:{'Content-Type':'Application/json'},
        data: login}).then(response=>{alert(response.data.message);console.log(response);setLoginModal(false)})
        .catch(err=>console.log(err))
        
    
      }


    const requestoption={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(filter)
    }


    useEffect(()=>{


        fetch(`https://zomato-clone-4.herokuapp.com/restaurant/filter/${currentPageno}`,requestoption)
        .then(request=>request.json())
        .then(data=>{
            setRestaurants(data.data);
            setPageCount(data.totalRecords/2)    
        })
            

    },[filter,currentPageno])


    useEffect(()=>{
        fetch('https://zomato-clone-4.herokuapp.com/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=> setlocations(data.data))
    },[])






    const handlecuisineChange=(event)=>{
        if(event.target.checked)
        filter.cuisine.push(event.target.name)
        else
        {
            let index=filter.cuisine.indexOf(event.target.name)
            if(index>-1)
            filter.cuisine.splice(index,1)
        }
        setfilter({...filter})

    }

    const handleCostChange=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setfilter({...filter})
    }


    const handleSort=(s)=>{
        filter.sort=s;
        setfilter({...filter})
      }
  

      const paginationItems=[];
      for(let i=1;i<=pageCount;i++){
        paginationItems[i]=<a href='#' key={i} onClick={()=>setCurrentPageno(i)} >{i} </a>
      }
      const dec=()=>{
        if(currentPageno>1)
        setCurrentPageno(currentPageno-1)
        else
        setCurrentPageno(currentPageno==1)
      }

      const inc=()=>{
        if(currentPageno<5)
        setCurrentPageno(currentPageno+1)
        else
        setCurrentPageno(currentPageno==5)
      }


      const handleLocation=(event)=>{
            console.log(event.target.value)
            filter.city_id=(event.target.value)
            setfilter({...filter})




      }

      let locationList = locations.length && locations.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>)




  return (
    
    <div>

        <div className="logobar">
        
            <div>
                <span id="e">e!</span>
            </div>

            <div>
            <label id="l" onClick={()=>setLoginModal(true)}>Login</label>
            <label id="c"   onClick={()=>setCreateModal(true)}> Create an account</label>
            </div>


            <Modal 
                isOpen={isLoginModalopen}
                style={customStyles}
                >
            <h2>Login Modal
            <button onClick={()=>setLoginModal(false)} className='btn btn-danger float-end' >x</button>
            </h2><br/>
            <form>
              {console.log("login",login)}
              <input placeholder='enter email' type='text' name='email' onChange={(e)=>handlelogin(e)}></input><br/>
              <input placeholder='enter password' type='password' name='password' onChange={(e)=>handlelogin(e)}></input><br/>
              <button onClick={LOGIN}>Login</button>
              <a class="login-help-link link float-end" target="_self" data-uia="login-help-link"  onClick={()=>setHelpModal(true)}>Need help?</a>

              <div class="login-signup-now" data-uia="login-signup-now">New User? <a class="" target="_self" onClick={()=>{
                setCreateModal(true);
                setLoginModal(false);
              }  }>Create an account now</a>.</div>



              <Modal isOpen={isHelpModalopen}>
                <button onClick={()=>setHelpModal(false)} className='btn btn-danger float-end' >x</button>
                <div class="login-content">
                    <div data-uia="password-reset-wrapper">
                      <h1 data-uia="password-reset-header">Forgot Email/Password</h1>
                      <p data-uia="password-reset-subheader">How would you like to reset your password?</p>
                      <div class="reset-choice-container" data-uia="reset-choice-container">
                        <div class="ui-binary-input">
                          <input type="radio" class="reset-password-choice" name="resetPasswordChoice" id="bxid_resetPasswordChoice_email" value="email" tabindex="0" data-uia="email" checked   />

                          <label for="bxid_resetPasswordChoice_email" data-uia="label+email">Email</label>
                          <div class="helper"></div></div><div class="ui-binary-input">
                            <input type="radio" class="reset-password-choice" name="resetPasswordChoice" id="bxid_resetPasswordChoice_text" value="text" tabindex="0" data-uia="text" />
                            <label for="bxid_resetPasswordChoice_text" data-uia="label+text" >Text Message (SMS)</label>
                            <div class="helper"></div></div></div><div>
                              </div>
                              </div>
                              </div>
                   
                                 

                        </Modal> 




            </form>
            <FacebookLogin
              appId="1362878057454279"
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={()=>responseFacebook}
              icon="fa-facebook"
               />
               <h2>
               <GoogleLogin
                clientId="973880459978-3bqve49jc2v0b4sj2b60a2runv41j6rl.apps.googleusercontent.com"
                buttonText="Login with Google"
              />

               </h2>
              
          </Modal>


          <Modal isOpen={isCreateModalopen} style={customStyles}>

            <h2>Create Modal
            <button onClick={()=>setCreateModal(false)} className='btn btn-danger float-end' >x</button>
            </h2>

            <form>
            <div>
                {console.log("user",user)}                
            NAME:<input placeholder='enter your name' type='text' name='name' value={user.name}  onChange={handlechange} ></input><br/><br/>
            Email:<input placeholder='enter your Email' type='text' name='email' value={user.email} onChange={handlechange} ></input><br/><br/>
            PHONE NO:<input placeholder='enter your phoneno' type='number' name='phoneno' value={user.phoneno} onChange={handlechange}></input><br/><br/>
            PASSWORD: < input placeholder='enter your password' type='password' name='password' value={user.password} onChange={handlechange} ></input><br/><br/>
            CONFIRM PASSWORD:<input placeholder='please re-enter password' type='password' name='confirm'  value={user.confirm} onChange={handlechange} ></input><br/><br/>
            <button className='btn btn-danger' onClick={register}>SignUp</button><br/>
            <div class="login-signup-now" data-uia="login-signup-now">Existing User? <a class="" target="_self" onClick={()=>{
                setCreateModal(false);
                setLoginModal(true);
            }  }>Login Now</a>.</div>
            </div>
            </form>


</Modal>

        </div>

        <div className="heading">
                <span>Breakfast Places in Mumbai</span>
            </div>

            <div className="rectangle">
         <span id="filters">Filters</span>
         <span id="sl">Select Location</span>
         <span>
             <select id="selectl" onChange={(e)=>handleLocation(e)} >
                    <option >Select location</option>
                    {locationList}
             </select>
         </span> 
         <span id="cui">Cuisine</span>   

         <div className="options">
             <input type="checkbox" name="North Indian"  onChange={(e)=>handlecuisineChange(e)} />North Indian </div>

             <div className="options">
                <input type="checkbox" name="South Indian" onChange={(e)=>handlecuisineChange(e)} />South Indian </div>
                
            <div className="options">
                    <input type="checkbox" name="Chinese" onChange={(e)=>handlecuisineChange(e)} />Chinese </div>  

            <div className="options">
                        <input type="checkbox" name="Fast Food" onChange={(e)=>handlecuisineChange(e)}  />Fast Food </div>    
            <div className="options">
                        <input type="checkbox" name="Street Food" onChange={(e)=>handlecuisineChange(e)} />Street Food</div>   
                        
             <span id="cot">Cost For Two</span>    
             
          
             <div className="check">
                <input type="radio" name="cost"  onChange={()=>handleCostChange(1,500)}  />Less than &#8377; 500</div>
            <div className="check">
                <input type="radio" name="cost" onChange={()=>handleCostChange(500,1000)}  />&#8377; 500 to &#8377; 1000</div>
            <div className="check">
                <input type="radio" name="cost" onChange={()=>handleCostChange(1000,1500)}  />&#8377; 1000 to &#8377; 1500</div>
            <div className="check">
                <input type="radio" name="cost" onChange={()=>handleCostChange(1500,2000)}  />&#8377; 1500 to &#8377; 2000</div>
            <div className="check">
                <input type="radio" name="cost"  onChange={()=>handleCostChange(2000,10000)} />&#8377; 2000 +</div>
            <div className="check">
                <input type="radio" name="cost"  onChange={()=>handleCostChange(1,10000)} />All</div>    

           <span id="sort">Sort</span>

           <div className="sor">
            <input type="radio" name="s" checked={filter.sort==1} onChange={()=>handleSort(1)}  />Price low to high</div>
        <div className="sor">
            <input type="radio" name="s" checked={filter.sort==-1} onChange={()=>handleSort(-1)} />Price high to low</div>
    </div>


    <div className="searchresult">
        <div >
            
            {
                Restaurants.length > 0 ? Restaurants.map((item)=>

                    <div className='rec'>
                            
                            <label id="tbcc">{item.name}</label>
                            <label id="f">{item.locality}</label>
                            <label id="s">{item.city_name}</label>
                            <div className="partition"></div>
                            <label id="ccf">CUISINES : {item.Cuisine.length && item.Cuisine.map((item)=> item.name+' ')}</label>
                            <label id="rup">COST FOR TWO : {item.cost} </label>
                            <img className="img1" src={require('../../Assets/breakfast.jpg')} height="140px" width="100px"/>   

                    </div>     


                            ):<div className="noData"> No Data Found</div>

                      
            
                    }


                        <div>
                            <div className="pagination">
                                 <a href="#" onClick={dec} >&laquo;</a>
                                    {paginationItems} 
                                 <a href="#" onClick={inc}>&raquo;</a>
                            </div>
                        </div>
                

                             
            
            

            </div>

        </div>

    </div>
  )
}
