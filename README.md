# praktikum-2

Repository for the Second Praktikum for FERI, containing the Shopping list application

# Repo structure

## Prerequisites:

Make sure you have the following tools installed on your machine:

Docker (installation instructions)
Java Development Kit (JDK) 17 or higher
Maven

## Getting started
Follow the steps below to setup project up and running:
1. Clone this repository to your local machine using git clone
2. Navigate to your project directory
3. Build the Spring Boot application using 'mvn clean package'
4. Run command: "docker compose -f docker-compose.yaml -d --build" to build Docker.
5. Run the Spring Boot application
6. The Spring Boot application should now be running locally and connected to the MongoDB database.

## Configuration
The Spring Boot application is configured to connect to the MongoDB database using the following configuration:
- Host: localhost
- Port: 27017
- Database: praktikumdb
- Username: rootuser
- Password: rootpass
