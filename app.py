from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin
from twilio.rest import Client
import json
import sys
import mysql.connector
import uuid
  
# Printing random id using uuid1()
print ("The random id using uuid1() is : ",end="")
print (uuid.uuid1())

harshith = "2817054499"
#Account Credentials
account_sid = "AC1f155d1478d9e42d72db395fbcf5d315"
auth_token = "fddf2e5a12ff444e6f83d1cdf2515dfc"

client = Client(account_sid, auth_token)




def sendMessage(number, message):
  client.messages.create(
     to=number,
     from_="+1 402 736 6839",
     body=message
  )

app = Flask(__name__)
CORS(app)

connection = mysql.connector.connect(
     user='8ghaizzcu0pybhj4ag4x',
     password='pscale_pw_EZflVljHvvDVrMkcLVYCKxeVh5EejMD3zZ2UC5k8SJx',
     host='aws.connect.psdb.cloud',
     database='expenses',
 )
cursor = connection.cursor()

@app.route('/api/reloadOrders', methods=['POST', 'OPTIONS'])
def reloadOrders(storeID):
    
    print("this is storeID")
    print(storeID)
    # Execute a query
    cursor = connection.cursor()
    query = "SELECT * FROM Orders WHERE storeID = %s"
    cursor.execute(query, (storeID,))

    jsonArray = []
    # Fetch and print the results
    result = cursor.fetchall()
    for row in result:
        print(row)
        #for every tuple, append the tuple as a json to an array that we create
        jsonArray.append({'orderID': row[0], 'name': row[1], 'phone': row[2]})
    # Close the cursor and connection
    cursor.close()


    cursor = connection.cursor()
    query = "SELECT * FROM CompletedOrders WHERE storeID = %s"
    cursor.execute(query, (storeID,))

    jsonArray2 = []
    # Fetch and print the results
    result = cursor.fetchall()
    for row in result:
        print(row)
        #for every tuple, append the tuple as a json to an array that we create
        jsonArray2.append({'orderID': row[0], 'name': row[1], 'phone': row[2]})
    # Close the cursor and connection


    # # Execute the SELECT query
    query2 = "SELECT storeName FROM stores WHERE storeID = %s "
    cursor.execute(query2, (storeID,))

    # # Fetch the result
    result2 = cursor.fetchone()
    resultData2= str(result2[0])
    
    cursor.close()
    # Create a Python dictionary
    

    
    data = {
        'orders': jsonArray,
        'completedOrders' : jsonArray2,
        'storeName': resultData2

        
    }

    #connection.close()
    # Convert the dictionary to a JSON string
    json_data = json.dumps(data)

    response = jsonify(json_data)
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from all origins (*)
    return response


@app.route('/api/completedOrder', methods=['POST'])
def completeOutgoingOrder():

    #First it queries the row of the completed Order by OrderID
    rawData = request.json
    storeID = rawData['storeID']
    #Sends Twilio Message
    messageComplete = "Hi " + rawData['name'] + ", your order is ready for pickup!"
    #sendMessage(rawData['phone'], messageComplete)

    # Create a cursor object
    cursor = connection.cursor()

    # Execute the SELECT statement
    findQuery = "SELECT * FROM Orders WHERE OrderID = %s AND storeID = %s"
    order_id = rawData['orderID']
    print("Testing Code")
    print(order_id)
    print(storeID)
    cursor.execute(findQuery, (order_id, storeID))
    # Fetch the row
    row = cursor.fetchone()
    print("this is Row")
    print(row)

    # Close the cursor
    cursor.close()

    #Then it Inserts the row into the completed Row Table
    # Create a new cursor
    cursor = connection.cursor()
    storeID = rawData['storeID']
    # Execute the INSERT statement
    cursor.execute("INSERT INTO CompletedOrders (OrderID, CustomerName, PhoneNumber, storeID) VALUES (%s, %s, %s, %s)", row)
    # Commit the changes
    connection.commit()

    # Close the cursor and the connection
    cursor.close()

    #Then it deletes the row from the Orders Table
    rawData = request.json
    # Create a cursor object
    cursor = connection.cursor()

    # Define the DELETE query
    delete_query = "DELETE FROM Orders WHERE OrderID = %s AND storeID = %s"

    # Specify the Order ID to delete
    order_id = rawData['orderID']

    # Execute the DELETE query with the Order ID parameter
    cursor.execute(delete_query, (order_id, storeID))

    # Commit the changes
    connection.commit()
    cursor.close()

    #Finally returns the JSON of the updated table
    return reloadOrders(storeID)


