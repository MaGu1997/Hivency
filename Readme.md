
# Create Database server in postgresql with the following information
- Open PGADMIN
- Right-click "Servers" in the left navbar
    - Create -> Server
    - General = "Name" = Hivency
    - Connection = " Hostname/address" = localhost, "password"= password  // LEAVE EVERYTHING ELSE TO DEFAULT


# Git Clone the repository and navigate to the repo location
- type "npm install" in cmd to install the dependencies from package.json for node
- Navigate to pgconnection.js file
 IN const client = {
 	host: "localhost",
 	user: "postgres",
  	port: 5432,
  	password: "password",
  	database: "postgres",
}

Modify if you have made changed to your database

- Enter "nodemon app.js" in the terminal or cmd to run the server at port 3000

# ENDPOINTS 
- [POST] `http://localhost:3000/play`
    - post data: `{ name, move }`
    - response: `{ Result }`

Example: In cmd : curl -d '{"name":"Hivency", "move":"rock"}' -H "Content-Type: application/json" -X POST http://localhost:3000/play

- [GET] `http://localhost:3000/history/5/10`
    - 5 = Number of enteries needed (Limit) (Required)
    - 10 = Starting entry (Offset) (Optional)
    - response: `{ Result }`

Example: In cmd : curl http://localhost:3000/history/3/4

