# Daily Bugle App using MERN Stack

[Resources of MERN Stack](https://www.mongodb.com/languages/mern-stack-tutorial)

### Basic Structure:
1. MongoDB as database
2. Express.js framework + Node.js for backend server
3. [React.js](https://react.dev/) as frontend framework

  
Note:

1. Ensure MongoDB is working correctly on your machine
Either through MongoDB CLI or MongoDB Compass, create database `DailyBugle`; 
Then inside the `DailyBugle` database, create the following collections
```
users
comments
articles
advertisement
```

2. cd into an empty directory and clone this repository locally with 
```
git clone https://github.com/YuanzhanGao/daily-bugle.git
```
3. Go into the `/client` folder and run 
```
npm install
```
#### Why?
The `client` folder is created with the `npx create-react-project client` command, which conveniently created a `.gitignore` file that ignores the `/node_modules` folder, while the `/server` folder is initiated with `npm init -y`, whose `.gitignore` is added later on.

4. In a terminal, cd into the `server` folder and run
```
node server.js
```
to start the backend process.

5. In a different terminal, cd into the `client` folder and run
```
npm start
```
to start the React app.

### This is an ongoing document aimed at fully explaining the MERN structure. 

