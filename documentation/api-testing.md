## API Testing - Step By Step

## What is API? 
API (meaning application programming interface) Is a combination of a set of routines, protocols, and supporting tools used in the background to create a connection between your application UI and the backend server to exchange information. 


## What is the difference between an API web service and a microservice? 

## Web Service 
API runs over the internet or web, called web services. 

All web services are APIs, but all APIs are not web services. 


## Microservice
Microservice is a tiny API that is useful for exchanging information between the components inside the application. 

## What is API testing? Why is it important? 
API testing is a type of testing technique that involves testing the APIs directly without using application UI. 

## Benefits of API Testing 
1. Early Issue Detection 
2. Faster execution compared to UI. 
3. Broader test coverage compared to UI 
4. Completely independent from the UI changes 
5. API Testing is automation-friendly. 


## As there are multiple benefits, we have, so only API testing is enough to release the product. ?
NO

Using API testing, we can validate the core business logic, but that is not enough to release the application to the customer. 


## CRUD Operations ?

Create => Creating the new record which does not exist before 
Read => Reading the existing data from the database. 
Update => Update the existing data with new information. 
Delete => Delete the existing information from the server. 

## Different types of API request methods used in the API world ? 

GET => GET request will be used to get the existing data from the server. 
POST => POST request will be used to create the new data which does not exist before within the server. 
PUT => PUT request will be used to modify the existing data from the server. 
PATCH => PATCH request will be used to modify the specific data within the record. 
DELETE => DELETE request will delete the existing data from the server. 

## Popular API architectures ?

## REST
## SOAP
## GRAPHQL

## SOAP ( Simple Object Access Protocol )
Services mainly rely on XML format to provide messaging services. Each SOAP service is mainly use POST request send requests to send the information and receive the information. 

POST /webservice HTTP/1.1
Host: example.com
Content-Type: text/xml; charset=utf-8
Content-Length: length

<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
   <soap:Header/>
   <soap:Body>
      <GetUserDetails xmlns="http://example.com/">
         <UserId>12345</UserId>
      </GetUserDetails>
   </soap:Body>
</soap:Envelope>

<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
   <soap:Header/>
   <soap:Body>
      <GetUserDetails xmlns="http://example.com/">
         <Username>Bharath Reddy</Username>
         <Userrole>Senior SDET</Userrole>
      </GetUserDetails>
   </soap:Body>
</soap:Envelope>


## REST (Representational State Transfer )
RESTful services mainly use JSON format instead of XML to exchange the information between client and server. RESTful services will use different HTTP methods to perform different types of operations. 

GET => GET request will be used to get the existing data from the server. 
POST => POST request will be used to create the new data which does not exist before within the server. 
PUT => PUT request will be used to modify the existing data from the server. 
PATCH => PATCH request will be used to modify the specific data within the record. 
DELETE => DELETE request will delete the existing data from the server. 

Request: POST api.example.com/users/12345 HTTP/1.1
{
    "empId" : 1234
}

Response:
{
   "id": 12345,
   "name": "John Doe",
   "email": "johndoe@example.com"
}

## GRAPHQL
GraphQL is going to allow us to send a request from the client to retrieve the specific data. GraphQL is going to reduce over-fetching and under-fetching of the data. 

POST /graphql HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
   "query": "{ user(id: \12345\) { name, email } }"
}

Response:
{
   "data": {
      "user": {
         "name": "John Doe",
         "email": "johndoe@example.com"
      }
   }
}


## API testing over REST API 

### What are all the details I can expect from my developer to start the API testing? 

### What are all the validations I need to perform just to make sure my API is working properly? 


## Request : Request is all about the action performed by the user. 

## Response : Response is all about the output received from the Server

## Requirements to be collected from the developer to send an API request

1. Purpose of the API request or functionality of the API ?

2. Request type ( meaning what kind of request it is )
- GET
- POST
- PUT
- PATCH 
- DELETE