@app.route('/api/deleteAllOrders', methods=['POST'])
def deleteOutgoingOrders():
    # Create a cursor object
    rawData = request.json
    storeID = rawData['storeID']
    cursor = connection.cursor()

    # Delete all rows from the table
    delete_query = "DELETE FROM Orders WHERE storeID = '%s'" % storeID
    cursor.execute(delete_query)

    # Commit the changes
    connection.commit()

    # Close the cursor and connection
    cursor.close()

    # Create a Python dictionary
    emptyData = {
        'orders': [],
        'completedOrders': rawData['completedOrders']
    }

    # Convert the dictionary to a JSON string
    json_data = json.dumps(emptyData)


    return reloadOrders(storeID)


@app.route('/api/deleteCompletedOrders', methods=['POST'])
def deleteCompletedOrders():
    # Create a cursor object
    rawData = request.json
    cursor = connection.cursor()
    storeID = rawData['storeID']

    # Delete all rows from the table
    delete_query = "DELETE FROM CompletedOrders WHERE storeID = '%s'" % storeID
    cursor.execute(delete_query)

    # Commit the changes
    connection.commit()

    # Close the cursor and connection
    cursor.close()

    # Create a Python dictionary
    emptyData = {
        'orders': rawData['outgoingOrders'],
        'completedOrders': []
    }

    # Convert the dictionary to a JSON string
    json_data = json.dumps(emptyData)

    return reloadOrders(storeID)


@app.route('/api/addOrder', methods=['POST'])
def getOrder():
    print(request.json, file=sys.stdout)
    rawData = request.json
    if(rawData['phoneNum']=='keyWord'):
        return reloadOrders(rawData['storeID'])
    uniqueID = str(uuid.uuid4())
    
    messageStandard = "Hi " + rawData['customerName'] + " your order has been placed, you will be notified upon completion"
    #sendMessage(rawData['phoneNum'], messageStandard)

    cursor = connection.cursor()

    insert_query = "INSERT INTO Orders (OrderID, CustomerName, PhoneNumber, storeID) VALUES (%s, %s, %s, %s)"
    storeID = rawData['storeID']
    values = (uniqueID, rawData['customerName'], rawData['phoneNum'], rawData['storeID'])
    cursor.execute(insert_query, values)

    connection.commit()
    cursor.close()
    return reloadOrders(storeID)

@app.route('/api/addStore', methods=['POST'])
def addStoreFunc():
    print(request.json, file=sys.stdout)
    rawData = request.json
    cursor = connection.cursor()


    # # Execute the SELECT query
    query = "SELECT COUNT(*) FROM stores WHERE storeEmail = %s"
    cursor.execute(query, (rawData['storeEmail'],))

    # # Fetch the result
    result = cursor.fetchone()

    # # Check if the email exists
    if result[0] > 0:
        storeData = {
            'response': 'invalid'
            
        }

        # Convert the dictionary to a JSON string
        json_data = json.dumps(storeData)

        return jsonify(json_data)
        
    else:
        insert_query = "INSERT INTO stores (storeID, storeName, storeEmail, storePassword) VALUES (%s, %s, %s, %s)"

        uniqueID = str(uuid.uuid4())
        values = (uniqueID, rawData['storeName'], rawData['storeEmail'], rawData['storePassword'])
        cursor.execute(insert_query, values)

        connection.commit()

        storeData = {
            'response': 'valid',
            'storeID': uniqueID
            
        }

        # Convert the dictionary to a JSON string
        json_data = json.dumps(storeData)

        return jsonify(json_data)

    
@app.route('/api/logIn', methods=['POST'])
def logInFunc():
    print(request.json, file=sys.stdout)
    rawData = request.json
    cursor = connection.cursor()


    # # Execute the SELECT query
    query = "SELECT COUNT(*) FROM stores WHERE storeEmail = %s AND storePassword = %s"
    cursor.execute(query, (rawData['storeEmail'], rawData['storePassword']))

    # # Fetch the result
    result = cursor.fetchone()

    # # Check if the email exists
    if result[0] > 0:
        query = "SELECT storeID FROM stores WHERE storeEmail = %s"
        cursor.execute(query, (rawData['storeEmail'],))
        # Fetch the result
        result = cursor.fetchone()
        store_id = result[0]

        connection.commit()

        storeData = {
            'response': 'valid',
            'storeID': store_id
            
        }

        # Convert the dictionary to a JSON string
        json_data = json.dumps(storeData)

        return jsonify(json_data)
        
    else:
        storeData = {
            'response': 'invalid'
            
        }

        # Convert the dictionary to a JSON string
        json_data = json.dumps(storeData)

        return jsonify(json_data)

       
@app.route('/api/storeName', methods=['POST'])
def getStoreName():
    rawData2 = request.json
    cursor2 = connection.cursor()

    # # Execute the SELECT query
    query2 = "SELECT storeName FROM stores WHERE storeID = %s "
    cursor2.execute(query2, (rawData2['storeID'],))

    # # Fetch the result
    result2 = cursor.fetchone()
    resultData2={'storeName':result2[0]}
    json_data2 = json.dumps(resultData2)
    cursor2.close()
    return jsonify(json_data2)


if __name__ == '__main__':
    
    app.run(debug=True)
