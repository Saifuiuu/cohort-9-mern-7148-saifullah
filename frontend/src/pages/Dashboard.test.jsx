import {render,screen,waitFor,fireEvent} from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import Dashboard from "./Dashboard"
import api from "../services/axios"

const mockNavigate=jest.fn();
jest.mock("../services/axios",()=>({
  __esModule:true,
  default:{
    get:jest.fn(),
    delete:jest.fn()
  }
}));
jest.mock("react-hot-toast",()=>({
  __esModule:true,
  default:{
    success:jest.fn(),
    error:jest.fn()
  }
}))

jest.mock("lucide-react",()=>({
  Pencil:()=> <span>Pencil</span>,
  Trash2:()=> <span>Trash</span>,
  Plus:()=> <span>Plus</span>}))

jest.mock("../context/AuthContext",()=>({
  useAuth:()=>({
    user:{
      name:"Saif",
      email:"saif@gmail.com"},
    logout:jest.fn()
  })
}))
jest.mock("react-router-dom",()=>({
  ...jest.requireActual("react-router-dom"),
  useNavigate:()=>mockNavigate
}))
const notes=[
  {
    _id:"1",
    title:"First note",
    content:"This is my first note"
  },
  {
    _id:"2",
    title:"Second note",
    content:"This is another note"
  }
]
const renderDashboard=()=>{
  return render(
    <MemoryRouter>
      <Dashboard/>
    </MemoryRouter>
  )}

describe("Dashboard",()=>{
  beforeEach(()=>{
    jest.clearAllMocks()
  })

  test("shows notes after loading",async()=>{
    try{
    api.get.mockResolvedValue({
      data:notes})

    renderDashboard()
    expect(await screen.findByText("First note")).toBeInTheDocument()
    expect(screen.getByText("Second note")).toBeInTheDocument()
    expect(api.get).toHaveBeenCalledWith("/note",{params:{search:""}})
    } catch (error) {
        throw new Error(`show notes test failed after loading: ${error.message}`);
    }
  })

  test("shows error when notes cannot be loaded",async()=>{
    try{
    api.get.mockRejectedValue(
      new Error("Failed to load notes"))

    renderDashboard()
    expect(
      await screen.findByText("Failed to load notes")
    ).toBeInTheDocument()
  } catch (error) {
        throw new Error(`load error test failed: ${error.message}`);
    }
  })

  test("shows message when there are no notes",async()=>{
    try{
    api.get.mockResolvedValue({
      data:[]
    })
    renderDashboard()
    expect(
      await screen.findByText("no notes yet ! Create your first note")
    ).toBeInTheDocument()
  } catch (error) {
        throw new Error(`no notes message test failed: ${error.message}`);
    }})

  test("opens note when edit button is clicked",async()=>{
    try{
    api.get.mockResolvedValue({
      data:[notes[0]]})
    renderDashboard()
    await screen.findByText("First note")
    const buttons=screen.getAllByRole("button")
    const editButton=buttons.find(button=>
      button.textContent.includes("Pencil")
    )
    fireEvent.click(editButton)
    expect(mockNavigate).toHaveBeenCalledWith("/note/1")
  } catch (error) {
        throw new Error(`open note test failed: ${error.message}`);
    }
  })
  test("deletes a note successfully",async()=>{
    try{
    api.get.mockResolvedValue({
      data:[notes[0]]
    })
    api.delete.mockResolvedValue({
      data:{
        message:"Note deleted successfully"}
    })
    renderDashboard()
    await screen.findByText("First note")
    const buttons=screen.getAllByRole("button")
    const deleteButton=buttons.find(button=>
      button.textContent.includes("Trash"))
    fireEvent.click(deleteButton)
    await waitFor(()=>{
      expect(api.delete).toHaveBeenCalledWith("/note/1")
    });
    await waitFor(()=>{
      expect(
        screen.queryByText("First note")
      ).not.toBeInTheDocument()
    })
} catch (error) {
        throw new Error(`Delete note  test failed: ${error.message}`);
    }

  })
  test("shows error when deleting a note fails",async()=>{
    try{
    api.get.mockResolvedValue({
      data:[notes[0]]
    })
    api.delete.mockRejectedValue({
      response:{
        data:{
          message:"Delete failed"
        }}
    })
    renderDashboard()
    await screen.findByText("First note")
    const buttons=screen.getAllByRole("button")
    const deleteButton=buttons.find(button=>
      button.textContent.includes("Trash"))
    fireEvent.click(deleteButton);
    expect(
      await screen.findByText("Delete failed")
    ).toBeInTheDocument()

    } catch (error) {
        throw new Error(`show error when deleting a note fails test failed: ${error.message}`);
    }
  })

})