# 📚 BookStore API

<img width="1446" height="926" alt="Screenshot 2026-10-12 134701" src="https://github.com/user-attachments/assets/aaca84cb-5395-47a9-b739-d84f50406000" />
<img width="1461" height="895" alt="Screenshot 2026-10-12 134707" src="https://github.com/user-attachments/assets/b9da5a9d-8092-464e-b9fb-575c461b2b12" />
<img width="1455" height="946" alt="Screenshot 2026-10-12 134717" src="https://github.com/user-attachments/assets/53da1b82-8f64-48a0-a29d-dbd906e7210d" />
<img width="1449" height="899" alt="Screenshot 2026-10-12 134722" src="https://github.com/user-attachments/assets/878be0a6-77e8-4e03-a2b9-88f0ee5d1a0e" />
<img width="1451" height="935" alt="Screenshot 2026-10-12 134727" src="https://github.com/user-attachments/assets/863010af-83ce-4013-9965-a5b10f2ab983" />
<img width="1444" height="951" alt="Screenshot 2026-10-12 134651" src="https://github.com/user-attachments/assets/e6c88c80-d497-4557-8fbc-5a72ee0e2920" />


A RESTful **BookStore API** built using Node.js, Express.js, MongoDB, and Mongoose. This API provides CRUD operations for managing books, including book image uploads, database integration, and centralized error handling.

## 🚀 Features

- 📖 Add a new book
- 📚 Retrieve all books
- 🔍 Retrieve a single book by ID
- ✏️ Update book details
- 🗑️ Delete a book
- 🖼️ Upload book cover images using Multer
- 🍃 MongoDB database integration
- ⚡ RESTful API architecture using Express.js
- 🛡️ Custom error-handling middleware
- 🔐 Environment configuration using dotenv
- 🔄 Automatic server restart using Nodemon
- 📁 Organized MVC-style project structure
- 🧪 API testing using Postman

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| Multer | Image and file uploads |
| dotenv | Environment variable management |
| Nodemon | Development server |
| Postman | API testing |
| Git & GitHub | Version control and source code hosting |

## 📂 Project Structure

```text
BookStore-API-main/
│
├── config/
│   └── db.js
│
├── controller/
│   └── bookController.js
│
├── middleware/
│   ├── httpError.js
│   └── upload.js
│
├── model/
│   └── bookData.js
│
├── router/
│   └── bookRouter.js
│
├── uploads/
│   └── Book images
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gnandipsinh/Book-Store_Api.git
```

### 2. Navigate to the Project Directory

```bash
cd Book-Store_Api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/BookStore
```

**Important:**
- Make sure MongoDB is installed and running if you use a local database.
- You can also use a MongoDB Atlas connection string.
- The environment variable must be named `MONGO_URI` because the database configuration reads `process.env.MONGO_URI`.
- Never commit your `.env` file or database credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

If the project is configured with a production start script, you can also use:

```bash
npm start
```

The local server will use the port specified in your `.env` file.

With the configuration above, the base URL is:

```text
http://localhost:5000
```

## 📡 API Endpoints

All endpoints below use the `/book` route prefix.

### 1. Add a Book

**Endpoint**

```http
POST /book/add
```

**Full URL**

```text
http://localhost:5000/book/add
```

**Purpose:** Creates a new book record in the database.

**Postman configuration:**

- Method: `POST`
- Body: `form-data`

| Key | Type | Description |
|---|---|---|
| `title` | Text | Book title |
| `author` | Text | Book author |
| `ISBN` | Text | Unique book ISBN |
| `description` | Text | Book description |
| `price` | Text | Book price |
| `bookImg` | File | Book cover image |

**Example values:**

| Key | Example |
|---|---|
| `title` | Atomic Habits |
| `author` | James Clear |
| `ISBN` | ISBN-10001 |
| `description` | A self-improvement book |
| `price` | 299 |
| `bookImg` | Select an image file |

The request uses `multipart/form-data` because it includes an image upload.

### 2. Get All Books

**Endpoint**

```http
GET /book/getAll
```

**Full URL**

```text
http://localhost:5000/book/getAll
```

