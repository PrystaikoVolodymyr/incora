# incora
Create the Node.js (Express) API:
1. /users POST - create user with the next fields: first_name (required, only letters),
last_name (only letters), email (required, unique, correct format), phone (correct format),
password (hash)
2. /login POST - create API for user login by email and password. Use JWT authentication
3. /users/:id GET - get 1 user by id.
4. /users/:id PUT - update user, add validation. Connect Socket.IO for sending push
notifications after user update.

In this project I use:
1) Express - for routing
2) Mongoose - for connect to DB (MongoDB)
3) JWT - for authentication
4) Bcrypt - for hash password
5) nodeMailer - for send push notifications on user email after update

In task I have to use PostgreSQL and Socket.IO , but if you give me more time, i can learn this frameworks and change this code

