# **Auth Tutorial — Setup Guide**

This guide explains how to set up the Node.js authentication tutorial, initialize the MySQL database using Docker, and run the application in environments such as GitHub Codespaces.

---

## **Prerequisites**

Before you begin, ensure you have:

* **Node.js** and **npm** installed
* **Docker** installed and running
* (Recommended) **GitHub Codespaces** environment

---

## **1. Install Dependencies & Start MySQL with Docker**

Copy and paste the following commands into your terminal.
When prompted for a password, enter **`root`**:

```bash
npm install

docker rm -f $(docker ps -aq)
docker rmi $(docker images -q)
docker system prune -a --volumes -f

docker run --name auth-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=auth_db -p 3306:3306 -d mysql:8

docker exec -it auth-mysql mysql -u root -p
```

These commands:

* Install project dependencies
* Clean existing Docker containers and images
* Start a fresh MySQL instance
* Open an interactive MySQL shell

---

## **2. Create the Database Table**

Once inside the MySQL shell, run the following SQL to create the `users` table:

```sql
USE auth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

This table stores registered user data.

---

## **3. Start the Application**

Return to your terminal (open new instance) and start the Node.js server:

```bash
npm start
```

You should now see output indicating the server is running and MySQL is connected.

---

## **4. Codespaces Port Visibility**

If you are using GitHub Codespaces and cannot access the application:

1. Open the **Ports** tab
2. Locate port **3000**
3. Change the visibility from **Public** to **Private** if necessary

This resolves most access-related issues in Codespaces.

---

## **You're Ready to Go!**

Your authentication app is now fully set up and ready to use. In the `PORTS` tab click the `Forwarded Address` of port 3000 to use the app.
