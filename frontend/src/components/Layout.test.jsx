import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Layout from "./Layout"

jest.mock("./Navbar", () => () => <nav data-testid="mock-navbar">Navbar</nav>)

describe("Layout",()=>{
  test("renders navbar and children correctly",()=>{
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Children Content</div>
        </Layout>
      </MemoryRouter>)

    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument()
    expect(screen.getByText("Test Children Content")).toBeInTheDocument()
  })})