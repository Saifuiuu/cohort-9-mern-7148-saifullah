import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoutes"

let mockAuth={
  user: null,
  loading: false}

jest.mock("../context/AuthContext",()=>({
  useAuth:()=>mockAuth}))

jest.mock("./Layout",()=>({children})=>(
  <div data-testid="mock-layout">{children}</div>))

const renderProtectedRoute=(initialRoute ="/")=>{
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }/>
        <Route path="/login" element={<div>Login Page</div>}/>
      </Routes>
    </MemoryRouter>)}

describe("ProtectedRoute",()=>{
  beforeEach(() => {
    jest.clearAllMocks()})

  test("shows loading state when authentication is loading",()=>{
    mockAuth={user:null,loading:true}
    renderProtectedRoute()
    expect(screen.getByText("Loading...")).toBeInTheDocument()})

  test("redirects to login when user is not authenticated",()=>{
    mockAuth={user:null,loading:false}
    renderProtectedRoute()
    expect(screen.getByText("Login Page")).toBeInTheDocument()
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument()})

  test("renders layout and children when user is authenticated",()=>{
    mockAuth={user:{name:"Saif"},loading:false}
    renderProtectedRoute()
    expect(screen.getByTestId("mock-layout")).toBeInTheDocument()
    expect(screen.getByText("Protected Content")).toBeInTheDocument()
  })})