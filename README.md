![logo_music_store](https://user-images.githubusercontent.com/3188163/129047175-6483412a-09a6-4e10-9fe8-705bf090da44.png)

# Music Store web app

## Client facing app
The client facing application allows users to search for songs, mark favorite ones, and download songs.

![client_app_1](https://user-images.githubusercontent.com/3188163/129047634-1f09a688-330a-4d8e-8a8b-e41b187432ef.jpg)

## Admin web app
The Admin web app allows to see the history of websocket connect/disconnect events, and to see the history of download requests.

### User authentication page
![admin_app_1](https://user-images.githubusercontent.com/3188163/129048085-451dc7f6-2ea0-4c5f-ac1a-aa547a9158ec.jpg)

### Download history
![admin_app_2](https://user-images.githubusercontent.com/3188163/129048157-b62a66ba-b631-4972-8bc2-438e53b235ee.jpg)

### Event history
![admin_app_3](https://user-images.githubusercontent.com/3188163/129048242-b0aa4467-8008-46e4-99eb-126fdb0f6804.jpg)

## Technologies stack
### Client facing web app
* Node.js + Express
* Websockets communication (using Socket.io)
* Plain JS
* CSS
* HTML5

### Admin web app
* Node.js + Express
* Websockets communication (using Socket.io)
* React
* Bootstrap
* HTML5

## How to run the project
1. npm install in the root directory
2. cd /server -> npm install
3. cd /ui -> npm install
4. npm start from the root folder

Default admin application user:
  - admin/admin
