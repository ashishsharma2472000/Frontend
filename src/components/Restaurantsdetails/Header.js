import React from 'react'
import '../../style/Header.css'
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import { useState } from 'react'
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

  




export default function () {


  const[isLoginModalopen,setLoginModal]=useState(false)

  const[isCreateModalopen,setCreateModal] = useState(false)

  const[isHelpModalopen,setHelpModal] = useState(false)

  const responseFacebook = (response) => {
    console.log(response);
  }

  const[isEmail, setIsEmail]=useState(true)

  
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
    data: user}).then(response=>{console.log(response);
      alert(response.data.message);
      if(response.data.message=='Successfully Registred'){
        setCreateModal(false)}
      
      
    }).catch(err=>console.log(err))

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
    data: login}).then(response=>{alert(response.data.message);
      if(response.data.message=='login successfully'){
        setLoginModal(false)}
    console.log(response);
    //setLoginModal(true)
  }).catch(err=>console.log(err))
   

  }

 const handleemail=(e)=>{
  setIsEmail(true)
 }


 


 const handletext =(e)=> {
 setIsEmail(false)

 }

const componentClicked = ()=>{
   {
    FB.init({
      appId      : '586945262968949',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

 
 

  return (
   
    <div className="logobar">
        
        <div>
            <span id="e">e!</span>
        </div>

        <div>
            <label id="l"  onClick={()=>setLoginModal(true)}>Login</label>
            <label id="c"  onClick={()=>setCreateModal(true)} >Create an account</label>

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
              <a className="login-help-link link float-end" target="_self" data-uia="login-help-link"  onClick={()=>setHelpModal(true)}>Need help?</a>

              <div className="login-signup-now" data-uia="login-signup-now">New User? <a className="" target="_self" onClick={()=>{
                setCreateModal(true);
                setLoginModal(false);
              }  }>Create an account now</a>.</div>



              <Modal isOpen={isHelpModalopen}  style={customStyles}>
                <button onClick={()=>setHelpModal(false)} className='btn btn-danger float-end' >x</button>
                <div className="login-content">
                    <div >
                      <h1 >Forgot Email/Password</h1>
                      <p >How would you like to reset your password?</p>
                      <div >
                        <div >
                          <input type="radio"name="resetPasswordChoice"  value="email"  checked  onClick={handleemail} />

                          <label>Email</label>
                          </div>
                          <div >
                            <input type="radio" name="resetPasswordChoice"  value="text"  onClick={handletext}/>
                            <label for="bxid_resetPasswordChoice_text" data-uia="label+text" >Text Message (SMS)</label>
                           </div>
                            {isEmail?<div>
    <p >We will send you an email with instructions on how to reset your password.</p>
    <div>
      <label className="contact-method-input ui-label ui-input-label" id="lbl-forgot_password_input" placeholder="forgot_password_input">
        <span ></span>
        <input type="email"  name="forgot_password_input" id="forgot_password_input" value="" placeholder="name@example.com" /></label><br/><br/>
        <button className="btn btn-primary" type="button" >Email Me</button>
        </div></div>:<div>
          <p >We will text you a verification code to reset your password. Message and data rates may apply.</p>
          <div >
          <div >
          <input type="number"   placeholder="enter Phone no" />
          <button className="btn btn-primary" type="button" >Text Me</button>
        </div>
        </div>
        </div>}
        <a data-uia="action_forgot_password_mop" href="#" className="forgot-password-mop-link">I can't remember my email address or phone number.</a>

                            </div><div>
                              </div>
                              </div>
                              </div>
                   
                                 

                        </Modal> 




            </form>
            <FacebookLogin
              appId="586945262968949"
              fields="name,email,picture"
              onClick={componentClicked}
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
              <div className="login-signup-now" data-uia="login-signup-now">Existing User? <a className="" target="_self" onClick={()=>{
                setCreateModal(false);
                setLoginModal(true);
              }  }>Login Now</a>.</div>
              </div>
            </form>

            
          </Modal>



    </div>
  )
}
