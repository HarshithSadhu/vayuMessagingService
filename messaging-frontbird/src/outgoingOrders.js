import React from "react";
function OutgoingOrders(orderObj){

    var jsonObject = null

    if(orderObj.data != undefined){
        jsonObject = JSON.parse(orderObj.data);
        // jsonObject = orderObj
        console.log(jsonObject.names)
        return (
          <div>
            <ul>
                <li>test</li>
              {jsonObject.names.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              
            </ul>
          </div>
        );
    }
    // return (
    //         <div>
    //           <ul>
    //               <li>test</li>
    //             {orderObj.map((item) => (
    //               <li>{item}</li>
    //             ))}
                
    //           </ul>
    //         </div>
    // );
    
    if(jsonObject == null){
      return(
        <div>
        <p>No orders</p>
      </div>
      )
    }

    
  
}


//Backend gives us a json object
//in that json, all the backedn passes is a json with an array of jsons (which is the outgoing orders)
//creaet local variable in react, that saves an array to the array property in the json

  
export default OutgoingOrders;
  

