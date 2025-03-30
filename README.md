# User management and Document based Q&A Interface Application

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)

## Description
The Document Management and RAG-based Q&A Application is designed to manage users, documents, and an ingestion process that generates embeddings for document retrieval in a Q&A setting. It features an NextJS frontend for user interaction with backend services.

## Features
- **User Authentication**: Sign Up, Login, and Logout interfaces.
- **User Management**: Admin-only access for managing users and assigning roles.
- **Document Management**: Interface to upload and manage documents.
- **Ingestion Management**: Interface to trigger and monitor ingestion status.
- **Q&A Interface**: User-friendly interface for asking questions and receiving answers with relevant document excerpts.

## Installation

![video]https://www.loom.com/share/1b9740fdf46b47169ecf0fe46701672b?sid=8a394463-30c6-4ba3-972d-33fa30505d28

### Prerequisites
Ensure the following are installed:
- **Node.js**  
- **Docker**  

### Steps
1. **Clone the repository**:
   
  ```bash
   git clone https://github.com/keshavsaini2607/user-management-app.git
  ```
2. **Setup Frontend:**
   
  ```bash
    cd user-management-app/client
    npm install
    npm run dev
  ```
  Access the frontend at: http://localhost:3000/

3. **Setup Backend:**

Open a new terminal and navigate to the backend directory:
  ```
    cd user-management-app/server
  ```

4. **Pull and run the Docker image:**

 ```
    docker pull keshavsaini0905/docify-server
    docker run -d -p 8000:8000 keshavsaini0905/docify-server
  ```
Backend API: http://localhost:8000/

5. **Access the Application:**:
Visit http://localhost:3000/ to use the application.

# Architecture Overview

This diagram illustrates the architectural design of the project, showcasing the interplay between various components and technologies.

![image](https://github.com/user-attachments/assets/b4dd0710-a512-4fa3-b77e-c83769a5bcfd)


**Key Components:**

1. **Client:** The frontend of the application, built using NextJS, handles user interactions and displays data.
2. **NextJS:** A powerful JavaScript library for building robust and scalable web applications. It facilitates the creation of dynamic and interactive user interfaces.
3. **Google Analytics 4:** This is a web analytics service provided by Google that allows you to track user behavior and website performance. It's likely integrated to collect data on user interactions with your application.
4. **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications. It provides a structured approach to organizing code and handling API requests.
5. **Prisma:** An object-relational mapper (ORM) that simplifies database interactions by providing a type-safe and intuitive way to work with data models. It connects the NestJS backend to the MongoDB database.
6. **MongoDB:** A flexible NoSQL database that excels in handling large volumes of unstructured data. It serves as the data storage layer for the application.
7. **AWS S3:** A cloud-based service provided by AWS designed to optimize, store, and deliver assets efficiently. It integrates with a NestJS backend to handle raw document uploads.


**Data Flow and Interactions**

1. **Client to NextJS:** The user interacts with the NextJS frontend, triggering actions like making requests or submitting forms.
2. **NextJS to NestJS:** NextJS sends requests to the NestJS backend, which handles the business logic and data processing.
3. **NestJS to Prisma:** NestJS interacts with the database using Prisma to fetch or store data as needed.
4. **NestJS to S3:** NestJS interacts with S3 to manage documents, uploading, or fetching them.
