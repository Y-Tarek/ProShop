# ProShop
A MERN Stack E-Shopping application, You can browse products, Attach them into Shopping Cart and Purchase them.
User Authintication and Authorization Provided, Admin Screens and Activites from adding,updating and deleting user,products and orders.

## Prerequisite
>nodejs v16.13.1 

>mongodb

>reactjs

## Installtion
   Cloning to the project: 
  
     git clone https://github.com/Y-Tarek/ProShop.git
   
   then run: 
      
      npm install 
      
    
   then go inside frontend folder:
        
        npm install
        
   then run:
        
        npm run dev
        
   This will run the server and the client concurently.
   
   If you wish to run the server or the client alone:
   
       npm run server | npm run client
       
   Inside backend folder there is a data contains dummy data for models,seeder.js is a file contains a Script that adds/delete this data into your database and to do so you run:
          
          node backend/seeder (importing data)
          node backend/seeder -d (deleting data)
          
   Information about running the app is provided in scripts section in package.json file.

## API Documentation

>This Link For an Online API docs: https://documenter.getpostman.com/view/4868809/UVRDGQs9

## Packages

Node Packages:

   Name | Link
------------ | -------------
express | https://www.npmjs.com/package/express
bcryptjs | https://www.npmjs.com/package/bcryptjs
dotEnv | https://www.npmjs.com/package/dotenv
mongoose | https://www.npmjs.com/package/mongoose
jsonwebtoken | https://www.npmjs.com/package/jsonwebtoken
concurently | https://www.npmjs.com/package/concurrently
nodemon | https://www.npmjs.com/package/nodemon
multer | https://www.npmjs.com/package/multer


React Packages:

  Name | Link
------------ | -------------
react-bootstrap | https://www.npmjs.com/package/react-bootstrap
react-router-dom | https://www.npmjs.com/package/react-router-dom
redux | https://www.npmjs.com/package/redux
react-redux | https://www.npmjs.com/package/react-redux
redux-devtools-extension| https://www.npmjs.com/package/redux-devtools-extension
react-paypal-button-v2 | https://www.npmjs.com/package/react-paypal-button-v2
axios | https://www.npmjs.com/package/axios
