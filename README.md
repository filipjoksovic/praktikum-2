# praktikum-2

Repository for the Second Praktikum for FERI, containing the Shopping list application

# Repo structure

## Prerequisites:

Make sure you have the following tools installed on your machine:

Docker (installation instructions)

## Getting started

Follow the steps below to setup project up and running:

1. Clone this repository to your local machine using git clone
2. Navigate to your project directory
3. Run docker compose up --build inside the app directory

## Configuration

The Spring Boot application is configured to connect to the MongoDB database using the following configuration:

- Host: mongodb
- Port: 27017
- Database: praktikumdb
- Username: rootuser
- Password: rootpass

## Accessing services

1. Spring Boot application: http://localhost:8080
2. Nest.js openai service: http://localhost:3000
3. mongo-express: http://localhost:8081
