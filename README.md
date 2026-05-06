# Egy Go Internship Project

A simple Node.js application using Domain-Driven Design concepts with Express, Kafka, and MongoDB.

## Project Structure

- `src/server.js` - application entry point
- `src/API/controllers/postController.js` - request handling logic
- `src/API/routes/postRoutes.js` - Express routes
- `src/Application/use-cases/` - business use-cases
- `src/Domain/entities/Post.js` - domain entity
- `src/Domain/interfaces/IPostRepository.js` - repository interface
- `src/Infrastructure/database/` - MongoDB connection and models
- `src/Infrastructure/repositories/MongoPostRepository.js` - MongoDB repository implementation
- `src/Infrastructure/messaging/` - Kafka producer and consumer

## Install

```bash
npm install
```

## Run

Start the application in development mode with automatic reload:

```bash
npm start
```

Start the application in production mode:

```bash
npm run start:prod
```

## Docker

Build and run the app with Docker Compose:

```bash
docker-compose up --build
```

This starts:

- MongoDB
- Zookeeper
- Kafka
- the API service on port `3000`

## EC2 / Docker on AWS

On an EC2 instance, use the same Docker commands after cloning the repo.
Make sure the EC2 security group allows inbound traffic for:

- `3000` for the API
- `9092` for Kafka (if you need external access)
- `27017` for MongoDB (if required)

## Notes

- The app expects MongoDB and Kafka services to be available if the messaging/database components are used.
- `nodemon` is used for development hot-reload.
- The main server entry point is `src/server.js`.
