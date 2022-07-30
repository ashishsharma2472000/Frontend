import React from 'react'
import Header from './Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import '../../style/Details.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')




export default function RestaurantsDetail() {

    let {rName} = useParams()

    const[restaurant,setRestaurants] = useState({})

    const[isMenuModalOpen,setisMenuModalOpen] = useState(false)

    const[menu,setMenu]=useState([])

    const[totalPrice,setTotalPrice]=useState(0)


    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script)
      });
    };
  

    const openRazorpay=async()=>{

      // create order in razorpay by calling backend api
      try{

        let orderData;
        orderData= await fetch('http://localhost:6767/pay',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({amount:totalPrice})
      }).then(resp=>resp.json())
  
      // console.log(orderData)
          
      // open razorpay window
        const option={
            key:'rzp_test_VLLuPfMyHSU6rf',
            name:"zomato food delivery app",
            amount:orderData.amount,
            currency:orderData.currency,
            order_id:orderData.id,
            prefill:{
              email:"ashp@gamil.com",
              contact:'243516230'
            },
            handler:function(response){
              // call api  that would save transaction in db
              fetch('http://localhost:6767/pay/save',{method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                razorpay_order_id:response.razorpay_order_id,
                razorpay_payment_id:response.razorpay_payment_id,
                razorpay_signature:response.razorpay_signature,
                razorpay_amount:orderData.amount})
             }).then(resp=>console.log(resp))

            }
        }
        const paymentWindow= window.Razorpay(option);
        paymentWindow.open()

       }catch(error){
        console.log(error)
       }

      }
     


    useEffect(()=>{

      fetch(`http://localhost:6767/restaurant/details/${rName}`,{method:"GET"})
      .then(response=>response.json())
      .then(data=>{

                  setRestaurants(data.data);
                  console.log(data.data)

      })


    }
    ,[])


    const fetchMenu=()=>{
      fetch(`http://localhost:6767/menu/${rName}`,{method:"GET"})
      .then(response=>response.json())
      .then(data=>{setMenu(data.data) })
    }

    const calTotalprice=(item)=>{
      let price = totalPrice + item.itemPrice;
      setTotalPrice(price)
    }

    const removeoneprice=(item)=>{

      let price = totalPrice - item.itemPrice;
      setTotalPrice(price)

    }



    const{name,thumb,cost,address,Cuisine}=restaurant
    const Cuisinelist =!(Cuisine==undefined) && <ul>
      {
        Cuisine.map((item)=><li key={item.name}>
                         {item.name}
        </li>)
      }

    </ul>

  return (
    <div>
        <Header></Header>
        <div>
        <img src={thumb} height='500px' width='100%' />
        </div>
      <div >
         <h2>{name}</h2>
         <button className='btn btn-danger'
          style={{float:'right'}}
          onClick={()=>{
            setisMenuModalOpen(true);
            fetchMenu();
            }}>
            
            Place Online Order
          </button>

      </div>
      <div>
            <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>contact</Tab>
            </TabList>

            <TabPanel>
              <div className='about'>About the Place</div>
              <div className='head'>Cuisine:</div>
              {Cuisinelist}
              <div className='head'>Average Cost</div>
              <div className='value'>&#8377; {cost}</div>
            </TabPanel>
            <TabPanel>
              <div className='head'>Phone No</div>
              <div className='value'>+91-987456123</div>
              <div className='head'>{name}</div>
              <div className='value'>{address}</div>
            </TabPanel>
          </Tabs>
      </div>
      <div>

        <Modal isOpen={isMenuModalOpen} >

        <div>

                <h2>
                  Menu
                  <button className='btn btn-danger float-end' onClick={()=>setisMenuModalOpen(false)}  >X</button>
                </h2>
          
            <ul className='ma'>
              {
                menu.length && 
                menu.map((item,index)=><li key={index}>
                  
                  <div>
                    {
                      item.isVeg ? <span className='text-success'>Veg</span>:<span className='text-danger'>Non-Veg</span>
                    }
                  </div>

                  <div className='cuisines' >{item.itemName}</div>

                  <div className='cuisines'>&#8377; {item.itemPrice}</div>

                  <div className='cuisines'>{item.itemDescription}</div>

                  <div>
                    <button className='btn btn-secondary' onClick={()=> calTotalprice(item)}>Add</button>
                    <button className='btn btn-secondary ' onClick={()=>removeoneprice(item)} style={{position:'absolute',left:'140px'}} >Remove</button>
                  </div>

            


                </li>)
              }
            </ul>

              <hr />
              <div>
              <h3 className='head'>TotalPrice:{totalPrice}
              <button className='btn btn-danger float-end' onClick={()=>{setisMenuModalOpen(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay()}}>PayNow</button>
              </h3>
              
              </div>
              
              

          

        </div>    




        </Modal>





      </div>
  </div>  
  )
}