3. Request URL : Request URL contains three important parts.

        1. Base URL => https://api.amazon.in
        2. Endpoint => /mobiles?k=iphone&i=electronics&rh=n%3A1389401031&qid=1783657558&rnid=1318502031&ref=sr_nr_p_36_0_0&low-price=45300&high-price=96600
        3. Path Parameters and Query Parameters => path-parameter = mobiles , query-parameter = Parameters used to filter the data 

        https://www.amazon.in/mobiles?k=iphone&i=electronics&rh=n%3A1389401031&qid=1783657558&rnid=1318502031&ref=sr_nr_p_36_0_0&low-price=45300&high-price=96600

4. Request body or payload => POST, PUT, PATCH

The data that you want to store or the data that you want to modify within the server needs to be sent along with the request URL. 

{
    "product" : "Iphone 17 Pro max",
    "Price" : 1,29,999
}

5. Authorization and Authentication mechanism to access the data from the server through API 

- Authentication is all about checking whether the user is valid or not. 
- Authorization is all about whether the user is having enough permissions to access the data or not. 

There are different types of authorization mechanisms we can implement while building the API. 

No auth => No authorization required. Anyone can access any data. 
Basic Auth => Basic Authorization: meaning accessing the data by using a user name and password 
API key => Unique key generated by the developer will be used to access the data from the server. 
Bearer token or JWT token => Any key generated by the developer to access the information based on the user roles and permissions, along with an expiry date 
OAuth => Open authorization is all about maintaining additional security by adding additional layers. That means when the user want to access the information from the server , 
User should generate a temporary bearer token by providing consumer key and secret code along with access token. 
Later, by using a temporary bearer token, they can access whatever data they want. 

6. Request Headers : Request headers are all about the additional metadata to be shared along with the API request. 

{
  "Content-Type": "application/json",
  "Accept": "application/vnd.github.v3+json",
  "Authorization": "Bearer <YOUR-TOKEN>"
}

## Requirements to be collected from the developer to verify the API Response

1. Response Code / Status Code : Response code is all about the unique number generated by the server every time when you are going to send the request. Based on the response code, we can understand the status of the request. 

1XX => Informational Codes (100 -Processing)
2XX => Symbol of Success (200 - OK , 201 - Created, 204 - No Content )
3XX => Redirectional status codes (Temporary redirection or permanent redirection due to change in the server)
4XX => Client-side errors ( 401 Unauthorized , 400 Bad Request , 404 Not found , 422 Unprocessable Entity  )
5XX => Server-side error (500 Internal Server Error , 502 Bad Gateway , 503 Service Unavailable , 504 Gateway Timeout )

2. Response Body Validation 

Request:
GET https://api.amazon.com/mobiles/iphone16?price<=50000

Response : 
{
   "mobiles" :{
      "product":"Iphone 16",
      "price": 49999,
      "RAM" : "16Gb"
   }
}

3. Response Schema Validation 
Schema is all about the format and the nature of the data that we are expecting within the response. 

{
"mobiles" : object
"product":string
"price":number
"RAM":string
}

4. Response Header Validations 

"session-id" : "dgjhwgfdrwq4352367512"

5. Max response time 
Maximum time any request can take to respond back 

Ex:
Max Response time is "2" seconds. 

6. Error handling related validations. 
For each and every error made by the user while sending the request, what kind of error should it display


## API TESTING - GITHUB API

APPLICATION UI :  https://github.com/
API DOCUMENTATION : https://docs.github.com/en/rest?apiVersion=2026-03-10



## Scenarios:

1. Creating a duplicate repository with valid credentials 
2. Create a valid repository with valid credentials. 
3. Search and get existing repository with valid credentials. 
4. Update the existing repository details with valid credentials. 
5. Delete the existing repository with valid credentials. 

## How to use the Postman tool - Step By Step

1. Create the postman workspace. (Workspaces => Create => Enter Workspace name => Create Workspace Button)
2. Create environment (To store all the configuration-related details) (Environment => Create => Update Name => Create Environment)
3. Add the API collection. (The folder that contains all the API requests related to our application ) (Collections => Create => Update collection name => Press Enter Button)