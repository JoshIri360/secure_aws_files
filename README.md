# Secure Files AWS

Secure Files AWS is a repository designed to store files on the cloud using hybrid cryptography without RSA. It integrates with an Amazon S3 bucket and incorporates Firebase Authentication for secure access control.

## Table of Contents

1. [Client](#client)
2. [Server](#server)
3. [Usage](#usage)

---

## Client

The `client` folder contains a React application that serves as the frontend for Secure Files AWS.

### Getting Started

To start the client application, follow these steps:

1. Open a terminal and navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The client application will be accessible at `http://localhost:3000` in your web browser.

---

## Server

The `server` folder contains a Node.js Express server responsible for handling file uploads, downloads, and interactions with Amazon S3.

### Getting Started

To start the server, follow these steps:

1. Open a terminal and navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Copy the `.env.example` file to create a new `.env` file with the following command:

   ```
   cp .env.example .env
   ```

   Replace `<your_AWS_access_key_id>`, `<your_AWS_secret_access_key>`, `<your_AWS_bucket_name>`, and `<AWS_REGION>` with your AWS credentials and bucket information.

4. Start the server:

   ```bash
   npm start
   ```

The server will be running at `http://localhost:4000`.

---

## Usage

Once both the client and server are running, you can use the application to upload and download securely on Amazon S3. Make sure to authenticate using Firebase Authentication to access your files securely.

---
