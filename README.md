# CS5-7319 Final Project: Restaurant Reservation System  
**Group 5: Darshilkumar, Jainul, Sreemaan**  

---

## Overview  
This project showcases two architectural designs for a **Restaurant Reservation System**:  
1. **Client-Server Architecture**  
2. **Microservices Architecture**  

Both versions were developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  

---

## 1. Client-Server Architecture  

### Setup and Run  
1. **Install Required Tools**  
   - Install [Node.js](https://nodejs.org/).  
   - Install [MongoDB](https://www.mongodb.com/try/download/community) and create a database named `RestaurantSystem` (default port: `27017`).  

2. **Clone the Repository**  
   ```bash
   git clone https://github.com/darshil180/CS5-7319-Final-Project-Group-5-Darshilkumar-Jainul-Sreemaan
   cd Selected

3. **Install Dependencies**  
   cd Client-Server-backend && npm install
   cd ../Client-Server-Frontend && npm install

4. **Start the Application**  
   cd Client-Server-backend && npm run start
   cd ../Client-Server-Frontend && npm start

5. **Access the Application**  
   http://localhost:5000

---

## 2. Microservices Architecture

For the **Microservices Architecture**, follow these steps to run each service individually in Docker:

### 1. Navigate to Each Service Folder  
For each microservice, you need to perform the following steps. Repeat these instructions for each service (e.g., `auth-service`, `user-service`, etc.).

### 2. Install Dependencies  
First, navigate to the folder of the specific service (e.g., `auth-service`) and install the required dependencies:

cd path/to/auth-service
npm install

### 3. Build the Docker Image
For each service, run the following command to build the Docker image:

docker build -t auth-service .

### 4. Run the Docker Container
Run the service in Docker with the proper ports, setting any required environment variables (e.g., from a .env file). For the auth-service, you would run:

docker run -d -p 3002:3001 --env-file .env --name auth-service auth-service

### Note:

Replace auth-service with the corresponding service name for each microservice (e.g., user-service, reservation-service, etc.).
Ensure that each microservice runs on a different port to avoid conflicts (e.g., auth-service on port 3002, user-service on port 3003, etc.).

---

## Application Features  

1. User Registration and Login
Users can register and log in with their email and password.
2. Menu Search and Order Management
Search for restaurants by location or cuisine.
3. Table Reservation
View available slots and book a table for your desired date and time.

### Repeat for All Services
For every microservice in your architecture, repeat the above steps:

Navigate to the service folder.
Install dependencies (npm install).
Build the Docker image (docker build).
Run the service in Docker with the appropriate ports (docker run).

---

## Rationale for Choosing Client-Server Architecture
The Client-Server Architecture was chosen for this project because:

1. Simplicity: It is easier to develop, deploy, and debug compared to Microservices.
2. Cost-Effective: Lower infrastructure and maintenance costs.
3. Project Scope: The current size and requirements of the project are better suited to a centralized architecture.

---

## Technology Stack

## Technology Stack  

| **Component**       | **Technology**         |  
|---------------------|------------------------|  
| **Frontend**        | React.js               |  
| **Backend**         | Node.js, Express.js    |  
| **Database**        | MongoDB                |  
| **Containerization**| Docker (Microservices) |  
