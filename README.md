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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

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
