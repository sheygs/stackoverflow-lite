[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Stackoverflow-lite

Stack Overflow Lite API implementing CRUD features.

## Features

The following features have been implemented for this project

```
 Models for the following features
  - Answers
  - Questions
  - Users
Helper methods have also been defined to enable good code reuse

```

## Requirements

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/).

## Installation 📦

```bash
   $ git clone https://github.com/sheygs13/stackoverflow-lite.git
   $ cd stackoverflow-lite
   $ npm install
```

### Rename _.env.sample_ to _.env_ and fill required placeholders

```bash
JWT_SECRET_KEY=XXXXXXXXXXXX
DB_URL=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@cluster0.ywofj.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
```

## Run

```bash
   $ npm run dev
```

Visit http://localhost:3000/

### Available Endpoints

`/api/v1/`

| method | route           | description              |
| ------ | --------------- | ------------------------ |
| POST   | /auth/signup    | Register User            |
| POST   | /auth/signin    | Login User               |
| GET    | /users          | Get all registered users |
| GET    | /users?search=q | Search user by name      |

`/api/v1/questions`

| method | route                | description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | /questions           | Ask question                             |
| GET    | /questions           | View all questions                       |
| GET    | /:questionId/vote    | Upvote or downvote question              |
| GET    | /?search=q           | Search question by title                 |
| POST   | /:questionId/answers | Answer Question                          |
| GET    | /:questionId/answers | Get all answers from a specific question |

`/api/v1/answers`

| method | route    | description     |
| ------ | -------- | --------------- |
| GET    | /answers | Get all answers |

## Test

```bash
   $ npm test
```

## API Documentation

- Visit [Here](https://documenter.getpostman.com/view/12241279/T1Dv9EwQ?version=latest)

## Examples

- Live demo https://stackoverflow-lite.herokuapp.com
