# BlogNest 📝

A modern, full-stack blogging platform built with Node.js, Express, MongoDB, and vanilla JavaScript. BlogNest allows users to create, edit, and manage their blog posts with a clean and intuitive interface.

## ✨ Features

- **User Authentication**: Secure signup and login with JWT-based authentication
- **Create & Edit Posts**: Rich text editor for creating and editing blog posts
- **Image Upload**: Support for uploading and managing blog post images
- **Personal Dashboard**: Manage all your blog posts in one place
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Security**: Built with security best practices including helmet, rate limiting, and XSS protection

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling
- **Vanilla JavaScript** - Client-side logic
- **Fetch API** - HTTP requests

## 📁 Project Structure

```
BlogNest/
├── BlogWebsite/
│   ├── backend/
│   │   ├── config/          # Database and configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware (auth, upload)
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── uploads/         # Uploaded images
│   │   ├── server.js        # Entry point
│   │   └── package.json     # Dependencies
│   └── frontend/
│       ├── CSS/             # Stylesheets
│       ├── js/              # JavaScript files
│       ├── index.html       # Home page
│       ├── login.html       # Login page
│       ├── signup.html      # Signup page
│       ├── dashboard.html   # User dashboard
│       ├── create.html      # Create post page
│       ├── edit.html        # Edit post page
│       ├── my-blogs.html    # User's blogs
│       ├── post.html        # Single post view
│       └── aboutus.html     # About page
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivekvernekar26/BlogNest.git
   cd BlogNest/BlogWebsite
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blognest
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   
   # Or using mongod directly
   mongod --dbpath ./mongo_data
   ```

5. **Run the backend server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open the frontend**
   
   Open `frontend/index.html` in your browser or use a local server:
   ```bash
   # Using Python
   cd ../frontend
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server -p 8000
   ```

7. **Access the application**
   - Frontend: `http://localhost:8000`
   - Backend API: `http://localhost:5000`

## 🎯 How to Run the Project

Follow these steps to run the BlogNest application on your local machine:

### Step 1: Start MongoDB

Open a terminal and navigate to the backend directory, then start MongoDB:

```bash
cd /path/to/BlogNest/backend
mongod --dbpath ./mongo_data --logpath ./mongod.log --fork
```

This will start MongoDB in the background using the local `mongo_data` directory.

### Step 2: Start the Backend Server

In the same terminal (or a new one), navigate to the backend directory and start the server:

```bash
cd /path/to/BlogNest/backend
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB connected: localhost
```

**Keep this terminal running** - the backend server is now active on `http://localhost:5000`

### Step 3: Start the Frontend Server

Open a **new terminal window** and navigate to the frontend directory:

```bash
cd /path/to/BlogNest/frontend
python3 -m http.server 8000
```

Alternatively, you can use Node.js http-server:
```bash
npx http-server -p 8000
```

**Keep this terminal running** - the frontend is now being served on `http://localhost:8000`

### Step 4: Access the Application

Open your web browser and navigate to:
```
http://localhost:8000
```

You can now:
- **Sign up** for a new account at `http://localhost:8000/signup.html`
- **Log in** at `http://localhost:8000/login.html`
- **Create blog posts** after logging in
- **View all posts** on the homepage
- **Manage your posts** from the dashboard

### Stopping the Application

To stop the servers:

1. **Stop Frontend Server**: Press `Ctrl+C` in the terminal running the frontend server
2. **Stop Backend Server**: Press `Ctrl+C` in the terminal running the backend server
3. **Stop MongoDB** (optional):
   ```bash
   mongod --shutdown --dbpath ./backend/mongo_data
   ```

### Quick Start Commands

For quick reference, here are the commands to run everything:

```bash
# Terminal 1 - Backend
cd backend
mongod --dbpath ./mongo_data --logpath ./mongod.log --fork
npm run dev

# Terminal 2 - Frontend
cd frontend
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Blog Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single blog post
- `POST /api/posts` - Create new blog post (authenticated)
- `PUT /api/posts/:id` - Update blog post (authenticated)
- `DELETE /api/posts/:id` - Delete blog post (authenticated)
- `GET /api/posts/user/my-posts` - Get user's blog posts (authenticated)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Helmet**: Security headers to protect against common vulnerabilities
- **Rate Limiting**: Prevents brute-force attacks
- **XSS Protection**: Sanitizes user input
- **CORS**: Configured for cross-origin requests
- **HPP**: HTTP Parameter Pollution protection

## 🎨 Features in Detail

### User Authentication
- Secure signup with password hashing
- JWT-based login system
- Protected routes requiring authentication
- Token stored in localStorage

### Blog Management
- Create posts with title, content, and images
- Edit existing posts
- Delete posts
- View all posts or filter by user

### Image Upload
- Support for image thumbnails
- Secure file upload with Multer
- Image storage in uploads directory
- Automatic image serving

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👤 Author

**Vivek Vernekar**
- GitHub: [@vivekvernekar26](https://github.com/vivekvernekar26)

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB for the powerful database
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Happy Blogging! 📝✨**
