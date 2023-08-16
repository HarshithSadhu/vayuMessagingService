import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "./style2.css";
import { json } from 'react-router-dom';


function CurrentPage({ onNextPage, setStoreID }) {

    const storeName = useRef();
    const storeEmail = useRef();
    const storePassword = useRef();
    const storeEmailIn = useRef();
    const storePasswordIn = useRef();
    
    // Get the value of loggedIn from local storage
    const loggedIn = localStorage.getItem('loggedIn');
    

    var testVar = false;
    useEffect(() => {

      console.log(localStorage.getItem('loggedIn'))
      if(loggedIn != null && loggedIn==='true'){
        onNextPage();
        setStoreID(localStorage.getItem('storeID'))
        
      }
  
    }, []); 

    

    

    function addStore() {
        const data = { storeName: storeName.current.value, storeEmail: storeEmail.current.value, storePassword: storePassword.current.value};
        if(storePassword===''||storeName.current.value===''|storeEmail.current.value==='') {return null}
        console.log(data)
        axios.post('placeholder', data)
          .then(response => {
            // console.log(typeof response.json);
            //OutgoingOrders(response);
            // <OutgoingOrders orderObj={response.data}/>
            
            console.log(response.data)
            var jsonObject = JSON.parse(response.data);
            console.log(jsonObject['response'])
            if(jsonObject['response'] == 'valid'){
                localStorage.setItem('loggedIn', true);
                onNextPage()
                setStoreID(jsonObject['storeID']);
                localStorage.setItem('storeID', jsonObject['storeID']);
            }
            else{
              localStorage.setItem('loggedIn', false);
            }
            
    
    
            
            
            //UPdate or render the outgoingOrders Component right here
          })
          .catch(error => {
            console.error(error);
          });
    
          storeEmail.current.value = null
          storeName.current.value = null
          storePassword.current.value = null
          
      }
    
    
    
      function login() {
        
        const data = { storeEmail: storeEmailIn.current.value, storePassword: storePasswordIn.current.value};
        
        if(storePasswordIn===''||storeEmailIn==='') {return null}
        console.log(data)
        axios.post('placeholder', data)
          .then(response => {
            // console.log(typeof response.json);
            //OutgoingOrders(response);
            // <OutgoingOrders orderObj={response.data}/>
            
            console.log(response.data)
            var jsonObject = JSON.parse(response.data);
            console.log(jsonObject['response'])
            if(jsonObject['response'] == 'valid'){
                onNextPage()
                setStoreID(jsonObject['storeID']);
                localStorage.setItem('loggedIn', true);
                const storeID = jsonObject['storeID']
                localStorage.setItem('storeID', storeID);
            }
            else{
              localStorage.setItem('loggedIn', false);
            }
            
    
    
            
            
            //UPdate or render the outgoingOrders Component right here
          })
          .catch(error => {
            console.error(error);
          });
    
          storeEmailIn.current.value = null;
          storePasswordIn.current.value = null;
      }
    
    




  return (
    <div className="login-page">
      <div className="div">
      <img className="shopping-cart" alt="test" src="https://cdn-icons-png.flaticon.com/512/263/263142.png" />
        <h1 className="delicious-food-sign">
          Delicious food.
          <br />
          Sign up to serve!
        </h1>
        <div className="overlap">
          <input ref = {storeEmail} className="text-wrapper" placeholder='Email:'/>
        </div>
        <div onClick={addStore} className="group">
          <div className="overlap-group">
            <div className="rectangle" />
            <div className="text-wrapper-2">Sign Up</div>
          </div>
        </div>
        <div className="div-wrapper">
        <input ref = {storePassword} className="text-wrapper-security" placeholder='Password:'/>
        </div>
        <div className="overlap-2">
        <input ref = {storeName} className="text-wrapper" placeholder='Store Name:'/>
        </div>
        <p className="order-ready-sign-in">
          Order Ready?
          <br />
          Sign in to start cooking!
        </p>
        <div onClick={login} className="overlap-wrapper">
          <div  className="overlap-3">
            <div className="rectangle-2" />
            <div className="text-wrapper-5">Log in</div>
          </div>
        </div>
        <div className="overlap-4">
          <input ref = {storeEmailIn} className="text-wrapper" placeholder='Email: '/>
        </div>
        <div className="overlap-5">
        <input ref = {storePasswordIn} className="text-wrapper-security" placeholder='Password: '/>
        </div>
        <div className="nav-p-op">
          <img className="vector" alt="Vector" src="vector.png" />
          <img className="settings" alt="Settings" src="settings-fill0-wght400-grad0-opsz48-1.png" />
          <img className="sell" alt="Sell" src="sell-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-8">Offer and promo</div>
          <div className="text-wrapper-9">Recent Orders</div>
          <img className="location-on" alt="Location on" src="location-on-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-10">Location</div>
          <div className="text-wrapper-11">Settings</div>
          <img className="shield" alt="Shield" src="shield-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-12">Security</div>
          <img className="description" alt="Description" src="description-fill0-wght400-grad0-opsz48-1.png" />
          <div className="text-wrapper-13">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentPage;
