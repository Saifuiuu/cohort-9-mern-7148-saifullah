import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const mockNavigate = jest.fn()
const mockLogout = jest.fn()

let mockUser = {
  name: "Saif",
  email: "saif@gmail.com"
}

jest.mock("../context/AuthContext", ()=>({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout
  })}))

jest.mock("react-router-dom", ()=>({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate}))

jest.mock("react-hot-toast", ()=>({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn()
  }}))

const renderNavbar = () => {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )}

describe("Navbar", ()=>{
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test("renders navbar with brand name and user initial", () => {
    renderNavbar()
    expect(screen.getByText("NoteNest")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "S" })).toBeInTheDocument()
  })

  test("falls back to question mark when user name is missing", () => {
    mockUser = null
    renderNavbar()
    expect(screen.getByRole("button",{name:"?"})).toBeInTheDocument()})

  test("toggles user popup menu when avatar button is clicked",()=>{
    mockUser={name:"Saif", email:"saif@gmail.com"}
    renderNavbar()
    const avatarButton=screen.getByRole("button",{name:"S"})
    fireEvent.click(avatarButton)
    expect(screen.getByText("Saif")).toBeInTheDocument()
    expect(screen.getByText("saif@gmail.com")).toBeInTheDocument()
    expect(screen.getByText("Logout")).toBeInTheDocument()
    fireEvent.click(avatarButton)
    expect(screen.queryByText("Logout")).not.toBeInTheDocument()})

  test("closes popup when clicking outside",()=>{
    mockUser={name:"Saif",email:"saif@gmail.com"}
    renderNavbar()
    const avatarButton=screen.getByRole("button",{name:"S"})
    fireEvent.click(avatarButton)
    expect(screen.getByText("Logout")).toBeInTheDocument()
    fireEvent.mouseDown(document)
    expect(screen.queryByText("Logout")).not.toBeInTheDocument()})

test("handles successful logout correctly", async()=>{
    try {
        mockUser = { name: "Saif", email: "saif@gmail.com" }
        mockLogout.mockResolvedValueOnce()
        renderNavbar()

        fireEvent.click(screen.getByRole("button",{name:"S"}))
        fireEvent.click(screen.getByText("Logout"))

        expect(mockLogout).toHaveBeenCalledTimes(1)

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login")
        })

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Logout successfully")
        })
    } catch (error) {
        throw new Error(`Logout test failed: ${error.message}`);
    }
})

test("handles logout failure correctly",async()=>{
    try {
        mockUser = { name: "Saif", email: "saif@gmail.com"}
        mockLogout.mockRejectedValueOnce(new Error("Logout failed"))
        renderNavbar()

        fireEvent.click(screen.getByRole("button",{name:"S"}))
        fireEvent.click(screen.getByText("Logout"))

        expect(mockLogout).toHaveBeenCalledTimes(1)

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Logout failed")
        })

        expect(mockNavigate).not.toHaveBeenCalledWith("/login")
    } catch (error) {
        throw new Error(`Logout test failed: ${error.message}`);
    }
})})