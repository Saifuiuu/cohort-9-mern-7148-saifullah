import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Signup", () => {
  const mockSignup = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({
      signup: mockSignup,
    });

    useNavigate.mockReturnValue(mockNavigate);
  });

  test("shows signup form", () => {
    render(<Signup />);

    expect(
      screen.getByRole("heading", { name: "Signup" })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Signup" })
    ).toBeInTheDocument();
  });

  test("allows user to enter signup information", () => {
    render(<Signup />);

    const nameInput =
      screen.getByPlaceholderText("Enter your name");

    const emailInput =
      screen.getByPlaceholderText("Enter your Email");

    const passwordInput =
      screen.getByPlaceholderText("Enter your password");

    fireEvent.change(nameInput, {
      target: { value: "Saif" },
    });

    fireEvent.change(emailInput, {
      target: { value: "saif@gmail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "12345" },
    });

    expect(nameInput).toHaveValue("Saif");
    expect(emailInput).toHaveValue("saif@gmail.com");
    expect(passwordInput).toHaveValue("12345");
  });

  test("calls signup and navigates to dashboard on successful signup", async () => {
    mockSignup.mockResolvedValue({});

    render(<Signup />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter your name"),
      {
        target: { value: "Saif" },
      }
    );

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
      screen.getByRole("button", { name: "Signup" })
    );

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        "Saif",
        "saif@gmail.com",
        "12345"
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("shows error when signup fails", async () => {
    mockSignup.mockRejectedValue(
      new Error("Email already exists")
    );

    render(<Signup />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter your name"),
      {
        target: { value: "Saif" },
      }
    );

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
      screen.getByRole("button", { name: "Signup" })
    );

    expect(
      await screen.findByText("Email already exists")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard");
  });
});