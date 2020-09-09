# 350S20-36
Adi Bhati, Kevin Chen, Max Du, Jeffrey Qu

## Android App
All of the components for the android app, used by normal users. Note: uses Android API level 28. Code for the Penn Lost and Found app as the final project for CIS 350: Software Engineering. Allows users to post lost items, search through and respond to posts about items, chat with other users, and navigate a map to help Penn students have a sense of security with their items on campus. 

## AdminLTE-master
All of the components for our admin webapp. The webapp tracks user activity. Initially, admin account must be manually inserted into mongo to prevent anyone from being an admin.

## Running Instructions
First install all node dependencies with `npm install`. Then, start node server using `node index.js`. Android app can be found in AndroidApp folder and run using an emulator. The admin webapp is found in AdminLTE-master folder and can be run by first opening index.html.

## mongoDB notes
MongoDb Atlas account for us with the login

email: pennlostfound@gmail.com

After logging in, then connect to the existing cluster.
