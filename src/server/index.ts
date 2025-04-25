
import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  firstName: string;
  lastName: string;
  emailDomain: string;
  password: string;
}

// In-memory user storage
const users: User[] = [];

// Helper functions
const parseUser = (userData: Omit<User, "id" | "firstName" | "lastName" | "emailDomain">) => {
  // Parse name into firstName and lastName
  const nameParts = userData.name.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  // Parse email to extract domain
  const emailDomain = userData.email.split("@")[1] || "";

  return {
    ...userData,
    id: uuidv4(),
    firstName,
    lastName,
    emailDomain,
  };
};

const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

// Create Express app
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8080", // Frontend URL
    credentials: true,
  })
);
app.use(
  session({
    secret: "auth-profile-app-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Declare session variables
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

// Validation middleware
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string) => {
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return phoneRegex.test(phone);
};

const validateSignup = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { name, email, phone, age, password } = req.body;

  // Check if all required fields are present
  if (!name || !email || !phone || age === undefined || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate phone format
  if (!validatePhone(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  // Validate age
  if (typeof age !== "number" || age < 13) {
    return res.status(400).json({ message: "Age must be a number and at least 13" });
  }

  // Check if email already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  next();
};

// Routes
app.post("/signup", validateSignup, (req, res) => {
  try {
    const userData = req.body;
    const newUser = parseUser(userData);
    users.push(newUser);

    // Set session
    req.session.userId = newUser.id;

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Set session
    req.session.userId = user.id;

    // Return user without password
    const { password: _password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

app.get("/me", (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For development/debugging
console.log("Server initialized. In-memory users store created.");
