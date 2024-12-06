# BackAPI

BackAPI is a Node.js application that provides a backend API for managing users, games, purchases, seasons, and recommendations. It uses Express.js for the server framework and Sequelize for ORM with SQLite as the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/backapi.git
    cd backapi
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    SECRET_KEY=your_secret_key
    ```

## Usage

Start the server:
```sh
npm start
```

## The server will start on the port specified in the .env file (default is 3000).

## API Endpoints
Auth
POST /api/auth/login: Login a user

## Users
GET /api/users: Get all users
POST /api/users: Create a new user
PUT /api/users/:id: Update a user
DELETE /api/users/:id: Delete a user

## Games
GET /api/game/all: Get all games
POST /api/game/add: Add a new game
DELETE /api/game/:id: Delete a game
GET /api/game/season/current: Get games by current season

## Purchases
POST /api/game/purchase: Make a purchase
GET /api/game/purchases/:userId: Get purchases by user
GET /api/game/date-report: Get purchase report by date

## Seasons
POST /api/seasons: Create a new season
GET /api/seasons: Get all seasons
PUT /api/seasons/:id: Update a season
DELETE /api/seasons/:id: Delete a season

## Recommendations
POST /api/recommendations/generate/:userId: Generate recommendations for a user
GET /api/recommendations/:userId: Get recommendations for a user

## Environment Variables
PORT: The port on which the server will run (default:<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> </vscode_annotation>3000)
SECRET_KEY: The secret key for JWT token generation
