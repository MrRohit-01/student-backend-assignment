# Student Management API

A simple in-memory Node.js API using Express that fetches user data from an external API and allows CRUD operations on students. Also includes a dashboard endpoint for basic stats.

---

## Setup & Installation

1. Unzip the project folder.
2. Open a terminal and navigate to the project folder.
3. Run the following commands:

pnpm install
pnpm run dev

4. The server will start running at: http://localhost:3000

---

## API Endpoints

### 1. Get All Students

**Endpoint:** GET /students

**Description:** Returns all students currently stored in memory.

**Response Example:**
{
  "users": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "age": 25,
      "isActive": true
    },
    ...
  ]
}

---

### 2. Create a New Student

**Endpoint:** POST /students

**Description:** Adds a new student to the in-memory database.

**Request Body Example:**
{
  "id": 101,
  "firstName": "Alice",
  "lastName": "Smith",
  "age": 22,
  "isActive": true
}

**Response Example:**
{
  "msg": "Student Data Added"
}

---

### 3. Get Student by ID

**Endpoint:** GET /students/:id

**Description:** Fetches a single student by their ID.

**Response Example (Found):**
{
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "age": 25,
    "isActive": true
  }
}

**Response Example (Not Found):**
{
  "msg": "id not found"
}

---

### 4. Delete Student by ID

**Endpoint:** DELETE /students/:id

**Description:** Removes a student from the in-memory database using their ID.

**Response Example (Success):**
{
  "msg": "id removed"
}

**Response Example (Not Found):**
{
  "msg": "id not found"
}

---

### 5. Dashboard Stats

**Endpoint:** GET /dashboard/stats

**Description:** Provides statistics about users, such as total users, average age, active users, and latest added user.

**Response Example:**
{
  "totalUsers": 30,
  "totalProjects": 0,
  "totalEmails": 30,
  "avgAge": "28.3",
  "activeUsers": 20,
  "latestUser": {
    "id": 30,
    "firstName": "Jane",
    "lastName": "Doe",
    "age": 29,
    "isActive": true
  }
}

---

## Brief Overview

- /students: Retrieve or add users in memory.
- /students/:id: Retrieve or delete a specific student by ID.
- /dashboard/stats: Shows statistics for users in memory.
- Data is initially fetched from https://dummyjson.com/users and stored in memory.
- Note: All changes are temporary and reset when the server restarts.

---

## Quick Test API

You can test all the endpoints directly using `curl` from your terminal.

### 1. Get All Students
curl -X GET http://localhost:3000/students

### 2. Create a New Student
curl -X POST http://localhost:3000/students \
-H "Content-Type: application/json" \
-d '{"id":101,"firstName":"Alice","lastName":"Smith","age":22,"isActive":true}'

### 3. Get Student by ID
curl -X GET http://localhost:3000/students/101

### 4. Delete Student by ID
curl -X DELETE http://localhost:3000/students/101

### 5. Get Dashboard Stats
curl -X GET http://localhost:3000/dashboard/stats

**Note:** Replace the `id` in the commands above with any valid student ID you want to test. The changes are stored in memory, so restarting the server will reset all data.
