# Disk Drive API

## Introduction

The Disk Drive API allows users to upload, download and delete files from a personal space reserved for them.

## Features

-   Create a user
-   Login and receive an identification token
-   Upload a file to a personal disk drive
-   Download a file
-   Create folders to organize files
-   Download folders in a compressed format (.zip)
-   See all of the files and folders inside the personal disk
-   Delete files and folders
-   Update profile information

## Technologies

Disk Drive API uses a number of open source technologies to work properly:

-   [Node JS](https://nodejs.org/en/)
-   [Express](http://expressjs.com/)
-   [MySQL](https://www.mysql.com/)

## Libraries

To make the API function the following packages are implemented from NPM:

-   [express-fileupload](https://www.npmjs.com/package/express-fileupload)
-   [mysql2](https://www.npmjs.com/package/mysql2)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [cors](https://www.npmjs.com/package/dotenv)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   [zip-a-folder](https://www.npmjs.com/package/zip-a-folder)

## Development

Disk Drive API uses a number of technologies to make the development easier:

-   [ESLint](https://eslint.org/)
-   [Morgan](https://github.com/expressjs/morgan)
-   [Nodemon](https://nodemon.io/)
-   [Prettier](https://prettier.io/)

## Installation

Disk Drive API requires [Node JS](https://nodejs.org/) v10+ to run.

Install the dependencies (also devDepencies if desired) and start the server.

```sh
cd api-disco-duro
npm i
```

Create a database on MySQL.

```sql
CREATE DATABASE <database_name>;
```

Change the file name "_.env.example_" to "_.env_" and introduce the variable values.

-   PORT - A port number for the server to listen
-   MYSQL_HOST - A valid host from MySQL
-   MYSQL_USER - A valid user from MySQL
-   MYSQL_PASS - A valid password associated with the MySQL user
-   MYSQL_DB - A valid database name
-   SECRET - A random alphanumeric string of characters

Initialize the database.

```sh
cd db
node initDB
```

Or

```sh
npm run initdb
```

## Launch

Finally start the server

```sh
node server
```

Or start the server in development mode.

```sh
npm run dev
```
