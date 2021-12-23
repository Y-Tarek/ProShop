# ProShop
An E-Shopping MERN Stack application, You can browse products, Attach them into Shopping Cart and Purchase them.
User Authintication and Authorization Provided, Admin Screens and Activites from adding,updating and deleting user,products and orders.

## Prerequisite
>nodejs v16.13.1 

>mongodb

>reactjs

## API Documentation

>This Link For an Online API docs: https://documenter.getpostman.com/view/4868809/UVRDGQs9

##Packages

Node Packages:

   Request | Performs
------------ | -------------
/register | Registeration of a user with data in the server/db/models/user.js file
/login | Authinticating a user by UserNameOrEmail and password feilds
/post | Uploading image and data of a missing or found child you can find these data in server/db/models/post.js file
/search/gender&type | Search for a missing or found child with an image (type:status of the searched child missing or found,gender:gender of the child)
/profile | Getting user data
/editProfile | Updating user data
/myPosts | Getting the posts of current user
/mypost/id | Getting a specific Post
/deletePost/id | Deleting specific Post
/logout | Sign out Current User
