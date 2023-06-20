# rideCoGrocery

The grocery list management web application is a mini-project designed to facilitate the creation, editing, and deletion of grocery items. The application is tailored explicitly for a single-family households to efficiently manage their grocery needs.

With this application, users can easily create a new grocery list and add items to it. Each item on the list can be edited or removed as necessary. Additionally, users have the ability to mark items as purchased, providing a visual indication of the things that have been acquired.

The application was built using a PERN(PostgreSQL, Express, React, Node) stack. 

Features Implemented: 
1. User Authentication (Login/Register/Logout) using bCrypt for hashing passing and jwt to set authentication cookies, to change user screen dynamicall
2. Multiple list creation for better organization
3. Sharing lists with family members from which they can add/edit/delete/purchase items from
4. Adding items to specific lists add/edit/delete/

### Environment variables
**Ensure that that you are on the master branch and your client folder contains a .env file with the variable to send requests to the server**

```
REACT_APP_BACKEND_HOST = http://localhost:8000
```

### Application usage

```
cd .\client
docker build -t client .

cd .\server
docker build -t server .
docker-compose up
open localhost:3000
```

### UI Flow for the application for ease of understanding:

![UI Flow](https://github.com/rohanafsan/rideCoGrocery/blob/master/UI%20Flow%20-%20RideCoGrocery.jpeg)


```
Enjoy!!
```



