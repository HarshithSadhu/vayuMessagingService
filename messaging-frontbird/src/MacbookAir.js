import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import { json } from 'react-router-dom';



export const MacbookAir = ({storeID}) => {


  const buttonStyle = {
    fontFamily: 'Urbanist-ExtraLight',
  };

    //use State, insdide the curly brackets pls add the values and equal to null
    const [outgoingOrders, setData] = useState({orders: [{name: null, phone: null}] , completedOrders: [{name: null, phone: null}], storeName: ''
    
    });

    const [nameOfRestaurant, changeName] = useState({storeName:null});

    function orderComplete(obj){

      axios.post('placeholder', {'orderID':obj.orderID, 'name':obj.name, 'phone':obj.phone, 'storeID':storeID})
        .then(response => {
          console.log(response.data)
  
          var jsonObject = JSON.parse(response.data);
          
          setData(jsonObject)
          
          //UPdate or render the outgoingOrders Component right here
          
        })
        .catch(error => {
          console.error(error);
        });
      
    }

    function postData2() {
      console.log('Store ID:', storeID);
      if (outgoingOrders.orders.length > 1 || outgoingOrders.completedOrders.length > 1) {
        // Data already fetched, return early
        return;
      }
      const data = {
        phoneNum: "keyWord",
        customerName: "test",
        orderID: 999,
        completedOrders: "test",
        storeID: storeID
      };
      axios.post('placeholder', data)
        .then(response => {
          console.log(response.data);
          var jsonObject = JSON.parse(response.data);
          setData(jsonObject);
          // Process the response data
        })
        .catch(error => {
          console.error(error);
        });
    }
    
  
    var testVar = false;
    useEffect(() => {
      if(testVar===false){
        document.title = 'Vayu: Messaging Service'
        console.log("ran Once")
        postData2()
        testVar = true;
        //getStoreName();
      }
      
    }, []); // Empty dependency array to ensure it runs only once


    function postData() {
      console.log('Store ID:', storeID);
      const data = { phoneNum: phoneNum.current.value, customerName: customerName.current.value, completedOrders: outgoingOrders.completedOrders, storeID:storeID};
      if(phoneNum===''||customerName.current.value==='') {return null}
      axios.post('placeholder', data)
        .then(response => {
          // console.log(typeof response.json);
          //OutgoingOrders(response);
          // <OutgoingOrders orderObj={response.data}/>
          
          console.log(response.data)
          var jsonObject = JSON.parse(response.data);
  
          setData(jsonObject)
  
  
          
          
          //UPdate or render the outgoingOrders Component right here
        })
        .catch(error => {
          console.error(error);
        });
  
        phoneNum.current.value = null
        customerName.current.value = null
        
    }

    function deleteData(){
      axios.post('placeholder', {phoneNum: phoneNum.current.value, customerName: customerName.current.value, completedOrders: outgoingOrders.completedOrders, storeID:storeID})
        .then(response => {
          console.log(response.data)
          var jsonObject = JSON.parse(response.data);
  
          setData(jsonObject)
          //UPdate or render the outgoingOrders Component right here
        })
        .catch(error => {
          console.error(error);
        });
    }
  
  
    function deleteCompletedOrders(){
      axios.post('placeholder', {outgoingOrders: outgoingOrders.orders, storeID:storeID})
        .then(response => {
          console.log(response.data)
          var jsonObject = JSON.parse(response.data);
  
          setData(jsonObject)
          //UPdate or render the outgoingOrders Component right here
        })
        .catch(error => {
          console.error(error);
        });
    }
    
    function getStoreName(){
      axios.post('placeholder', {storeID: storeID})
        .then(response => {
          console.log(response.data)
          var jsonObject = JSON.parse(response.data);
          console.log(jsonObject)
          changeName(jsonObject);
          //UPdate or render the outgoingOrders Component right here
        })
        .catch(error => {
          console.error(error);
        });
    }

    const phoneNum = useRef();
    const customerName = useRef();
    //const orderDetails = useRef();
    // const arr = [];
  
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'placeholder';
    const url = corsAnywhereUrl + apiUrl;

    function logOut(){
      
      localStorage.setItem('loggedIn', 'false');
      console.log(localStorage.getItem('loggedIn'))
      window.location.reload();
    }

  return (
    <div className="landing-page">
      <title>Vayu: Messaging Service</title>
      <div className="div">
      
        <img className="shopping-cart" alt="test" src="https://cdn-icons-png.flaticon.com/512/263/263142.png" />
        <h1 className="delicious-food-get">
          Delicious food.
          <br />
          Get notified when it’s ready!
        </h1>
        <div className="overlap">
          <input ref={customerName} className="text-wrapper-4" placeholder='Name:'/>
        </div>
        <div onClick={deleteData} className="group">
          <div className="overlap-group">
            <div className="rectangle" />
            <div  className="text-wrapper-2">Clear outgoing orders</div>
          </div>
        </div>

        <div className="group121">
          <div className="overlap-group-121">
            <div className="rectangle-121" />
            <div className="text-wrapper-121">{outgoingOrders.storeName}</div>
          </div>
        </div>

        <div onClick={postData} className="div-wrapper">
          <div className="text-wrapper-3" >Add Order</div>
        </div>
        <div onClick = {logOut} className="text-wrapper-151">Log out</div>
        <div onClick={deleteCompletedOrders} className="overlap-2">
          <div className="rectangle-2" />
          <div className="clear-completed">
            Clear completed
            <br />
            orders
          </div>
        </div>
        <div className="overlap-3">
          <input ref={phoneNum} className="text-wrapper-4" placeholder='Ph:'/>
        </div>
        {/* <div className="overlap-4">
          <input ref={orderDetails} className="text-wrapper-4" placeholder='Wait Time (min):'/>
        </div> */}
        <div className="overlap-5">

          <div className="text-wrapper-7">Outgoing Orders</div>
        </div>

        

        <div className="overlap-6">

          <div className="ellipse" />
          <div className="rectangle-3" />


          <ul className="text-wrapper-9">
              
            {outgoingOrders.orders.map((obj, index) => (
            <p  key={index}>
              {/* {obj.orderID}
              <span>  </span> */}

              {obj.name}:
              <span>  </span>
              {obj.phone}
              <span>   </span>
              
              <div onClick={() => orderComplete(obj)} className="ellipse-2">Complete</div>
               {/* <img className="img" alt="Vector" src="image.png" /> */}
            </p>
      ))}
              
            </ul>



          {/* <div className="text-wrapper-9">Harshith Sadhu: 281-705-4499</div> */}
          
          
          
         
        </div>
        <div className="text-wrapper-10">Completed Orders</div>
        <div className="overlap-7">

        <ul className="text-wrapper-9">
              
              {outgoingOrders.completedOrders.map((obj, index) => (
              <p  key={index}>
                {/* {obj.orderID}
                <span>  </span> */}
  
                {obj.name}:
                <span>  </span>
                {obj.phone}
                <span>   </span>
                {/* <button onClick={() => orderComplete(obj)}> Order Complete </button> */}
                
              </p>
               
               
       ))}
                
              </ul>


          {/* <div className="text-wrapper-11">Harshith Sadhu: 281-705-4499</div> */}
          
        </div>
        <div className="nav-p-op">
          <img className="vector-3" alt="Vector" src="vector.png" />
          <img className="settings" alt="Settings" src="settings-fill0-wght400-grad0-opsz48-1.png" />
          <img className="sell" alt="Sell" src="sell-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-12">Offer and promo</div>
          <div className="text-wrapper-13">Recent Orders</div>
          <img className="location-on" alt="Location on" src="location-on-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-14">Location</div>
          <div className="text-wrapper-15">Settings</div>
          <img className="shield" alt="Shield" src="shield-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-16">Security</div>
          <img className="description" alt="Description" src="description-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-17">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};
export default MacbookAir;
