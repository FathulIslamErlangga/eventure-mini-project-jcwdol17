import request from "supertest";
import express from "express";
import { Auth } from "../src/controllers/auth.controller";
import authRouter from "../src/routes/auth.route";
import { appSuccsess } from "../src/utils/responses";

// Mock Controller Methods
jest.mock("../src/controllers/auth.controller", () => {
  return {
    Auth: jest.fn().mockImplementation(() => ({
      registerUser: jest.fn((req, res) =>
        res.status(201).json({ message: "User registered" })
      ),
      loginUser: jest.fn((req, res) =>
        res.status(200).json({ token: "fake-jwt-token" })
      ),
      getUser: jest.fn((req, res) =>
        res.status(200).json({ user: { id: 1, name: "Test User" } })
      ),
      logoutUser: jest.fn((req, res) =>
        res.status(200).json({ message: "Logged out" })
      ),
      forgotPassword: jest.fn((req, res) =>
        res.status(200).json({ message: "Reset link sent" })
      ),
    })),
  };
});

describe("Auth Routes", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json()); // Middleware untuk parsing JSON
    app.use("/api", authRouter());
  });

  it("should register a user (POST /auth/v1)", async () => {
    const res = await request(app).post("/api/auth/v1").send({
      name: "shinchan",
      email: "shinchan@mail.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "User registered" });
  });

  it("should login a user (POST /auth/v2)", async () => {
    const res = await request(app).post("/api/auth/v2").send({
      email: "shinchan@mail.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should send forgot password email (POST /auth/v5)", async () => {
    const res = await request(app).post("/api/auth/v5").send({
      email: "shinchan@mail.com",
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Reset link sent" });
  });
});
