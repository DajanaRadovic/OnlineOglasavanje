#  Online Advertising - Full Stack Application

This is a full stack application for online advertising, developed using Express.js for the backend, React.js for the frontend, and MongoDB for the database.

## Technologies

- **Backend:** Express.js
- **Frontend:** React.js
- **Database:** MongoDB

## Setup for backend

   First, initialize the Node.js project:
   
   ```bash
       npm init -y
   ```
  Install the required packages:
  
 ```bash
     npm install mongoose
     npm install express
     npm install dotenv
   ```
##  Setup for frontend

```bash
    npm install
  ```
  ```bash
    npm install bootstrap
  ```

### Starting the backend:
 Navigate to the backend directory and run:
  ```bash
  cd backend
  node app.js
  ```
### Running the seed script:

```bash
cd backend
node seed.js
```

---

### Starting the frontend:

 Navigate to the frontend directory and run:
   ```bash
     cd frontend
     npm start
  ```
---

## Home page

- A table displaying all ads is shown
- Unregistered users see Login and Register buttons

   ![Oglasi](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/oglasi.png)

## User Registration

   - The user enters a username, password, and phone number.
     
      - Username: minimum 3 characters
      - Password: minimum 6 characters
      - Phone: numbers only allowed

     ![Početna stranica](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/registracija.png)

## User Login

- After a successful login, the user can:
  - Add new ads
  - View all ads
  - Log out

  ![Nakon prijave](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/nakonLogovanja.png)

## Adding an ad

- The user enters the following information:
  - Ad title
  - Description
  - Image URL
  - Price
  - Category (from a dropdown menu)
  - City

     ![Oglasi](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/dodavanje.png)

##  Editing and Deleting Ads

- The options to edit and delete are available only to the ad owner.

##  Ad Details

- Displays a detailed description of the ad and information about the user who posted it.

  ![Detalji](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/detalji.png)

##  Ad Filtering

- By category (dropdown menu)
- By title (case-insensitive search)
- By price (minimum and/or maximum)
- Checkbox "Show mine only" — displays only the ads posted by the user

##  Pagination

- Displays 20 ads per page

---
## Application Security

- Input validation during registration
- JWT Authentication
- Password hashing using bcrypt
- User authorization for editing and deleting ads
- Using a .env file for sensitive data





