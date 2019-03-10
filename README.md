# Custom News Feed Web Application
This project allows a user to view a handful of news sources and select articles that they desire to "save". Designed as an example of a nodejs backen api. The technology stack used is nodejs, lowdb as a local data source, and Ember.js as a rudimentary frontend (looks straight out of 1990). 

## Install and Run
To run the api run `npm install` and `npm start` in the custom-news-api directory.
The frontend requires Ember.js. To install run `npm install -g ember-cli@2.14.2` and `ember server` in the custom-news-client directroty.

## Use
When the application is running navigate to localhost:4200. A new user can be created or these credentials can be used to log in (username: mbriden, password: password). Each request (other than login and create user) require a JWT. The JWT is generated at login and stored in the client app, so refreshing the page will log you out. If the application were more robust this would be fxed, but for the time being think of the app as "super secure". 

## Requirements
* ember-cli: 2.14.2
* node: 10.14.1
* npm: 6.4.1