**Purpose:** Retrieves all book records stored in MongoDB.

**Postman configuration:**
- Method: `GET`
- Body: Not required

The response includes the success status, message, total number of books, and book records.

### 3. Get Book by ID

**Endpoint**

```http
GET /book/:id
```

**Example**

```text
http://localhost:5000/book/YOUR_BOOK_ID
```

Replace `YOUR_BOOK_ID` with the MongoDB `_id` returned when a book is created.

**Purpose:** Retrieves a specific book by its MongoDB ID.

**Postman configuration:**
- Method: `GET`
- Body: Not required

### 4. Update a Book

**Endpoint**

```http
PUT /book/:id
```

**Example**

```text
http://localhost:5000/book/YOUR_BOOK_ID
```

**Purpose:** Updates an existing book's details.

**Postman configuration:**
- Method: `PUT`
- Body: `form-data`

Example fields:

| Key | Type | Example |
|---|---|---|
| `title` | Text | Updated Book Title |
| `author` | Text | Updated Author |
| `ISBN` | Text | ISBN-10001 |
| `description` | Text | Updated description |
| `price` | Text | 399 |
| `bookImg` | File | New cover image, if replacing it |

Use the existing MongoDB ID in the URL. Send only the fields you want to update.

### 5. Delete a Book

**Endpoint**

```http
DELETE /book/:id
```

**Example**

```text
http://localhost:5000/book/YOUR_BOOK_ID
```

**Purpose:** Deletes a book record from MongoDB using its ID.

**Postman configuration:**
- Method: `DELETE`
- Body: Not required

**Warning:** Deletion removes the selected book record from the database. Verify the ID before sending the request.

## 🧪 Testing with Postman

You can test the API endpoints using Postman.

### Recommended Testing Workflow

```text
1. POST   /book/add
          |
          v
2. GET    /book/getAll
          |
          v
3. GET    /book/:id
          |
          v
4. PUT    /book/:id
          |
          v
5. DELETE /book/:id
```

### Testing Notes

- Start the server before sending requests.
- Ensure MongoDB is connected.
- Use `form-data` for requests that upload images.
- Use the MongoDB `_id` returned by the API for ID-based operations.
- Use unique ISBN values when creating books if the database schema enforces ISBN uniqueness.

## 🏗️ Architecture

The project follows an MVC-style backend structure.

```text
          Client / Postman
                 |
                 v
              Express
                 |
                 v
               Router
                 |
                 v
             Controller
                 |
                 v
               Model
                 |
                 v
              MongoDB
```

### Router

Defines API endpoints and forwards requests to the appropriate controller functions.

### Controller

Implements book-related operations, including creation, retrieval, updates, and deletion.

### Model

Defines the book schema and provides database operations through Mongoose.

### Middleware

Handles file uploads and common HTTP errors.

### Configuration

Loads the MongoDB connection configuration and connects the application to the database.

## 📦 NPM Scripts

Run the development server:

```bash
npm run dev
```

Run the production server if the `start` script is configured:

```bash
npm start
```

Install project dependencies:

```bash
npm install
```

## 🔐 Security and Configuration

- Store database connection strings in `.env`.
- Add `.env` to `.gitignore`.
- Never publish database passwords, access tokens, or private credentials.
- Keep `node_modules/` out of version control.
- Validate incoming request data.
- Configure appropriate CORS policies when connecting a frontend application.

## 🔮 Future Improvements

Possible enhancements include:

- 🔐 JWT authentication
- 👤 User registration and login
- 👨‍💼 Admin authorization
- 🔎 Book search and filtering
- 📄 Pagination
- ⭐ Book reviews and ratings
- 🛒 Shopping cart
- 💳 Payment gateway integration
- ☁️ Cloud-based image storage
- 🚀 Deployment to a cloud hosting platform

## 👨‍💻 Author

**Gnandipsinh**

Full Stack Web Development Student

- GitHub: https://github.com/gnandipsinh
- Repository: https://github.com/gnandipsinh/Book-Store_Api

## ⭐ Support

If you find this project useful, consider giving the repository a star on GitHub.

---

**Made with ❤️ using Node.js, Express.js, and MongoDB.**
