import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login", () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({
      login: mockLogin,
    });

    useNavigate.mockReturnValue(mockNavigate);
  });

  test("shows login form", () => {
    render(<Login />);

    expect(
      screen.getByRole("heading", { name: "Login" })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });

  test("allows user to enter email and password", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Enter your Email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, {
      target: { value: "saif@gmail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "12345" },
    });

    expect(emailInput).toHaveValue("saif@gmail.com");
    expect(passwordInput).toHaveValue("12345");
  });

  test("calls login and navigates to dashboard on successful login", async () => {
    mockLogin.mockResolvedValue({});

    render(<Login />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter your Email"),
      {
        target: { value: "saif@gmail.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your password"),
      {
        target: { value: "12345" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Login" })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "saif@gmail.com",
        "12345"
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("shows error when login fails", async () => {
    mockLogin.mockRejectedValue(
      new Error("Invalid credentials")
    );

    render(<Login />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter your Email"),
      {
        target: { value: "saif@gmail.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your password"),
      {
        target: { value: "wrong" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Login" })
    );

    expect(
      await screen.findByText("Invalid credentials")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard");
  });

  test("navigates to signup when signup button is clicked", () => {
    render(<Login />);

    fireEvent.click(
      screen.getByRole("button", { name: "signup" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});