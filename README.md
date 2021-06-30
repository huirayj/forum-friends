# Forum-Friends

## Description
Forum Friends is an application that allows users to message with other users in a format similar to a traditional forum or message board. After a user signs up or logs in (if they already have an account) they are then allowed to make posts and comment on posts created by other users. 

<img src="https://github.com/huirayj/forum-friends/blob/4afd4425bd4bc5df9db3ceb93c54f6ce69acecfa/public/images/login-screenshot.png" width="614" height="544">

Numerous node packages were used to create the backend/database side of the application, which allowed us to do things such as create/organize the database, encrypt passwords, track a user's session. We used the Materialize CSS framework to assist in developing the front-end in tandem with vanilla CSS. Express Handlebars allowed us to create a template for the HTML page that then takes the data from the back-end.

<img src="https://github.com/huirayj/forum-friends/blob/4afd4425bd4bc5df9db3ceb93c54f6ce69acecfa/public/images/posts-screenshot.png" width="614" height="544">

[Link to deployed project](https://forum-friends.herokuapp.com/)

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Contributors](#Contributors)
- [Project Demo](#Project Demo)
- [License](#License)

## Installation
This program can be run through a browser using the above link to the the deployed application. Alternatively, to run this application locally you will need to:
<ol>
  <li>Clone this repository to receive all of the files </li>
  <li>Set up your environment variables in a .env file</li>
  <li>Run "npm install" in the command line of your terminal to set up all of the dependencies</li>
  <li>Initialize your database by running the "schema.sql" file with MySQL</li>
  <li>Populate the existing database items by running "npm run seed" in your terminal</li>
  <li>Run "npm start" to start the application's connection</li>
  <li>Go to the url of the application (http//:localhost:3001) to begin using it</li>
 </ol>

## Contributors
This project was made possible through the contributions of [Justin](https://github.com/huirayj), [Ryan](https://github.com/ryanpaynt), [Josh](https://github.com/Jdogcrane), and [Nathan](https://github.com/nzerr57).

Breakdown of Roles
<ul>
  <li>Justin: Back end mainly Handling API related JavaScript</li>
  <li>Ryan: Back end mainly Database handling sequelize related JavaScript</li>
  <li>Joshua: Front end design handling styling and handlebar for Messenger, Dashboard and Edit-Posts</li>
  <li>Nathan: Front end design handling styling and handlebar for login</li>
</ul>

## Project Demo


## License 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2021 huirayj, ryanpaynt, jdogcrane, nzerr57

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
