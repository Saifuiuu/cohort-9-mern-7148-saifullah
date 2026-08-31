import {render,screen,fireEvent,waitFor} from "@testing-library/react"
import Login from "./Login"
import {useAuth} from "../context/AuthContext"
import {useNavigate} from "react-router-dom"

jest.mock("../context/AuthContext",()=>({
  useAuth:jest.fn(),
}))

jest.mock("react-router-dom",()=>({
  ...jest.requireActual("react-router-dom"),
  useNavigate:jest.fn(),
}))

describe("Login",()=>{
  const mockLogin=jest.fn()
  const mockNavigate=jest.fn()

  beforeEach(()=>{
    jest.clearAllMocks()

    useAuth.mockReturnValue({
      login:mockLogin,
    })

    useNavigate.mockReturnValue(mockNavigate)
  })

  test("shows login form",()=>{
    render(<Login/>)

    expect(
      screen.getByRole("heading",{name:"Welcome back"})
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText("you@example.com")
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText("••••••••")
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button",{name:"Login"})
    ).toBeInTheDocument()
  })

  test("allows user to enter email and password",()=>{
    render(<Login/>)

    const emailInput=screen.getByPlaceholderText("you@example.com")
    const passwordInput=screen.getByPlaceholderText("••••••••")

    fireEvent.change(emailInput,{
      target:{value:"saif@gmail.com"},
    })

    fireEvent.change(passwordInput,{
      target:{value:"12345"},
    })

    expect(emailInput).toHaveValue("saif@gmail.com")
    expect(passwordInput).toHaveValue("12345")
  })

  test("calls login and navigates to dashboard on successful login",async()=>{
    mockLogin.mockResolvedValue({})

    render(<Login/>)

    fireEvent.change(
      screen.getByPlaceholderText("you@example.com"),
      {target:{value:"saif@gmail.com"}}
    )

    fireEvent.change(
      screen.getByPlaceholderText("••••••••"),
      {target:{value:"12345"}}
    )

    fireEvent.click(
      screen.getByRole("button",{name:"Login"})
    )

    await waitFor(()=>{
      expect(mockLogin).toHaveBeenCalledWith(
        "saif@gmail.com",
        "12345"
      )
    })

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
  })

  test("shows error when login fails",async()=>{
    mockLogin.mockRejectedValue(
      new Error("Invalid credentials")
    )

    render(<Login/>)

    fireEvent.change(
      screen.getByPlaceholderText("you@example.com"),
      {target:{value:"saif@gmail.com"}}
    )

    fireEvent.change(
      screen.getByPlaceholderText("••••••••"),
      {target:{value:"wrong"}}
    )

    fireEvent.click(
      screen.getByRole("button",{name:"Login"})
    )

    expect(
      await screen.findByText("Invalid credentials")
    ).toBeInTheDocument()

    expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard")
  })

  test("navigate to signup when we click signup button",()=>{
    render(<Login/>)

    fireEvent.click(
      screen.getByRole("button",{name:"Sign up"}) )

    expect(mockNavigate).toHaveBeenCalledWith("/signup")
  })
})